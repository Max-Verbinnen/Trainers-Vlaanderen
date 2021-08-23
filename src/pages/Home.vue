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
        <h3>Bekijk de trainingen ({{ trainings.length }})</h3>

        <div class="filter-wrapper">
          <button class="filter" @click="openFilterModal">
            <span>Filter</span>&nbsp;<img src="../assets/img/filter.svg" alt="filter trainingen">
          </button>
          <div class="input-wrap">
            <input type="text" v-model="search" placeholder="Zoek op titel...">
            <img src="../assets/img/cross.svg" alt="" @click="search = ''">
          </div>
          <div class="select-group">
            <select v-model="sortBy">
              <option disabled value="">Sorteer op</option>
              <option>Recentste</option>
              <option>Weergaven</option>
              <option>Beoordeling</option>
            </select>
          </div>
        </div>

        <p v-if="filteredTrainings.length === 0 && !loading" class="error-msg">
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
                <h4>{{ training.titel | shorten(6) }}</h4>
                <p>{{ training.uitleg | shorten(8) }}</p>
                <div class="bottom-info">
                  <p class="trainer">
                    <img src="../assets/img/user.svg" alt="trainer">
                    <span>{{ training.trainer || (training.user && training.user.name) }}</span>
                  </p>
                  <div class="views-rating">
                    <div class="views">
                      <img src="../assets/img/eye.svg" alt="views">
                      <span>{{ training.views ? training.views : 0 }}</span>
                    </div>
                    <span v-if="training.rating >= 0" style="margin: 0 0.5rem;"> | </span>
                    <ReadRating
                      v-if="training.rating >= 0"
                      :rating="parseFloat(training.rating, 10)"
                    />
                  </div>
                  <p class="tags">
                    <span v-if="training.categorie">{{ training.categorie | destructure }}</span>
                    <span>{{ training.spelers }} spelers</span>
                    <span>{{ training.onderdeel }}</span>
                    <span>{{ training.hoofdthema }}</span>
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="more-trainings" v-if="!$store.state.user && !loading" @click="loadMoreTrainings">
          <button>Laad meer trainingen</button>
        </div>
      </div>

      <!-- Show 404 snackbar when page not found -->
      <transition name="fade">
        <Snackbar
          v-if="show404Snackbar"
          @closeSnackbar="show404Snackbar = false"
          text="Deze pagina bestaat niet (meer)."
          id="snackbar"
        />
      </transition>
    </section>
  </div>
</template>

<script>
import { db } from "../firebase";

import ReadRating from "../components/small/ReadRating.vue";
import Snackbar from "../components/modals/Snackbar.vue";

export default {
  data() {
    return {
      trainings: [],
      clubs: [],
      trainingsCopy: [],
      isFilterOpen: false,
      loading: true,

      search: "",
      sortBy: "Weergaven",

      show404Snackbar: false,
    }
  },
  created() {
    document.title = "Trainers Vlaanderen | Deel & bekijk trainingen!";
    if (sessionStorage.getItem("sortBy")) this.sortBy = sessionStorage.getItem("sortBy");
    if (localStorage.getItem("404")) {
      this.show404Snackbar = true;
      localStorage.removeItem("404");
    }

    this.getTrainings();
    this.getClubs();
  },
  components: {
    FilterModal: () => import("../components/modals/FilterModal.vue"),
    ReadRating,
    Snackbar,
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
    getTrainings() {
      const sortByOption = this.sortByNaming[this.sortBy];

      if (sortByOption) {
        db.ref('Trainings')
          .orderByChild(sortByOption)
          .once('value', snapshot => {
            this.handleSnapshot(snapshot);
          });
      } else {
        db.ref('Trainings')
          .once('value', snapshot => {
            this.handleSnapshot(snapshot);
          });
      }
    },
    handleSnapshot(snapshot) {
      let trainingsArray = [];
      snapshot.forEach(child => {
        trainingsArray.push({
          ...child.val(),
          id: child.key,
        });
      });

      trainingsArray.reverse();
      this.trainings = trainingsArray;
      this.trainingsCopy = [...this.trainings];
      this.loading = false;
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
    loadMoreTrainings() {
      // User is not logged in
      localStorage.setItem("loadTrainingsToAccountRoute", "true");
      this.$router.push("/account");
    },
  },
  computed: {
    filteredTrainings() {
      const trainings = this.trainingsCopy.filter(training => training.titel.toLowerCase().match(this.search));

      if (!this.$store.state.user) {
        return trainings.slice(0, 9);
      }
      return trainings;
    },
    sortByNaming() {
      return {
        "Recentste": null,
        "Weergaven": "views",
        "Beoordeling": "rating",
      };
    },
  },
  watch: {
    sortBy() {
      sessionStorage.setItem("sortBy", this.sortBy);
      this.getTrainings();
    },
  },
  filters: {
    shorten(value, n) {
      let textArray = value.split(" ");
      if (textArray.length > n) {
        textArray = textArray.slice(0, n);
      }
      return textArray.join(" ") + (value.split(" ").length > n ? "..." : "");
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

#snackbar {
  left: 50%;
  transform: translateX(-50%);
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
  align-items: flex-start;
}

button.filter, .more-trainings button {
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

.filter-wrapper input, .filter-wrapper select {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgb(161, 161, 161);
  width: 15rem;
}

.filter-wrapper .select-group {
  margin-left: 1rem;
}

.filter-wrapper .select-group select {
  max-width: 10rem;
}

.filter-wrapper input:focus, .filter-wrapper select:focus {
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
  width: 320px;
  height: 440px;
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
  display: flex;
  justify-content: center;
  position: relative;
  top: -60px;
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
  align-items: center;
  font-weight: 500;
  margin-bottom: 0.15rem;
}

.trainer img, .views img {
  margin-right: 0.25rem;
}

.views-rating {
  display: flex;
  align-items: center;
}

.views {
  display: flex;
  align-items: center;
}

.vue-star-rating {
  margin-top: 0.15rem;
}

.tags {
  font-size: 0.8rem;
  padding-right: 1.5rem;
  margin-top: 0.65rem;
}

.tags span {
  display: inline-block;
  background: #D0EAE8;
  color: #66A8A2;
  padding: 0.25rem 0.5rem;
  border-radius: 5rem;
  margin: 0 0.25rem 0.25rem 0;
}

.more-trainings {
  font-size: 1.1rem;
  display: grid;
  place-items: center;
}

.more-trainings button {
  padding: 0.75rem 1.25rem;
}

@media screen and (max-width: 620px) {
  .filter-wrapper {
    flex-direction: column;
    margin-left: 2rem;
  }
  .filter-wrapper .button, .filter-wrapper .select-group {
    margin: 0;
  }
  .filter-wrapper .input-wrap {
    margin: 0.5rem 0;
  }
}

</style>