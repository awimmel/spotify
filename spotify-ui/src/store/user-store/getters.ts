import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStoreInterface } from './state';

const getters: GetterTree<UserStoreInterface, StateInterface> = {
  // getUser (state) {
  //   return state.user;
  // }
};

export default getters;
