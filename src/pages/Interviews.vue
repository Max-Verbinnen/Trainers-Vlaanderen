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
            <p>{{ interview.preface }}</p>
          </div>
          <div class="thumbnail">
            <img :src="require(`../assets/interviews/${interview.thumbnail}`)" :alt="interview.trainer">
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
  padding: 2.5em;
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(.51,.09,.21,.8);
  border-radius: 0% 1% 1% 0% / 0% 50% 50% 0% ;
  overflow: hidden;
}

.card:hover {
  margin-left: 0.5em;
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.2);
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
  max-width: 65%;
}

.thumbnail img {
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.4) opacity(0.8);
}

</style>