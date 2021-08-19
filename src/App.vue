<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
    <BackToTopArrow />
  </div>
</template>

<script>
import { db, auth } from "./firebase"

import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import BackToTopArrow from "./components/BackToTopArrow.vue"

export default {
  components: {
    Header,
    Footer,
    BackToTopArrow
  },
  async beforeCreate() {
    auth.onAuthStateChanged(async user => {
      if (!user) return;

      let dbUser;
      await db.ref('Users/' + user.uid).once("value", snapshot => {
        dbUser = {
          name: snapshot.val().name,
          diploma: snapshot.val().diploma,
          club: snapshot.val().club,
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
  // async created() {
  //   await db.ref('Trainings/').orderByChild("trainer").equalTo("Tijl Verbesselt").once("value", snapshot => {
  //     let trainingsArray = [];
  //     snapshot.forEach(child => {
  //       trainingsArray.push({
  //         ...child.val(),
  //         id: child.key,
  //       });
  //     });

  //     trainingsArray.forEach(training => {
  //       db.ref("Trainings/" + training.id).update({ user: {
  //         email: "tijl.verbesselt@icloud.com",
  //         name: "Tijl Verbesselt",
  //         userID: "9sORBkrOLAORJcTrOpelEfAKGjK2",
  //         club: "KHO Bierbeek",
  //       } });
  //       db.ref("Trainings/" + training.id).update({ club: "KHO Bierbeek"});
  //     });
  //   });
  // },
}

</script>

<style>

</style>
