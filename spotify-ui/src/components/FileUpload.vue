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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import Song from '../models/Song';

export default defineComponent({
  name: 'FileUpload',
  props: {},
  setup(_, {emit}) {
    const submittedFiles = ref<File[] | null>(null);
    const streamHist = ref<Song[]>([]);

    const submitFiles = async function() {
      if(submittedFiles.value != null){
        for (const currentJson of submittedFiles.value) {
          streamHist.value = streamHist.value?.concat(await readJson(currentJson));
        }
      }
      submittedFiles.value = null;
      emit('submissionComplete', streamHist.value);
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
    return{ submittedFiles, submitFiles }
  }
});
</script>
