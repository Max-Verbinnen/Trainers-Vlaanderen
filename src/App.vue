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
    BackToTopArrow
  },
  async beforeCreate() {
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
