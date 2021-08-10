<template>
  <div id="filter-modal" @click="exitModal" ref="modal">
    <div class="modal">
      <div class="modal-wrap">
        <form ref="form">
          <div class="column trainer">
            <h3>Trainer</h3>
            <div v-for="trainer in getTrainers" :key="trainer" class="input-group">
              <input type="checkbox" :value="trainer" v-model="filterTrainer">
              <label>{{ trainer }}</label>
            </div>
          </div>
          <div class="column club">
            <h3>Club</h3>
            <div v-for="club in clubs" :key="club" class="input-group">
              <input type="checkbox" :value="club" v-model="filterClub">
              <label>{{ club }}</label>
            </div>
          </div>
          <div class="column categorie">
            <h3>Categorie</h3>
            <div v-for="n in 14" :key="n" class="input-group">
              <input type="checkbox" :value="'U' + (n+5)" v-model="filterCategorie">
              <label>U{{ n + 5 }}</label>
            </div>
            <div class="input-group">
              <input type="checkbox" value="21" v-model="filterCategorie">
              <label>U21</label>
            </div>
            <div class="input-group">
              <input type="checkbox" value="B" v-model="filterCategorie">
              <label>B-ploeg / beloften</label>
            </div>
            <div class="input-group">
              <input type="checkbox" value="A" v-model="filterCategorie">
              <label>A-ploeg</label>
            </div>
          </div>
          <div class="column onderdeel">
            <h3>Hoofdthema</h3>
            <div class="input-group" v-for="thema in themas" :key="thema.hoofdthema">
              <div
                class="hoofdthema"
                :style="filterHoofdthemas.includes(thema.hoofd) ? 'margin-bottom: 0.5rem' : ''"
              >
                <input type="checkbox" :value="thema.hoofd" v-model="filterHoofdthemas">
                <label>{{ thema.hoofd }}</label>
              </div>
              <div
                class="subthema input-group"
                v-for="sub in thema.sub"
                :key="sub"
              >
                <template v-if="filterHoofdthemas.includes(thema.hoofd)">
                  <input type="checkbox" :value="sub" v-model="filterSubthemas">
                  <label>{{ sub }}</label>
                </template>
              </div>
            </div>
          </div>
          <div class="column onderdeel">
            <h3>Onderdeel</h3>
            <div class="input-group" v-for="onderdeel in onderdelen" :key="onderdeel">
              <input type="checkbox" :value="onderdeel" v-model="filterOnderdelen">
              <label>{{ onderdeel }}</label>
            </div>
          </div>
        </form>
      </div>

      <div class="close-modal">
        <button @click="$emit('exitModal')"><img src="../../assets/img/close.svg" alt="sluiten"></button>
      </div>
      <div class="apply-filters">
        <button class="btn" @click="filterTrainings">Pas filters toe</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      filterTrainer: [],
      filterClub: [],
      filterCategorie: [],
      filterHoofdthemas: [],
      filterSubthemas: [],
      filterOnderdelen: [],
    }
  },
  props: ["trainings", "clubs"],
  methods: {
    exitModal(e) {
      if (e.target === this.$refs.modal) {
        this.$emit("exitModal");
      }
    },
    filterTrainings() {
      let trainingsFilteredByTrainer;
      if (this.filterTrainer.length > 0) {
        trainingsFilteredByTrainer = this.trainings.filter(training => {
          return this.filterTrainer.includes(training.trainer || training.user?.name);
        });
      } else {
        trainingsFilteredByTrainer = this.trainings;
      }

      let trainingsFilteredByClub;
      if (this.filterClub.length > 0) {
        trainingsFilteredByClub = this.trainings.filter(training => {
          return this.filterClub.includes(training.club);
        });
      } else {
        trainingsFilteredByClub = this.trainings;
      }

      let trainingsFilterdByCategorie;
      if (this.filterCategorie.length > 0) {
        trainingsFilterdByCategorie = this.trainings.filter(training => {
          return training.categorie.some(item => this.filterCategorie.includes(item));
        });
      } else {
        trainingsFilterdByCategorie = this.trainings;
      }

      let trainingsFilteredByHoofdthema;
      if (this.filterHoofdthemas.length > 0) {
        trainingsFilteredByHoofdthema = this.trainings.filter(training => {
          return (
            this.filterHoofdthemas.includes(training.hoofdthema)
            && 
            (this.filterSubthemas.length > 0 ? this.filterSubthemas.includes(training.subthema) : true)
          );
        });
      } else {
        trainingsFilteredByHoofdthema = this.trainings;
      }

      let trainingsFilteredByOnderdeel;
      if (this.filterOnderdelen.length > 0) {
        trainingsFilteredByOnderdeel = this.trainings.filter(training => {
          return this.filterOnderdelen.includes(training.onderdeel);
        });
      } else {
        trainingsFilteredByOnderdeel = this.trainings;
      }
      
      // Get common elements of arrays
      const arrays = [
        trainingsFilteredByTrainer,
        trainingsFilteredByClub,
        trainingsFilterdByCategorie,
        trainingsFilteredByHoofdthema,
        trainingsFilteredByOnderdeel,
      ];

      const merged = arrays.reduce((p,c) => p.filter(e => c.includes(e)));
      this.$emit("filtered", merged);
      this.$emit("exitModal");
    }
  },
  watch: {
    filterHoofdthemas() {
      let subThemas = [];
      this.filterHoofdthemas.forEach(hoofd => {
        const subs = this.themas.filter(thema => thema.hoofd === hoofd)[0].sub;
        subThemas = [...subThemas, ...subs];
      });
      this.filterSubthemas = subThemas;
    },
  },
  computed: {
    getTrainers() {
      let listOfTrainers = [];
      for (let training of this.trainings) {
        if (!listOfTrainers.includes(training.trainer || training.user?.name)) listOfTrainers.push(training.trainer || training.user?.name);
      }
      return listOfTrainers;
    },
    themas() {
      return this.$store.state.themas;
    },
    onderdelen() {
      return this.$store.state.onderdelen;
    },
  },
}

</script>

<style scoped>

#filter-modal {
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.modal {
  position: relative;
  width: 1000px;
  height: 600px;
  border-radius: 0.5rem;
  background: #fff;
  padding: 2rem;
  overflow-y: scroll;
}

form {
  display: flex;
  justify-content: space-evenly;
}

h3 {
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 0.25rem;
}

.column.categorie label, .column.trainer label, .column.club label, .column.onderdeel label {
  margin-left: 0.25rem;
}

.subthema {
  margin-left: 1.5rem;
}

.close-modal {
  position: absolute;
  top: 1.75rem;
  right: 2rem;
}

.close-modal button {
  background: none;
  border: none;
  outline: none;
  transform: scale(1.3);
  cursor: pointer;
}

.apply-filters {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}

.apply-filters button {
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
}

@media screen and (max-width: 1100px) {
  form {
    flex-direction: column;
  }
  .modal {
    width: 500px;
  }
  .column {
    margin-bottom: 1rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  .apply-filters {
    bottom: initial;
    right: initial;
  }
  .btn {
    margin-bottom: 2rem;
  }
}

@media screen and (max-width: 540px) {
  .modal {
    width: 300px;
    height: 500px;
  }
}

</style>