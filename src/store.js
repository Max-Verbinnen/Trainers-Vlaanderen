import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // Dynamic data
    user: null,
    trainings: null,

    // Static options
    themas: [
      { hoofd: "Techniek", sub: ["Frontaal", "Schuin-frontaal", "Zijwaarts", "Achterwaarts", "Aanname", "Handelingsnelheid", "Passing", "Leiden", "Dribbelen"] },
      { hoofd: "Speelwijze", sub: ["B+ (balbezit)", "B- (balverlies)", "Omschakeling"] },
      { hoofd: "Fysiek", sub: ["Mobiliteit", "Stabiliteit", "Flexibiliteit"] },
      { hoofd: "Stilstaande fases", sub: ["Vrije trappen (B+, B-)", "Penalty's", "Corners (B+, B-)"] },
    ],
    onderdelen: [
      "Opwarming",
      "Techniekvorm",
      "Pasvorm",
      "Afwerkvorm",
      "Balbezitvorm / positiespel",
      "Wedstrijdvorm",
      "Spelvorm",
      "Cooling down",
      "Afgeleide wedstrijdvorm",
      "Keepertraining",
    ],
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