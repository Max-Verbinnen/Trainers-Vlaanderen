<template>
  <div id="filter-modal" @click="exitModal" ref="modal">
    <div class="modal">
      <div class="modal-wrap">
        <form ref="form">
          <div class="column trainer">
            <h3>Trainer</h3>
            <div v-for="trainer in getTrainers" :key="trainer" class="input-group">
              <input type="checkbox" :value="trainer" v-model="filterTrainer">
              <label>{{trainer}}</label>
            </div>
          </div>
          <div class="column categorie">
            <h3>Categorie</h3>
            <div v-for="n in 14" :key="n" class="input-group">
              <input type="checkbox" :value="'U' + (n+5)" v-model="filterCategorie">
              <label>U{{n + 5}}</label>
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
          <div class="column players">
            <h3>Spelers</h3>
            <div class="input-group">
              <input type="radio" :value="['1', '2', '3', '4', '5']" v-model="filterSpelers">
              <label>1-5</label>
            </div>
            <div class="input-group">
              <input type="radio" :value="['6', '7', '8', '9', '10']" v-model="filterSpelers">
              <label>6-10</label>
            </div>
            <div class="input-group">
              <input type="radio" :value="['11', '12', '13', '14', '15']" v-model="filterSpelers">
              <label>11-15</label>
            </div>
            <div class="input-group">
              <input type="radio" :value="['16', '17', '18', '19', '20']" v-model="filterSpelers">
              <label>16-20</label>
            </div>
          </div>
          <div class="column onderdeel">
            <h3>Onderdeel</h3>
            <div class="input-group" v-for="onderdeel in onderdelen" :key="onderdeel">
              <input type="checkbox" :value="onderdeel" v-model="filterOnderdelen">
              <label>{{onderdeel}}</label>
            </div>
          </div>
        </form>
      </div>

      <div class="close-modal">
        <button @click="$emit('exitModal')"><img src="../assets/img/close.svg" alt="sluiten"></button>
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
      filterCategorie: [],
      filterSpelers: [],
      filterOnderdelen: [],
      onderdelen: ["Opwarming", "Techniekvorm", "Pasvorm", "Afwerkvorm", "Balbezitvorm / positiespel", "Wedstrijdvorm", "Spelvorm", "Cooling down"]
    }
  },
  props: ["trainings"],
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
          return this.filterTrainer.includes(training.trainer);
        });
      } else {
        trainingsFilteredByTrainer = this.trainings;
      }

      let trainingsFilterdByCategorie;
      if (this.filterCategorie.length > 0) {
        trainingsFilterdByCategorie = this.trainings.filter(training => {
          return training.categorie.some(item => this.filterCategorie.includes(item));
        });
      } else {
        trainingsFilterdByCategorie = this.trainings;
      }

      let trainingsFilteredBySpelers;
      if (this.filterSpelers.length > 0) {
        trainingsFilteredBySpelers = this.trainings.filter(training => {
          return this.filterSpelers.includes(training.spelers);
        });
      } else {
        trainingsFilteredBySpelers = this.trainings;
      }

      let trainingsFilteredByOnderdeel;
      if (this.filterOnderdelen.length > 0) {
        trainingsFilteredByOnderdeel = this.trainings.filter(training => {
          return this.filterOnderdelen.includes(training.onderdeel);
        });
      } else {
        trainingsFilteredByOnderdeel = this.trainings;
      }
      
      // Get common elements of 4 arrays
      const arrays = [trainingsFilteredByTrainer, trainingsFilterdByCategorie, trainingsFilteredBySpelers, trainingsFilteredByOnderdeel];
      const merged = arrays.reduce((p,c) => p.filter(e => c.includes(e)));
      this.$emit("filtered", merged);
      this.$emit("exitModal");
    }
  },
  computed: {
    getTrainers() {
      let listOfTrainers = [];
      for (let training of this.trainings) {
        if (!listOfTrainers.includes(training.trainer)) listOfTrainers.push(training.trainer);
      }
      return listOfTrainers;
    }
  }
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

.column.categorie label, .column.trainer label, .column.players label, .column.onderdeel label {
  margin-left: 0.25rem;
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