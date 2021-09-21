<template>
  <div id="users-admin-page" v-if="isAdmin">
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
              :content="user.email"
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

    <section id="users">
      <h2>Alle e-mails</h2>
      <p class="section-content">
        {{ users.map(user => user.email).join(", ") }}
      </p>
    </section>
  </div>
</template>

<script>
import { db } from "../../firebase";

export default {
  data() {
    return {
      users: [],
    };
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
  },
  methods: {
    async getAllUsers() {
      await db.ref("Users").once("value", snapshot => {
        for (let [, value] of Object.entries(snapshot.val())) {
          this.users.push(value);
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

.user {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.user div {
  padding: 0.75rem;
  border: 1px solid var(--grey-border);
}

</style>