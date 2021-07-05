<template>
  <div id="home-page">
    <keep-alive>
      <FilterModal
      v-if="isFilterOpen"
      @exitModal="closeFilterModal"
      @filtered="filterTrainings"
      :trainings="trainings"
      />
    </keep-alive>
    
    <section id="home">
      <div class="intro">
        <h2>Waar alle voetbaltrainingen samenkomen</h2>
        <h4>
          Trainers Vlaanderen is volledig gericht op de trainer zelf. Het is de ideale plek om
          trainingen te bekijken en zelf toe te voegen.
        </h4>
        <router-link to="/toevoegen" class="btn main-cta">Deel je eigen training &nbsp; <span class="bounce-animation">⚽</span></router-link>
      </div>
      <div class="trainings">
        <h3>Bekijk de trainingen</h3>
        <button class="filter" @click="openFilterModal">
          <span>Filter</span>&nbsp;<img src="../assets/img/filter.svg" alt="filter trainingen">
        </button>
        <p v-if="trainingsCopy == false" class="error-msg">
          Er zijn geen trainingen gevonden. 
          Pas de filters aan of 
          <span id="delete-filters" @click="deleteFilters">verwijder de filters</span>.
          </p>
        <div class="container">
          <div class="card" v-for="training in trainingsCopy" :key="training.id">
            <router-link :to="'/training/' + training.id">
            <div class="imgBx">
              <img :src="training.img" alt="training foto">
            </div>
            <div class="content">
              <h4>{{training.titel}}</h4>
              <p>{{training.uitleg | shorten}}</p>
              <p class="trainer"><img src="../assets/img/user.svg" alt="trainer"> <span>{{training.trainer}}</span></p>
              <p class="tags">
                <span v-if="training.categorie">{{training.categorie | destructure}}</span>
                <span>{{training.spelers}} spelers</span>
                <span>{{training.onderdeel}}</span>
                <span>{{training.hoofdthema}}</span>
              </p>
            </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import FilterModal from "../components/FilterModal.vue"

export default {
  data() {
    return {
      trainings: [],
      trainingsCopy: [],
      isFilterOpen: false,
      reset: false
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
      location.reload()
    }
  },
  components: {
    FilterModal
  },
  created() {
    document.title = "Trainers Vlaanderen | Deel & bekijk trainingen!";
    this.$http.get("https://trainers-vlaanderen-51280-default-rtdb.firebaseio.com/Trainings.json")
      .then(data => data.json())
      .then(data => {
        let trainingsArray = [];
        for (let key in data) {
          data[key].id = key;
          trainingsArray.push(data[key]);
        }
        this.trainings = trainingsArray;
        this.trainingsCopy = [...this.trainings];
      });
  },
  mounted() {
    window.scrollTo(0, 0);
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
  }
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
  font-size: 1.3rem;
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

button.filter {
  outline: none;
  border: none;
  background: initial;
  display: flex;
  align-items: center;
  margin: 0 auto 4rem auto;
  cursor: pointer;
  font-size: 1rem;
}

.error-msg {
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
  width: 16.25rem;
  max-height: 12.5rem;
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

.trainer {
  position: absolute;
  bottom: 6rem;
  display: flex;
  font-weight: 500;
}

.trainer img {
  margin-right: 0.25rem;
}

.tags {
  position: absolute;
  bottom: 2rem;
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