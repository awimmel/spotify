<template>
  <q-layout view="lHh Lpr lFf">
    <navigation-bar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api';
import NavigationBar from 'src/components/NavigationBar.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {NavigationBar},
  setup() {

    return {}
  }
});
</script>
