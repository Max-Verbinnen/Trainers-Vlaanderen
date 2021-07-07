<template>
  <footer>
    <p class="copyright">&copy; Copyright Trainers Vlaanderen <span>{{new Date().getFullYear()}}</span></p>
    <p class="collab">Tijl Verbesselt 🤝 <a href="https://www.maxverbinnen.be/" target="_blank" rel="noopener">Max Verbinnen</a></p>
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
}

.copyright {
  /* background: rgb(250, 250, 250); */
  padding: 0.5rem 0;
}

.collab {
  padding: 1rem 0;
  /* background: rgb(246, 253, 243); */
}

footer a {
  color: black;
}

</style>