<template>
  <div>
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
    <q-dialog v-model="invalidLogin">
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
import { defineComponent, ref, computed } from '@vue/composition-api';
import { processLogin, createUser } from '../services/userServices';

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
    const invalidLogin = ref<boolean>(false);

    const loginUser = async () => {
      signingIn.value = true;
      const userId = await processLogin(username.value, password.value);
      if (userId.length === 0) {
        invalidLogin.value = true;
      } else {
        emit('userLogin', {
          id: userId,
          username: username.value
        });
      }
      signingIn.value = false;
    };

    const createAccount = async () => {
      const newUserId = await createUser(username.value, password.value);
      emit('userLogin', {
        id: newUserId,
        username: username.value
      });
      signingIn.value = false;
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
      invalidLogin
    };
  }
});
</script>
