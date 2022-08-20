<template>
  <div id="users-admin-page" v-if="isAdmin">
    <section id="challenges">
      <h2>Challenges</h2>
      <button class="btn add-challenge-btn" @click="$refs.addChallengeModal.show()">Voeg challenge toe</button>
      <ul class="section-content">
        <!-- Headings -->
        <li class="challenge"> 
          <div><strong>Titel</strong></div>
          <div><strong>Startdatum</strong></div>
          <div><strong>Einddatum</strong></div>
        </li>
        <!-- Challenges -->
        <li v-for="challenge in $store.state.challenges" :key="challenge.id" class="challenge">
          <div>{{ challenge.title }}</div>
          <div>{{ moment(challenge.startDate).format("DD/MM/YYYY") }}</div>
          <div>{{ moment(challenge.endDate).format("DD/MM/YYYY") }}</div>
        </li>
      </ul>
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
      if (!this.isAdmin || this.isInDevelopment) {
        localStorage.setItem("404", "true");
        this.$router.push("/");
        return;
      }
    }
  },
  computed: {
		isInDevelopment() {
			return process.env.NODE_ENV === "development";
		},
    isAdmin() {
      // Tijl & Max are admins
      const email = this.$store.state.user?.email || "nope";
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
  margin-bottom: 1em;
}

.user, .challenge {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.challenge {
  grid-template-columns: 1fr 1fr 1fr;
}

.user div, .challenge div {
  padding: 0.75rem;
  border: 1px solid var(--grey-border);
}

</style>