import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);

// Data
import { interviews } from "./interviews";
import { themas, subthemas, intensiteit, onderdelen, diplomas, basics, tactics } from "./categories";

export const store = new Vuex.Store({
  state: {
    // Dynamic data
    user: null,
    trainings: [],
    challenges: [],

    // Static data
    themas,
    subthemas,
    intensiteit,
    onderdelen,
    diplomas,
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
    },
    setChallenges(state, challenges) {
      state.challenges = challenges;
    },
  },
});