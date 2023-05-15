<template>
  <div id="single-training-page">
    <Loading
      :active.sync="isLoading"
      :is-full-page="true"
      color="var(--primary-green)"
      :width="50"
      :height="50"
    />
    <section id="training" v-if="!isLoading">
      <div id="print">
        <h2>{{ training.titel }}</h2>
        <p class="trainer">
          <img src="../assets/img/user.svg" alt="trainer" width="21" height="21">
          <span>
            {{ training.trainer || (training.user && training.user.name) }}
            <template v-if="training.diploma">({{ training.diploma }})</template>
          </span>
        </p><br>
        <p class="club" v-if="training.club">
          <img src="../assets/img/club.svg" alt="club" width="21" height="21">
          <span>{{ training.club }}</span>
        </p><br v-if="training.club">
        <p
          class="views"
          v-tippy="{ placement : 'right' }"
          :content="`Deze training is ${training.views ? training.views : 0} keer bekeken.`"
        >
          <img src="../assets/img/eye.svg" alt="weergaven" width="21" height="21">
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
        <div class="uitleg" ref="uitleg">
          <div>
            <p>{{ training.uitleg }}</p>
            <template v-if="training.variaties">
              <h4>Variaties</h4>
              <p>{{ training.variaties.trim() }}</p>
            </template>
            <template v-if="training.basics && training.basics.length > 0">
              <h4>Basics</h4>
              <ul>
                <li v-for="basic in training.basics" :key="basic">{{ basic }}</li>
              </ul>
            </template>
            <template v-if="training.tactics && training.tactics.length > 0">
              <h4>Tactics</h4>
              <div class="tactics-list">
                <template v-for="tactic in training.tactics">
                  <span :key="tactic">{{ tactic }}</span>
                  <br :key="tactic + 'br'">
                </template>
              </div>
            </template>
            <template v-if="training.doelstellingen">
              <h4>Coaching points</h4>
              <p>{{ training.doelstellingen.trim() }}</p>
            </template>
            <template v-if="training.doorschuifsysteem">
              <h4>Doorschuifsysteem</h4>
              <p>{{ training.doorschuifsysteem }}</p>
            </template>
            <template v-if="training.materiaal">
              <h4>Organization</h4>
              <p>{{ training.materiaal }}</p>
            </template>
            <template v-if="training.challenge">
              <h4>Progressions & regressions</h4>
              <p>{{ training.challenge }}</p>
            </template>
          </div>
          <img :src="training.img" :alt="'Trainers Vlaanderen | ' + training.titel" class="training">
        </div>
      </div>
      <div class="details">
        <p v-if="training.categorie"><span id="subtitle">Categorie</span>: {{ training.categorie | destructure }}</p>
        <p v-if="training.spelers"><span id="subtitle">Spelers</span>: {{ training.spelers }}</p>
        <p v-if="training.keepers"><span id="subtitle">Keepers</span>: {{ training.keepers }}</p>
        <p v-if="training.spelsituatie1 && training.spelsituatie2"><span id="subtitle">Spelsituatie</span>: {{`${training.spelsituatie1} v ${training.spelsituatie2}`}}</p>
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
          <img src="../assets/img/star.svg" alt="Print deze pagina" width="21" height="21">
          <span>Geef deze training een rating</span>
        </button>
        <button @click="printPage" class="print">
          <img src="../assets/img/printer.svg" alt="Print deze pagina" width="21" height="21">
          <span>Print deze pagina</span>
        </button>
        <button @click="exportAsPDF">
          <img src="../assets/img/download.svg" alt="Print deze pagina" width="21" height="21">
          <span>Exporteer als PDF</span>
        </button>
      </div>
    </section>

    <RatingModal
      ref="ratingModal"
      @ratingGiven="ratingGiven($event)"
    />

    <!-- Show snackbar when training has been rated -->
    <div style="display: flex; justify-content: center;">
      <transition name="fade">
        <Snackbar
          ref="snackbar"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../firebase";
import { printPage } from "../utils";
import html2pdf from "html2pdf.js";

import ReadRating from "../components/small/ReadRating.vue";
import Snackbar from "../components/modals/Snackbar.vue";
import RatingModal from "../components/modals/RatingModal.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  data() {
    return {
      isLoading: false,

      training: {},
      showRatingModal: false,
      rating: null,
      avgRating: null,
    }
  },
  components: {
    ReadRating,
    RatingModal,
    Snackbar,
    Loading,
  },
  async created() {
    this.isLoading = true;
    this.isUserAllowedToSeeTraining();

    await this.getTraining();
    await this.handleVisitedTraining();

    document.title = "Trainers Vlaanderen | " + this.training.titel;
    this.isLoading = false;
  },
  methods: {
    printPage,
    async exportAsPDF() {
      // Alter css styles
      this.$refs.uitleg.classList.add("uitleg-pdf");

      await html2pdf()
        .set({
          margin: 10,
          html2canvas: {
            dpi: 300,
            letterRendering: true,
            useCORS: true,
          },
        })
        .from(document.querySelector("#print"))
        .save(this.training.titel);

      this.$refs.uitleg.classList.remove("uitleg-pdf");
    },
    openRatingModal() {
      // Go to login page if not signed in
      if (!this.$store.state.user) {
        localStorage.setItem("ratingToAccountRoute", "true");
        this.$router.push("/account");
        return;
      }

      this.$refs.ratingModal.show();
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
      if (!trainingID) return;

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
      if (!this.$router.currentRoute.path.includes("/training/")) return;
      await db.ref(`Trainings/${this.$route.params.id}`)
        .update({ views });
    },
    ratingGiven(rating) {
      this.$refs.snackbar.show(`Je hebt deze training een rating van ${rating} / 5 gegeven.`);
      this.rating = rating;
      this.calculateRating();
      this.getTraining();
    },
    async calculateRating() {
      const trainingID = this.$route.params.id;
      if (!trainingID) return;

      await db.ref('Ratings')
        .orderByChild('trainingID')
        .equalTo(trainingID)
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
      await db.ref(`Trainings/${trainingID}`)
        .update({ rating: this.rating ? this.avgRating : -1 });
    },
    isUserAllowedToSeeTraining() {
      auth.onAuthStateChanged(async user => {
        if (user) return true;

        // Check if training belongs to the 9 most recent ones (those are public)
        await db.ref('Trainings')
          .limitToLast(9)
          .once('value', snapshot => {
            const trainingIDS = [];
            for (let [id] of Object.entries(snapshot.val())) {
              trainingIDS.push(id);
            }

            if (trainingIDS.includes(this.$route.params.id)) return true;

            // Redirect to login page
            this.$router.push("/account");
            localStorage.setItem("prohibitedTrainingToAccountRoute", "true");
          });
      });
    },
  },
  filters: {
    destructure(value) {
      return value.toString();
    },
  },
};

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

.uitleg ul {
  margin-left: 1.5rem;
}

.uitleg .tactics-list {
  margin-left: 0.5rem;
}

.uitleg li, .uitleg .tactics-list {
  line-height: 1.5em;
}

.uitleg img {
  align-self: center;
}

.uitleg-pdf {
  flex-direction: column;
  margin: 0;
}
.uitleg-pdf img {
  align-self: flex-start;
  margin: 3rem 0;
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