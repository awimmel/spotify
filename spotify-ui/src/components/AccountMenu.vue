<template>
  <q-btn-dropdown icon="account_circle">
    <q-item>
      <q-field>
        <template v-slot:control>
          <div class="self-center full-width" tabindex="0">
            Id: {{ user ? user.id : '' }}
          </div>
        </template>
      </q-field>
    </q-item>
    <q-item>
      <q-field>
        <template v-slot:control>
          <div class="self-center full-width" tabindex="0">
            Username: {{ user ? user.username : '' }}
          </div>
        </template>
      </q-field>
    </q-item>
    <q-item>
      <q-btn
            @click="logout"
            color="primary"
            label="Logout"
            v-close-popup
      />
    </q-item>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import User from '../models/User';
import { logoutUser } from '../services/userServices';

export default defineComponent({
  name: 'LoginMenu',
  props: { user: Object as PropType<User> },
  setup(props, { emit }) {
    const logout = async () => {
      if(props.user){
        await logoutUser(props.user.id);
      }
      emit('userLogout', {id: ''});
    };

    return { props, logout };
  }
});
</script>
