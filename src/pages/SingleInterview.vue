<template>
  <div>
    <section id="qqsdf">
      <h2>Interview met {{ interviewedTrainer }}</h2>
      <div v-for="textBlock in interview.text" :key="textBlock.question" class="text-block">
        <!-- Q&A's -->
        <template v-if="textBlock.question">
          <h4>{{ textBlock.question }}</h4>
          <p>{{ textBlock.answer }}</p>
        </template>
        <!-- Quotes -->
        <template v-if="textBlock.quote">
          <FontAwesomeIcon :icon="['fas', 'quote-left']" />
          <p class="quote">{{ textBlock.quote }}</p>
        </template>
        <!-- Images -->
        <template v-if="textBlock.image">
          <img :src="require(`../assets/interviews/${textBlock.image}`)" :alt="interviewedTrainer">
        </template>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  created() {
    document.title = `Trainers Vlaanderen | Interview met ${this.interviewedTrainer}`;
  },
  computed: {
    interviewedTrainer() {
      return this.$route.params.name;
    },
    interview() {
      return this.$store.state.interviews.find(interview => interview.trainer == this.interviewedTrainer);
    },
  },
}

</script>

<style scoped>

h2 {
  margin-bottom: 2rem;
}

.text-block {
  position: relative;
  max-width: 50em;
  margin-bottom: 1.75em;
}

.text-block h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5em;
}

.text-block p {
  line-height: 25px;
}

.text-block .quote {
  margin: 2em 0;
  margin-left: 3em;
  font-size: 1.2rem;
  font-weight: 300;
}

.text-block svg {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.2;
  font-size: 2rem;
}

.text-block img {
  margin: 1em 0;
  width: 50em;
}

</style>