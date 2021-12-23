import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { UserStoreInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const userStore: Module<UserStoreInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default userStore;
