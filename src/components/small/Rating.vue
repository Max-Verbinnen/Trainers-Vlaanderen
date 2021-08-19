<template>
  <div class="rating">
    <ul class="list">
      <li @click="rate(star)" v-for="star in maxStars" :class="{ 'active': star <= stars }" :key="star.stars" class="star">
      <i :class="star <= stars ? 'fas fa-star' : 'far fa-star'"></i> 
      </li>
    </ul>
    <div v-if="hasCounter" class="info counter">
      <span class="score-rating">{{ stars }}</span>
      <span class="divider">/</span>
      <span class="score-max">{{ maxStars }}</span>
    </div>
  </div>
</template>
<script>
import { db } from "../../firebase";

export default {
  props: ['grade', 'maxStars', 'hasCounter'],
  data() {
    return {
      stars: this.grade,
      rating: null,
    };
  },
  created() {
    this.getTrainingRatings();
  },
  methods: {
    rate(star) {
      if (typeof star === 'number' && star <= this.maxStars && star >= 0) {
        this.stars = this.stars === star ? star - 1 : star;
        this.setRating();
      }
    },
    async getTrainingRatings() {
      await db.ref('Ratings').once('value', snapshot => {
        const ratings = snapshot.val();
        if (!ratings) return;

        for (let key in ratings) {
          // If userID or trainingID are not the current ones
          if (ratings[key].userID !== this.$store.state.user.userID || ratings[key].trainingID !== this.$route.params.id) return;

          // Set id on rating object
          ratings[key] = {
            ...ratings[key],
            id: key,
          };

          this.rating = ratings[key];
          this.stars = this.rating.score;
          this.$emit("alreadyRated", this.stars);
        }
      });
    },
    async setRating() {
      if (!this.rating) {
        await db.ref('Ratings').push({
          userID: this.$store.state.user.userID,
          trainingID: this.$route.params.id,
          score: this.stars,
        });
      } else {
        await db.ref('Ratings/' + this.rating.id)
          .update({ score: this.stars });
      }

      setTimeout(() => this.$emit("rating", this.stars), 500);
    },
  },
}

</script>

<style scoped>

.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  color: #b7b7b7;
  border-radius: 8px;
}

.rating .list {
  padding: 0;
  margin: 0 20px 0 0;
}

.rating .list:hover .star {
  color: #ffe100;
}

.rating .list .star {
  display: inline-block;
  font-size: 42px;
  transition: all .2s ease-in-out; 
  cursor: pointer;
}

.rating .list .star:hover ~ .star:not(.active) {
  color: inherit;
}

.rating .list .star :first-child {
  margin-left: 0;
}

.rating .list .star.active {
  color: #ffe100;
}

.rating .info {
  margin-top: 15px;
  font-size: 40px;
  text-align: center;
  display: table;
}

.divider {
  margin: 0 5px;
  font-size: 30px;
}

.score-max {
  font-size: 30px;
  vertical-align: sub;
}

</style>