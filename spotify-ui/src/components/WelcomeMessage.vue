<template>
  <div class="q-mx-lg">
    <h3>Welcome!</h3>
    <p>
      I created this small site to analyze your Spotify data and give you
      detailed insights into your listening habits. Analyzing your data will
      also provide you with new artist recommendations via the Musicovery B2B
      API. To get started:
    </p>
    <ol>
      <li>
        Ask Spotify to send you your listening data
        <a
          href="https://accounts.spotify.com/en/login?continue=https:%2F%2Fwww.spotify.com%2Fus%2Faccount%2Fprivacy%2F"
          >here</a
        >.
      </li>
      <li>
        Create an account via the login dropdown in the top-right corner.
      </li>
      <li>
        Navigate to the Analyze tab.
      </li>
      <li>
        Upload your StreamingHistory JSON files, which are located in the ZIP
        file provided by Spotify.
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'WelcomeMessage',
  props: {}
});
</script>
