import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStoreInterface } from './state';

const actions: ActionTree<UserStoreInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;
