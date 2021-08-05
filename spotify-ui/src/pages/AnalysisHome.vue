<template>
  <q-page class="row items-center justify-evenly">
    <file-upload
      v-if="uploadEnabled"
      @submissionComplete="
        history => {
          songsPlayed = history;
          uploadEnabled = false;
        }
      "
    />
    <stream-data v-else 
      :streamHist="songsPlayed"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import FileUpload from 'components/FileUpload.vue';
import StreamData from 'components/StreamData.vue';
import Song from '../models/Song';

export default defineComponent({
  name: 'AnalysisHome',
  components: { FileUpload, StreamData },
  setup() {
    const uploadEnabled = true;
    const songsPlayed = ref<Song[]>();
    return { uploadEnabled, songsPlayed };
  }
});
</script>
