<template>
  <div style="width:300px;">
    <q-file
        v-model="submittedFiles"
        label="Select JSON files"
        filled
        multiple
        append
        counter
        style="max-width: 300px"
    >
      <template v-slot:append>
        <q-icon name="close" @click="submittedFiles = null" class="cursor-pointer" />
      </template>
    </q-file>
    <q-btn
      color="primary"
      label="Upload"
      :disable="submittedFiles == null"
      class="q-mt-sm float-right"
      @click="submitFiles"
    />
    <q-dialog v-model="failedInsert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Invalid username and password combination</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Please try logging in again.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import Song from '../models/Song';
import { storeRawData } from '../services/streamingDataServices';

export default defineComponent({
  name: 'FileUpload',
  props: {},
  setup(_, {emit, root}) {
    const submittedFiles = ref<File[] | null>(null);
    const streamHist = ref<Song[]>([]);
    const failedInsert = ref<boolean>();

    const submitFiles = async function() {
      if(submittedFiles.value != null){
        for (const currentJson of submittedFiles.value) {
          streamHist.value = streamHist.value?.concat(await readJson(currentJson));
        }
      }
      submittedFiles.value = null;
      failedInsert.value = !await storeRawData({userId: root.$route.params.userId, songs: streamHist.value});
      if(!failedInsert.value){
        emit('submissionComplete', streamHist.value);
      }
    }

    //Reading submitted JSON, returning a promise so read result can be awaited in submitFiles
    const readJson = function (currentJson: File): Promise<Song[]> {
      return new Promise<Song[]>((resolve, reject) => {
        const jsonReader = new FileReader();
        jsonReader.onload = function() {
          resolve(<Song[]> JSON.parse(jsonReader?.result?.toString() ?? ''));
        };
        jsonReader.onerror = function() {
          reject();
        };
        jsonReader.readAsText(currentJson);
      });
    }
    return{ submittedFiles, submitFiles, failedInsert }
  }
});
</script>
