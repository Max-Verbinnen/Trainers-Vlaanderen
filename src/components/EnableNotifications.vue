<template>
  <div
    class="notif"
    ref="notification"
    v-tippy="{ placement : 'left' }"
    :content="notificationExplanation"
    v-if="active"
  >
    <button @click="askNotificationPermission">
      <img :src="notificationIcon" alt="meldingen">
    </button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      active: false,
      permission: "default",
    }
  },
  created() {
    // Show component
    if (this.$router.currentRoute.path === '/') this.active = true;

    // Store permission
    this.permission = Notification.permission;
  },
  methods: {
    askNotificationPermission() {
      if (!("Notification" in window)) return;

      if (this.permission === "default") {
        Notification
        .requestPermission()
        .then(permission => this.permission = permission);
      }
    },
  },
  computed: {
    notificationIcon() {
      return require(`../assets/img/notification${this.permission === "denied" ? "-disabled": ""}.svg`);
    },
    notificationExplanation() {
      if (this.permission === "default") return "Klik hier om meldingen te ontvangen wanneer er nieuwe trainingen bijkomen";
      if (this.permission === "granted") return "Je zal meldingen ontvangen als er nieuwe trainingen bijkomen.";
      if (this.permission === "denied") return "Je hebt besloten geen meldingen te ontvangen wanneer er nieuwe trainingen bijkomen.";
      return "";
    },
  },
  watch: {
    $route() {
      if (this.$router.currentRoute.path === '/') this.active = true;
      else this.active = false;
    },
  },
}

</script>

<style>

.notif {
  position: fixed;
  bottom: 6rem;
  right: 1rem;
  z-index: 500;
}

.notif button {
  width: 3rem;
  height: 3rem;
  background: var(--primary-green);
  border-radius: 50%;
  border: none;
  outline: none;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.notif button:hover {
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
}

</style>