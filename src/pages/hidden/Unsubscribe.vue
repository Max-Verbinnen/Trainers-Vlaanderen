<template>
  <div>
    <section id="unsubscribe" v-if="!isLoading">
      <template v-if="$store.state.user">
        <h2>Je hebt je succesvol uitgeschreven van de Trainers Vlaanderen mails.</h2>
        <p>Neem gerust contact op met ons voor verdere vragen of verzoeken.</p>
      </template>
      <template v-else>
        <h2>Je moet ingelogd zijn om je te kunnen uitschrijven.</h2>
        <p>Doe dit in de 'Account' sectie, kom daarna terug naar deze pagina.</p>
      </template>
    </section>

    <Loading
      :active.sync="isLoading"
      color="var(--primary-green)"
      :width="50"
      :height="50"
    />
  </div>
</template>

<script>
import { db } from "../../firebase";

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    Loading,
  },
  created() {
    setTimeout(() => this.isLoading = false, 2000);
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {
    user() {
      // Unsubscribe here
      db.ref("Users/" + this.user.userID).update({ unsubscribed: true });
    },
  }
};

</script>


<style scoped>

section h2 {
  margin-bottom: 2rem;
}

</style>