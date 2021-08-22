<template>
  <div id="users-admin-page" v-if="isAdmin">
    <section id="users">
      <h2>Lijst van alle trainers</h2>
      <ul>
        <li v-for="user in users" :key="user.email" style="margin-bottom: 0.5rem;">
          <span
            v-tippy="{ placement : 'right', interactive: true, allowHTML: true }"
            :content="user.email"
          >
            {{ user.name }}
          </span>
        </li>
      </ul>
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

</style>