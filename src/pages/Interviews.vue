<template>
  <div>
    <section id="interviews">
      <h2>Interviews</h2>
      <div v-for="interview in interviews" :key="interview.id" class="card">
        <router-link :to="`/interviews/${interview.trainer}`">
          <div class="interview-number">
            {{ interview.id }}
          </div>
          <div class="interview-info">
            <h3>{{ interview.trainer }}</h3>
            <p>Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.Dit is mijn inleiding.</p>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  created() {
    document.title = "Trainers Vlaanderen | Interviews";
  },
  computed: {
    interviews() {
      return this.$store.state.interviews;
    },
  },
}

</script>

<style scoped>

h2 {
  margin-bottom: 2rem;
}

h3 {
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
}

.card {
  position: relative;
  max-width: 60em;
  margin-bottom: 3em;
  padding: 2em;
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.15);
}

.card a {
  text-decoration: none;
  color: initial;
  display: flex;
}

.interview-number {
  position: absolute;
  top: 0px;
  left: 15px;
  font-size: 4rem;
  opacity: 0.15;
}

.interview-info {
  margin-left: 2em;
}

</style>