import Vue from 'vue';
import Vuex from 'vuex';

//Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    xml: ''
  },
  mutations: {
    setXml(state, value) {
      state.xml = value;
    }
  },
  actions: {
    // definisci le azioni dello stato dell'applicazione qui
  },
  getters: {
    // definisci i getters dello stato dell'applicazione qui
  }
});

export default store;