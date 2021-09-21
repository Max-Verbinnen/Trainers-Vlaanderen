<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
    <BackToTopArrow />
  </div>
</template>

<script>
import { db, auth } from "./firebase";
import { currentDate } from "./utils";

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import BackToTopArrow from "./components/BackToTopArrow.vue";

export default {
  components: {
    Header,
    Footer,
    BackToTopArrow,
  },
  watch: {
    $route() {
      auth.onAuthStateChanged(user => {
        if (!user && this.$router.currentRoute.path === "/toevoegen") {
          this.$router.push("/account");
          localStorage.setItem("addTrainingToAccountRoute", "true");
        }
      });
    },
  },
  async created() {
    this.storeUser();
    // await this.storeTrainings();
    // this.askNotificationPermission();
    // this.listenForNewTrainings();
  },
  methods: {
    storeUser() {
      auth.onAuthStateChanged(async user => {
        if (!user) return;

        // Keep track of user's last login
        await db.ref('Users/' + user.uid).update({ lastLoginDate: currentDate() });

        let dbUser;
        await db.ref('Users/' + user.uid).once("value", snapshot => {
          dbUser = {
            name: snapshot.val().name,
            diploma: snapshot.val().diploma,
            club: snapshot.val().club,
            date: snapshot.val().date,
            lastLoginDate: snapshot.val().lastLoginDate,
          };
        });

        this.$store.commit("setUser", {
          email: user.email,
          userID: user.uid,
          ...dbUser,
        });
      });
    },
    async storeTrainings() {
      await db.ref('Trainings').once('value', snapshot => {
        const trainingsArray = [];
        snapshot.forEach(child => {
          trainingsArray.push({
            ...child.val(),
            id: child.key,
          });
        });

        this.$store.commit("setTrainings", trainingsArray);
      });
    },
    askNotificationPermission() {
      if (!("Notification" in window)) return;
      if (Notification.permission === "default") Notification.requestPermission();
    },
    async listenForNewTrainings() {
      const trainings = this.$store.state.trainings;
      db.ref('Trainings').on('value', async snapshot => {
        const trainingsArray = [];
        snapshot.forEach(child => {
          trainingsArray.push({
            ...child.val(),
            id: child.key,
          });
        });

        if (trainings.length > 0 && trainingsArray.length > trainings.length && Notification.permission === "granted") {
          const newTraining = trainingsArray[trainingsArray.length - 1];
          const notification = new Notification(newTraining.titel, {
            body: "Nieuwe training toegevoegd op Trainers Vlaanderen!",
            icon: "/favicon",
            image: newTraining.img,
          });

          await this.$store.commit("setTrainings", trainingsArray);

          notification.addEventListener("click", () => {
            this.$router.push(`/training/${newTraining.id}/${newTraining.titel.replace(/\W+/g, '-').toLowerCase()}`);
          });
        }
      })
    }
  },
  async mounted() {
    /*
      This is the place for database migrations :)
    */

    // await db.ref('Trainings/').orderByChild("trainer").equalTo("x").once("value", snapshot => {
    //   let trainingsArray = [];
    //   snapshot.forEach(child => {
    //     trainingsArray.push({
    //       ...child.val(),
    //       id: child.key,
    //     });
    //   });

    //   trainingsArray.forEach(training => {
    //     db.ref("Trainings/" + training.id).update({ user: {
    //       email: "x",
    //       name: "x",
    //       userID: "x",
    //     } });
    //     db.ref("Trainings/" + training.id).update({ rating: null });
    //   });
    // });

    // await db.ref('Trainings/').once("value", snapshot => {
    //   let trainingsArray = [];
    //   snapshot.forEach(child => {
    //     trainingsArray.push({
    //       ...child.val(),
    //       id: child.key,
    //     });
    //   });

    //   trainingsArray.forEach(training => {
    //     db.ref("Trainings/" + training.id).update({ user: {
    //       email: "x",
    //       name: "x",
    //       userID: "x",
    //       club: "x",
    //     } });
    //     db.ref("Trainings/" + training.id).update({ rating: -1 });
    //   });
    // });
  },
}

</script>

<style>

</style>
