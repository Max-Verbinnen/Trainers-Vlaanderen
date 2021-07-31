<template>
  <div id="account-page">
    <section id="make-account">
      <AccountSetup />
    </section>
  </div>
</template>

<script>
import AccountSetup from "../components/AccountSetup.vue";

export default {
  created() {
    document.title = "Trainers Vlaanderen | Account";
  },
  components: {
    AccountSetup,
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