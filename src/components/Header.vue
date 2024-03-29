<template>
  <header>
    <!-- Challenge banner -->
    <ChallengeBanner v-if="currentChallenge" :challenge="currentChallenge" v-on:test="$refs.challengeInfoModal.show(currentChallenge)" />

    <!-- Modal to view challenge info -->
    <ChallengeInfoModal
      ref="challengeInfoModal"
    />

    <!-- Actual navigation -->
    <nav>
      <h1 @click.stop="handleMobileNavClick"><router-link to="/" exact>
        <img src="../assets/img/logo.png" alt="Logo" id="nav-title">
      </router-link></h1>
      <img class="hamburger-menu" src="../assets/img/menu.svg" alt="navigatie icoon" @click="handleMobileNavClick">
      <ul ref="list">
        <li @click="handleMobileNavClick">
          <router-link to="/toevoegen" exact>Voeg je eigen training toe</router-link>
        </li>
        <li @click="handleMobileNavClick">
          <router-link to="/videos" exact>Trainingen op YouTube</router-link>
        </li>
        <li @click="handleMobileNavClick" class="account-link">
          <router-link to="/account" exact>
            <img src="../assets/img/user.svg" alt="account" width="21" height="21">
            <span>{{ user ? user.name : "Account" }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import ChallengeBanner from "./ChallengeBanner.vue";
import ChallengeInfoModal from "./modals/ChallengeInfoModal.vue";

export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
    currentChallenge() {
      const challenges = this.$store.state.challenges;
      const currentChallenges = challenges.filter(chal => {
        return this.moment(chal.startDate).isBefore(this.moment()) && this.moment(chal.endDate).isAfter(this.moment());
      });

      return (currentChallenges.length > 0) ? currentChallenges[0] : false;
    }
  },
  components: {
    ChallengeBanner,
    ChallengeInfoModal,
  },
  methods: {
    handleMobileNavClick(e) {
      if (e.target.id === "nav-title" && !this.$refs.list.classList.contains("active")) return;
      this.$refs.list.classList.toggle("active");
    },
  },
}

</script>

<style scoped>

header {
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 5rem;
  z-index: 100;
  background: white;
  background-color: var(--primary-dark);
}

nav {
  margin: 0 auto;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

ul li {
  display: inline-block;
  margin: 0 2rem;
}

ul li a img {
  transform: translateY(5px);
  filter: invert(100%);
}

nav a {
  text-decoration: none;
  color: white;
}

.hamburger-menu {
  width: 2em;
  cursor: pointer;
  display: none;
  filter: invert(100%);
}

h1 img {
  margin-left: 0.1em;
  width: 65px;
}

h1 a {
  color: var(--primary-green);
  display: flex;
  align-items: center;
}

a.router-link-active:not(h1 a) {
  position: relative;
}

a.router-link-active:not(h1 a)::before {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 50%;
  height: 2px;
  background: var(--primary-green);
  transform: translate(-50%);
}

.account-link a {
  font-weight: 600;
}

.account-link a img {
  margin-right: 0.25rem;
}

@media screen and (max-width: 1020px) {
  nav {
    flex-direction: column;
    justify-content: space-evenly;
    height: 6rem;
  }
  ul li {
    margin: 0 0.5rem;
  }
}

@media screen and (max-width: 760px) {
  nav {
    flex-direction: row;
  }
  ul {
    position: fixed;
    top: 0;
    right: -50rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: var(--primary-dark);
    padding: 0 2rem;
    transition: 0.5s ease;
    font-size: 1.5rem;
  }
  ul.active {
    right: 0;
  }
  ul li {
    margin: 1.5rem 0;
  }
  nav h1 {
    z-index: 1000;
  }
  .hamburger-menu {
    display: block;
    z-index: 1000;
  }
  ul li a img {
    transform: scale(1.3) translateY(2px);
  }
}

</style>