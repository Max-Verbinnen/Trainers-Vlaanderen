<template>
  <div id="account-page">
    <section id="make-account">
      <AccountSetup v-if="!user" />
      <p v-if="user">Ingelogd, Yey!</p>
      <button v-if="user" @click="handleLogout()">Log uit</button>
    </section>
  </div>
</template>

<script>
import { auth } from "../firebase";

import AccountSetup from "../components/AccountSetup.vue";

export default {
  created() {
    document.title = "Trainers Vlaanderen | Account";
  },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    handleLogout() {
      auth.signOut();
    },
  },
  components: {
    AccountSetup,
  },
  beforeCreate() {
    auth.onAuthStateChanged(user => this.user = user);
  },
}

</script>

<style>

#make-account {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>