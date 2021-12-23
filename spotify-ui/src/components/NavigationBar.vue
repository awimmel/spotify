<template>
  <q-header>
    <q-toolbar class="bg-black text-white">
      <q-toolbar-title>
        Streaming Analytics
      </q-toolbar-title>
      <q-tabs v-model="currentTab">
        <q-tab @click="changeRoute('home')" name="home" label="Home" />
        <q-tab
          @click="changeRoute('userAnalysis')"
          name="analyze"
          label="Analyze"
          :disable="user ? user.id.length === 0 : true"
        />
        <login-menu v-if="user ? user.id.length === 0 : true" @userLogin="val => saveUser(val)" />
        <account-menu v-else :user="user" @userLogout="val => saveUser(val)"/>
      </q-tabs>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import User from '../models/User';
import LoginMenu from 'src/components/LoginMenu.vue';
import AccountMenu from 'src/components/AccountMenu.vue';
import { autoLogin } from '../services/userServices';

export default defineComponent({
  name: 'NavigationBar',
  components: { LoginMenu, AccountMenu },
  props: {},
  setup(_, { root }) {
    const user = ref<User>();
    const currentTab = ref<string>();


    onMounted(async () => {
      currentTab.value = 'home';
      const loginResponse = await autoLogin();
      if (loginResponse.userId.length != 0 || loginResponse.username.length === 0) {
        saveUser({
          id: loginResponse.userId,
          username: loginResponse.username
        });
      }
    });

    const changeRoute = (routeName: string): void => {
      if (routeName === 'userAnalysis') {
        void root.$router.push({
          name: routeName,
          params: { userId: user.value?.id ?? '' }
        });
        return;
      }
      void root.$router.push({ name: routeName });
    };

    const saveUser = function(val: User) {
      user.value = val;
    };
    return { currentTab, changeRoute, saveUser, user };
  }
});
</script>
