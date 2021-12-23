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
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import FileUpload from 'components/FileUpload.vue';
import StreamData from 'components/StreamData.vue';
import Song from '../models/Song';
import { retrieveRawData } from '../services/streamingDataServices';

export default defineComponent({
  name: 'AnalysisHome',
  components: { FileUpload, StreamData },
  setup(_, { root }) {
    const uploadEnabled = ref<boolean>(true);
    const songsPlayed = ref<Song[]>();
    onMounted(async () => {
      songsPlayed.value = await retrieveRawData(root.$route.params.userId);
      if(songsPlayed.value.length > 0)
        uploadEnabled.value = false;
    });
    return { uploadEnabled, songsPlayed };
  }
});
</script>
