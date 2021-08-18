<template>
  <div id="home-page">
    <keep-alive>
      <FilterModal
        v-if="isFilterOpen"
        @exitModal="closeFilterModal"
        @filtered="filterTrainings"
        :trainings="trainings"
        :clubs="clubs"
      />
    </keep-alive>
    
    <section id="home">
      <div class="intro">
        <h2>Waar alle voetbaltrainingen samenkomen</h2>
        <h4>
          Welkom bij Trainers Vlaanderen, een platform waar voetbalcoaches inspiratie uit kunnen halen om hun trainingen een niveau op te krikken of om een andere aanpak te ontdekken.
        </h4>
        <router-link to="/toevoegen" class="btn main-cta">Deel je eigen training &nbsp; <span class="bounce-animation">⚽</span></router-link>
      </div>
      <div class="trainings">
        <h3>Bekijk de {{ filteredTrainings.length > 0 ? filteredTrainings.length : "" }} trainingen</h3>

        <div class="filter-wrapper">
          <button class="filter" @click="openFilterModal">
            <span>Filter</span>&nbsp;<img src="../assets/img/filter.svg" alt="filter trainingen">
          </button>
          <div class="input-wrap">
            <input type="text" v-model="search" placeholder="Zoek op titel...">
            <img src="../assets/img/cross.svg" alt="" @click="search = ''">
          </div>
        </div>

        <p v-if="filteredTrainings.length === 0" class="error-msg">
          Er zijn geen trainingen gevonden. 
          Pas de filters aan of 
          <span id="delete-filters" @click="deleteFilters">verwijder de filters</span>.
          </p>
        <div class="container" ref="container">
          <div class="card" v-for="training in filteredTrainings" :key="training.id" :id="training.id">
            <router-link :to="'/training/' + training.id">
              <div class="imgBx">
                <img :src="training.img" alt="training foto" loading="lazy">
              </div>
              <div class="content">
                <h4>{{training.titel}}</h4>
                <p>{{training.uitleg | shorten}}</p>
                <div class="bottom-info">
                  <p class="trainer">
                    <img src="../assets/img/user.svg" alt="trainer">
                    <span>{{ training.trainer || (training.user && training.user.name) }}</span></p>
                  <p class="tags">
                    <span v-if="training.categorie">{{training.categorie | destructure}}</span>
                    <span>{{training.spelers}} spelers</span>
                    <span>{{training.onderdeel}}</span>
                    <span>{{training.hoofdthema}}</span>
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { db } from "../firebase"

export default {
  data() {
    return {
      trainings: [],
      clubs: [],
      trainingsCopy: [],
      isFilterOpen: false,
      search: "",

      lastValue: null,
      lastKey: null,
    }
  },
  methods: {
    openFilterModal() {
      this.isFilterOpen = true;
      document.body.classList.add("modal-open");
    },
    closeFilterModal() {
      this.isFilterOpen = false;
      document.body.classList.remove("modal-open");
    },
    filterTrainings(filtered) {
      this.trainingsCopy = filtered;
    },
    deleteFilters() {
      location.reload();
    },
    fetchMoreTrainings() { 
      db.ref('Trainings')
      .orderByChild("titel")
      .startAfter(this.lastValue, this.lastKey)
      .limitToFirst(9)
      .once('value', snapshot => {
        let trainingsArray = [];
        snapshot.forEach(child => {
          trainingsArray.push({
            ...child.val(),
            id: child.key,
          });
        });
        
        // If there are no more trainings left to fetch
        if (trainingsArray.length === 0) return;

        this.lastValue = trainingsArray[trainingsArray.length - 1].titel;
        this.lastKey = trainingsArray[trainingsArray.length - 1].id;

        this.trainings = [...this.trainings, ...trainingsArray];
        this.trainingsCopy = [...this.trainings];
      });
    },
    getClubs() {
      let clubs = [];
      db.ref('Clubs').once('value', snapshot => {
        const data = snapshot.val();
        for (let key in data) {
          clubs.push(data[key]);
        }
      });

      this.clubs = clubs;
    },
  },
  components: {
    FilterModal: () => import("../components/modals/FilterModal.vue"),
  },
  computed: {
    filteredTrainings() {
      return this.trainingsCopy.filter(training => {
        return training.titel.toLowerCase().match(this.search);
      });
    },
  },
  created() {
    document.title = "Trainers Vlaanderen | Deel & bekijk trainingen!";
    this.getClubs();

    db.ref('Trainings')
      .orderByChild("titel")
      .once('value', snapshot => {
        let trainingsArray = [];
        snapshot.forEach(child => {
          trainingsArray.push({
            ...child.val(),
            id: child.key,
          });
        });
        this.lastValue = trainingsArray[trainingsArray.length - 1].titel;
        this.lastKey = trainingsArray[trainingsArray.length - 1].id;

        this.trainings = trainingsArray;
        this.trainingsCopy = [...this.trainings];
      });
  },
  filters: {
    shorten(value) {
      let textArray = value.split(" ");
      let n = 8;
      if (textArray.length > n) {
        textArray = textArray.slice(0, n);
      }
      return textArray.join(" ") + "...";
    },
    destructure(value) {
      if (!value) return;
      return value.toString();
    }
  },
}

</script>

<style scoped>

#home-page {
  min-height: 110vh;
}

.intro h2 {
  max-width: 40rem;
}

.intro h4 {
  font-weight: 300;
  font-size: 1.1rem;
  margin: 1.5rem 0 2rem 0;
  max-width: 40rem;
}

.intro {
  margin-bottom: 10rem;
}

.trainings h3 {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-align: center;
}

.filter-wrapper {
  display: flex;
  justify-content: center;
}

button.filter {
  outline: none;
  border: none;
  background: initial;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  background: var(--primary-green);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
}

.filter-wrapper .input-wrap {
  position: relative;
}

.filter-wrapper input {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgb(161, 161, 161);
  width: 15rem;
}

.filter-wrapper input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-green);
}

.filter-wrapper .input-wrap img {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.error-msg {
  margin-top: 1.5rem;
  text-align: center;
}

#delete-filters {
  text-decoration: underline;
  cursor: pointer;
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 4rem;
}

.container .card {
  position: relative;
  width: 20rem;
  height: 26.25rem;
  background: rgb(246, 253, 243);
  margin: 3.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem 0.5rem 0 0;
}

.container .card a {
  text-decoration: none;
}

.container .card .imgBx {
  position: relative;
  top: -3.75rem;
  left: 1.875rem;
  z-index: 1;
}

.container .card .imgBx img {
  border-radius: 0 0 0.5rem 0.5rem;
  width: 260px;
  height: 200px;
  max-height: 200px;
  object-fit: cover;
}

.container .card .content {
  margin-top: -2.5rem;
  padding: 0 1.5rem;
  color: #111;
}

.container .card .content h4 {
  font-size: 1.5rem;
  margin: 0.9rem 0;
  text-align: center;
}

.bottom-info {
  position: absolute;
  bottom: 0.5rem;
}

.trainer {
  display: flex;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.trainer img {
  margin-right: 0.25rem;
}

.tags {
  font-size: 0.8rem;
  padding-right: 1.5rem;
}

.tags span {
  display: inline-block;
  background: #D0EAE8;
  color: #66A8A2;
  padding: 0.25rem 0.5rem;
  border-radius: 5rem;
  margin: 0 0.25rem 0.25rem 0;
}

</style>