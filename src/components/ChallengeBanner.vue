<template>
  <div id="challenge-banner">
    <div class="challenge-container" @click="$emit('test')">
      <div class="challenge-info">
        <span class="title">{{ challenge.title }}</span>
        <span class="countdown">{{ now }}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    challenge: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      now: "",
    }
  },
  created() {
    setInterval(() => {
      const duration = this.moment.duration(this.moment(this.challenge.endDate).diff(this.moment()));
      this.now = this.formatDuration(duration);
    }, 1000);
  },
  methods: {
    formatDuration(duration) {
      const padNumber = num => (num >= 1 && num <= 9) ? "0" + num : num;
      const plural = (num, str) => {
        if (num == 1) return str;
        switch (str) {
          case "dag": return "dagen";
          case "uur": return "uren";
          case "seconde": return "seconden";
        }
      }

      return padNumber(duration.days()) + " " + plural(duration.days(), "dag") + " " +
             padNumber(duration.hours()) + " " + plural(duration.hours(), "uur") + " " +
             padNumber(duration.seconds()) + " " + plural(duration.seconds(), "seconde");
    },
  },
}

</script>

<style scoped>

.challenge-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5em;
  background-color: #FBAB7E;
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  cursor: pointer;
}

.challenge-info span.title {
  text-transform: uppercase;
  font-weight: 500;
}

.challenge-info span.countdown {
  display: inline-block;
  margin-left: 0.5em;
  background: #ee722b;
  padding: 0.15em;
  border-radius: 0.3em;
  font-weight: 600;
  color: white;
}

.title::before {
  content: "🔥";
}

.title::after {
  content: " eindigt binnen";
  text-transform: lowercase;
}

@media screen and (max-width: 590px) {
  .challenge-container {
    height: 4em;
  }

  .challenge-info {
    text-align: center;
  }
}

</style>