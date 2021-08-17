<template>
  <footer>
    <p class="copyright">&copy; Copyright Trainers Vlaanderen <span>{{new Date().getFullYear()}}</span></p>
    <p class="collab"><a href="https://www.maxverbinnen.be/" target="_blank" rel="noopener">Max Verbinnen</a> 🤝 Tijl Verbesselt  </p>
  </footer>
</template>

<script>



</script>

<style scoped>

footer {
  width: 100%;
  height: 4rem;
  text-align: center;
  border-top: 2px solid #eee;
  margin-top: 4rem;
}

.copyright {
  padding: 0.5rem 0;
}

.collab {
  padding: 1rem 0;
}

footer a {
  color: black;
}

</style>