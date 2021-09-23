<template>
  <div :class="classObj" ref="scroll" id="scroll">
    <button @click="scrollToTop">
      <img src="../assets/img/up.svg" alt="scroll naar boven">
    </button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      active: false
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  computed: {
    classObj() {
      return {
        "top-arrow": true,
        "active": this.active
      }
    }
  },
  created() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        this.active = true;
      } else {
        this.active = false;
      }
    });
  }
}

</script>

<style>

#scroll {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

#scroll.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.top-arrow {
  position: fixed;
  bottom: 2rem;
  right: 1rem;
  z-index: 500;
}

.top-arrow button {
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

.top-arrow button:hover {
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-10px);
}

</style>