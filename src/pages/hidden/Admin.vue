<template>
  <div id="users-admin-page" v-if="isAdmin">
    <section id="challenges">
      <div class="section-content">
        <h2>Challenges</h2>
        <ul class="challenges-overview">
          <li>One</li>
          <li>Two</li>
        </ul>
        <button class="btn add-challenge-btn" @click="$refs.addChallengeModal.show('smdkf')">Voeg challenge toe</button>
      </div>
    </section>

    <!-- Modal for when you forget your password -->
    <AddChallengeModal
      ref="addChallengeModal"
    />

    <section id="users">
      <h2>Lijst van alle trainers ({{ users.length }})</h2>
      <ul class="section-content">
        <!-- Headings -->
        <li class="user"> 
          <div><strong>Naam</strong></div>
          <div><strong>Laatste keer ingelogd</strong></div>
        </li>
        <!-- Users -->
        <li v-for="user in users" :key="user.email" class="user">
          <div>
            <span
              v-tippy="{ placement : 'right', interactive: true }"
              :content="user.userID"
            >
              {{ user.name }}
            </span>
          </div>
          <div>
            {{ user.lastLoginDate ? user.lastLoginDate : "/" }}
          </div>
        </li>
      </ul>
    </section>

    <section id="e-mails">
      <h2>Alle e-mails ({{ emails.length }})</h2>
      <p class="section-content">
        {{ emails.join(", ") }}
      </p>
    </section>
  </div>
</template>

<script>
import { db } from "../../firebase";

import AddChallengeModal from "../../components/modals/AddChallengeModal.vue";

export default {
  data() {
    return {
      users: [],
    };
  },
  components: {
    AddChallengeModal,
  },
  async created() {
    try {
      await this.getAllUsers();
      this.sortUsers();
    } catch (err) {
      if (!this.isAdmin) {
        localStorage.setItem("404", "true");
        this.$router.push("/");
        return;
      }
    }
  },
  computed: {
    isAdmin() {
      // Tijl & Max are admins
      const email = this.$store.state.user?.email;
      return email === process.env.VUE_APP_ADMIN_ONE || email === process.env.VUE_APP_ADMIN_TWO;
    },
    emails() {
      return this.users
        .filter(user => !user.unsubscribed)
        .map(user => user.email);
    },
  },
  methods: {
    async getAllUsers() {
      await db.ref("Users").once("value", snapshot => {
        for (let [id, value] of Object.entries(snapshot.val())) {
          this.users.push({ ...value, userID: id });
        }
      });
    },
    sortUsers() {
      const format = "DD/M/YYYY HH:mm";
      return this.users.sort((a, b) => this.moment(a.date, format) - this.moment(b.date, format));
    },
  }
}

</script>

<style scoped>

h2 {
  margin-bottom: 2rem;
}

.section-content {
  margin-bottom: 3rem;
}

.add-challenge-btn {
  border: none;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
}

.user {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.user div {
  padding: 0.75rem;
  border: 1px solid var(--grey-border);
}

</style>