export interface UserStoreInterface {
  prop: boolean;
  // user: User;
}

function state(): UserStoreInterface {
  return {
    prop: false,
    // user: {
    //   id: '',
    //   username: ''
    // }
  }
};

export default state;
