import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      userName: '',
    };
  },
  mutations: {
    setName(state, value) {
      state.userName = value;
    },
  },
});

export default store;
