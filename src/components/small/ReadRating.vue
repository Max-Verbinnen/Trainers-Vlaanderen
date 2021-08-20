<template>
  <StarRating
    :rating="rating"
    :read-only="true"
    :show-rating="false"
    :active-color="starYellow"
    :increment="0.1"
    :star-size="20"
    :star-points="[259, 17, 237, 62, 215, 107, 191, 150, 142, 157, 92, 164, 43, 172, 21, 212, 54, 249, 89, 284, 125, 319, 129, 364, 121, 413, 112, 463, 125, 507, 172, 500, 216, 477, 260, 453, 305, 448, 349, 471, 393, 495, 439, 511, 465, 474, 456, 424, 448, 375, 442, 327, 477, 292, 513, 257, 549, 222, 542, 177, 494, 166, 444, 159, 395, 152, 365, 117, 343, 72, 321, 27, 284, 0]"
  />
</template>

<script>

import StarRating from 'vue-star-rating';

export default {
  props: {
    rating: {
      type: Number,
      required: true,
    }
  },
  components: {
    StarRating,
  },
  computed: {
    starYellow() {
      return getComputedStyle(document.documentElement).getPropertyValue('--star-yellow');
    },
  },
};

</script>
