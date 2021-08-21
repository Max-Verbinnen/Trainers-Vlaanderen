<template>
  <div id="rating-modal" @click="exitModal" ref="modal">
    <div class="modal">
      <h3>Beoordeel deze training</h3>
      <p v-if="!rating">Hoeveel sterren verdient deze training volgens jou?</p>
      <p v-else>Je hebt deze training reeds een rating van {{ rating }} / 5 gegeven.</p>

      <Rating
        :grade="0"
        :maxStars="5"
        @rating="$emit('exitModal'); $emit('ratingGiven', $event)"
        @alreadyRated="rating = $event"
      />

      <!-- Close modal -->
      <div class="close-modal">
        <button @click="$emit('exitModal')"><img src="../../assets/img/close.svg" alt="sluiten"></button>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from "../small/GiveRating.vue"

export default {
  data() {
    return {
      rating: null,
    };
  },
  components: {
    Rating,
  },
  methods: {
    exitModal(e) {
      if (e.target === this.$refs.modal) {
        this.$emit("exitModal");
        document.body.classList.remove("modal-open");
      }
    },
  },
}

</script>

<style scoped>

#rating-modal {
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.modal {
  position: relative;
  width: 500px;
  height: 340px;
  border-radius: 0.5rem;
  background: #fff;
  padding: 2rem;
}

.close-modal {
  position: absolute;
  top: 1.75rem;
  right: 2rem;
}

.close-modal button {
  background: none;
  border: none;
  outline: none;
  transform: scale(1.3);
  cursor: pointer;
}

.modal p {
  margin: 1rem 0;
}

h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.25rem;
}

</style>