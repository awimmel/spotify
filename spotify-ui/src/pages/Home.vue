<template>
  <q-page class="row justify-evenly">
    <welcome-message />
  </q-page>
</template>

<script lang="ts">
import WelcomeMessage from 'components/WelcomeMessage.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Home',
  components: { WelcomeMessage },
  setup() {
    return { };
  }
});
</script>
