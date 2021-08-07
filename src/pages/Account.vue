<template>
  <div id="account-page">
    <AccountSetup v-if="!user" />
    <AccountInfo v-else />
  </div>
</template>

<script>
import AccountSetup from "../components/AccountSetup.vue";
import AccountInfo from "../components/AccountInfo.vue";

export default {
  created() {
    document.title = "Trainers Vlaanderen | Account";
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  components: {
    AccountSetup,
    AccountInfo,
  },
}

</script>