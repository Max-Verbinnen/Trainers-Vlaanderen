import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);

// Data
import { interviews } from "./interviews";
import { themas, onderdelen, basics, tactics } from "./categories";

export const store = new Vuex.Store({
  state: {
    // Dynamic data
    user: null,
    trainings: null,

    // Static data
    themas,
    onderdelen,
    basics,
    tactics,
    interviews,
  },
  mutations: {
    setUser(state, userObj) {
      state.user = userObj;
    },
    setTrainings(state, trainings) {
      state.trainings = trainings;
    }
  },
});