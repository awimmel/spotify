<template>
  <q-btn-dropdown label="Login" @hide="resetVars()">
    <!-- <q-btn-dropdown label="Login"> -->
    <q-item>
      <q-input v-model="username" label="Username" />
    </q-item>
    <q-item>
      <q-input
        v-model="password"
        :type="hidePassword ? 'password' : 'text'"
        label="Password"
        :disable="signingIn"
      >
        <q-icon
          :name="hidePassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="hidePassword = !hidePassword"
          :disable="signingIn"
        />
      </q-input>
    </q-item>
    <div v-if="!createNew">
      <q-item>
        <q-btn
          @click="loginUser"
          color="primary"
          label="Login"
          :disable="loginForbidden || signingIn"
          :loading="signingIn"
          v-close-popup
        />
      </q-item>
      <q-item>
        <q-btn
          @click="createNew = true"
          flat
          label="Create Account"
          :disable="signingIn"
        />
      </q-item>
    </div>
    <div v-else>
      <q-item>
        <q-input
          v-model="confirmPassword"
          :type="hideConfirmPassword ? 'password' : 'text'"
          label="Confirm Password"
        >
          <q-icon
            :name="hideConfirmPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="hideConfirmPassword = !hideConfirmPassword"
          />
        </q-input>
      </q-item>
      <q-item>
        <q-btn
          @click="createAccount"
          color="primary"
          label="Create Account"
          :disable="createForbidden"
          v-close-popup
        />
      </q-item>
    </div>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import axios from 'axios';
import { processLogin } from '../services/userServices';

export default defineComponent({
  name: 'LoginMenu',
  props: {},
  setup(_, { emit }) {
    const createNew = ref(false);
    const username = ref<string>('');
    const password = ref<string>('');
    const confirmPassword = ref<string>('');
    const hidePassword = ref<boolean>(true);
    const hideConfirmPassword = ref<boolean>(true);
    const signingIn = ref<boolean>(false);

    const loginUser = async () => {
      signingIn.value = true;
      console.log(username.value);
      const userId = await processLogin(username.value, password.value);
      console.log(username.value);
      emit('userLogin', {
        id: userId,
        username: username.value
      });
      signingIn.value = false;
    };

    const createAccount = async () => {
      const response = await axios.post('http://localhost:5001/signup', {
        username: username.value,
        password: password.value
      });
      console.log(response);
    };

    const resetVars = () => {
      createNew.value = false;
      username.value = '';
      password.value = '';
      confirmPassword.value = '';
    };

    const loginForbidden = computed(() => {
      return !username.value || !password.value;
    });

    const createForbidden = computed(() => {
      return !(
        username.value &&
        password.value &&
        confirmPassword.value &&
        password.value === confirmPassword.value
      );
    });

    return {
      createNew,
      username,
      password,
      confirmPassword,
      loginUser,
      createAccount,
      resetVars,
      hidePassword,
      hideConfirmPassword,
      loginForbidden,
      createForbidden,
      signingIn,
    };
  }
});
</script>
