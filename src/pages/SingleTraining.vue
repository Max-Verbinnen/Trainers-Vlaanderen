<template>
  <div id="single-training-page">
    <section id="training">
      <div id="print">
        <h2>{{ training.titel }}</h2>
        <p class="trainer">
          <img src="../assets/img/user.svg" alt="trainer">
          <span>
            {{ training.trainer || (training.user && training.user.name) }}
            ({{ training.diploma }})
          </span>
        </p><br>
        <p class="club" v-if="training.club">
          <img src="../assets/img/club.svg" alt="club">
          <span>{{ training.club }}</span>
        </p><br>
        <p
          class="views"
          v-tippy="{ placement : 'right' }"
          :content="`Deze training is ${training.views ? training.views : 0} keer bekeken.`"
        >
          <img src="../assets/img/eye.svg" alt="views">
          <span>{{ training.views ? training.views : 0 }}</span>
        </p><br>
        <p class="rating-p">
          <ReadRating
            v-if="training.rating >= 0"
            v-tippy="{ placement: 'right' }"
            :content="`Deze training heeft een rating van ${training.rating} / 5.`"
            :rating="parseFloat(training.rating, 10)"
          />
          <ReadRating
            v-else
            v-tippy="{ placement: 'right' }"
            content="Deze training is nog niet beoordeeld."
            :rating="0"
          />
        </p>
        <div class="uitleg">
          <div>
            <p>{{ training.uitleg }}</p>
            <h4 v-if="training.variaties">Variaties</h4>
            <p>{{ training.variaties }}</p>
            <h4 v-if="training.doelstellingen">Doelstellingen</h4>
            <p>{{ training.doelstellingen }}</p>
            <h4 v-if="training.doorschuifsysteem">Doorschuifsysteem</h4>
            <p>{{ training.doorschuifsysteem }}</p>
            <h4 v-if="training.materiaal">Materiaal</h4>
            <p>{{ training.materiaal }}</p>
          </div>
          <img :src="training.img" alt="training afbeelding" class="training">
        </div>
      </div>
      <div class="details">
        <p v-if="training.categorie"><span id="subtitle">Categorie</span>: {{ training.categorie | destructure }}</p>
        <p v-if="training.spelers"><span id="subtitle">Spelers</span>: {{ training.spelers }}</p>
        <p v-if="training.keepers"><span id="subtitle">Keepers</span>: {{ training.keepers }}</p>
        <p v-if="training.niveau"><span id="subtitle">Niveau van de spelers</span>: {{ training.niveau }}</p>
        <p v-if="training.duur"><span id="subtitle">Duur van de training</span>: {{ training.duur }}</p>
        <p v-if="training.intensiteit"><span id="subtitle">Intensiteit</span>: {{ training.intensiteit }}</p>
        <p v-if="training.onderdeel"><span id="subtitle">Onderdeel</span>: {{ training.onderdeel }}</p>
        <p v-if="training.hoofdthema"><span id="subtitle">Thema</span>:
          {{ training.hoofdthema }}
          {{ training.subthema ? ' / ' : '' }}
          {{ training.subthema }}
        </p>
      </div>
      
      <div class="action-btns">
        <button @click="openRatingModal" class="rating">
          <img src="../assets/img/star.svg" alt="Print deze pagina">
          <span>Geef deze training een rating</span>
        </button>
        <button @click="printPage" class="print">
          <img src="../assets/img/printer.svg" alt="Print deze pagina">
          <span>Print deze pagina</span>
        </button>
      </div>
    </section>

    <RatingModal
      v-if="showRatingModal"
      @exitModal="showRatingModal = false"
      @ratingGiven="ratingGiven($event)"
    />

    <!-- Show snackbar when training has been rated -->
    <div style="display: flex; justify-content: center;">
      <transition name="fade">
        <Snackbar
          v-if="showSnackbar"
          @closeSnackbar="showSnackbar = false"
          :text="`Je hebt deze training een rating van ${rating} / 5 gegeven.`"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase"
import { printPage } from "../utils"

import ReadRating from "../components/small/ReadRating.vue";
import Snackbar from "../components/modals/Snackbar.vue";
import RatingModal from "../components/modals/RatingModal.vue";

export default {
  data() {
    return {
      training: {},
      showRatingModal: false,
      showSnackbar: false,
      rating: null,
      avgRating: null,
    }
  },
  components: {
    ReadRating,
    RatingModal,
    Snackbar,
  },
  async created() {
    await this.getTraining();
    await this.handleVisitedTraining();

    document.title = "Trainers Vlaanderen | " + this.training.titel;
  },
  methods: {
    printPage,
    openRatingModal() {
      // Go to login page if not signed in
      if (!this.$store.state.user) {
        localStorage.setItem("ratingToAccountRoute", "true");
        this.$router.push("/account");
        return;
      }

      this.showRatingModal = true;
    },
    async getTraining() {
      await db.ref(`Trainings/${this.$route.params.id}`).once('value', snapshot => {
        this.training = snapshot.val();
      });
    },
    async handleVisitedTraining() {
      let visitedTrainings = JSON.parse(localStorage.getItem("visitedTrainings"));
      const trainingID = this.$route.params.id;

      if (visitedTrainings && visitedTrainings.includes(trainingID)) return;
      if (!visitedTrainings) visitedTrainings = [];

      visitedTrainings.push(trainingID);
      localStorage.setItem("visitedTrainings", JSON.stringify(visitedTrainings));

      // Get views from db
      let views = 0;
      await db.ref(`Trainings/${this.$route.params.id}`).once('value', snapshot => {
        if (snapshot.val().views) views = snapshot.val().views;
        views += 1;
      });

      // Update views in db
      await db.ref(`Trainings/${this.$route.params.id}`)
        .update({ views });
    },
    ratingGiven(rating) {
      this.showSnackbar = true;
      this.rating = rating;
      this.calculateRating();
      this.getTraining();
    },
    async calculateRating() {
      await db.ref('Ratings')
        .orderByChild('trainingID')
        .equalTo(this.$route.params.id)
        .once('value', snapshot => {
          let ratings = [];
          snapshot.forEach(child => {
            ratings.push(child.val());
          });
          if (!ratings.length) return;
          
          // Calculate average rating
          const sum = ratings.reduce((rating, { score }) => rating + score, 0);
          this.avgRating = (sum / ratings.length).toFixed(1);
      });

      // Update rating in db
      await db.ref(`Trainings/${this.$route.params.id}`)
        .update({ rating: this.rating ? this.avgRating : -1 });
    },
  },
  filters: {
    destructure(value) {
      return value.toString();
    }
  }
}

</script>

<style scoped>

#single-training-page {
  min-height: 110vh;
}

.trainer, .club, .views, .rating-p {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
}

.trainer {
  margin-top: 1rem;
}

.trainer img, .club img, .views img, .rating-p img {
  margin-right: 0.25rem;
}

img.training {
  width: 30rem;
}

.uitleg {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0 4rem 0;
}

.uitleg h4 {
  margin: 0.75rem 0 0.25rem 0;
}

.uitleg p {
  white-space: pre-line;
  max-width: 30rem;
}

.uitleg img {
  align-self: center;
}

#subtitle {
  font-weight: 600;
}

.details {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-bottom: 3rem;
}

.details p {
  padding: 0.75rem;
  border: 1px solid var(--grey-border);
}

@media screen and (max-width: 1200px) {
  .uitleg {
    flex-direction: column;
  }
  .uitleg img {
    align-self: flex-start;
    margin: 3rem 0;
  }
}

@media screen and (max-width: 560px) {
  .uitleg img {
    width: 280px;
  }
  .details {
    grid-template-columns: 1fr 1fr;
  }
}

.action-btns {
  display: flex;
  margin: -5px -10px;
}

.action-btns button {
  margin: 5px 10px;
  outline: none;
  border: none;
  background: rgb(236, 236, 236);
  font-size: 1rem;
  padding: 0.6rem 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
}

.action-btns button img {
  display: block;
  margin: 0 auto 0.5rem auto;
}

.action-btns button.rating {
  background: #ffffb2;
}

</style>