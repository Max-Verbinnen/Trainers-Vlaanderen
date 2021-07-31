<template>
  <header>
    <nav>
      <h1><router-link to="/" exact>
        <img src="../assets/img/logo.svg" alt="Logo">
        <span>Trainers Vlaanderen</span>
      </router-link></h1>
      <ul>
        <li><router-link to="/toevoegen" exact>Voeg je eigen training toe</router-link></li>
        <li><router-link to="/videos" exact>Trainingen op YouTube</router-link></li>
        <li><router-link to="/boards" exact>Coaching boards</router-link></li>
        <li><router-link to="/account" exact>Account</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>



</script>

<style scoped>

header {
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 5rem;
  z-index: 100;
  background: white;
}

nav {
  margin: 0 auto;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

ul li {
  display: inline-block;
  margin: 0 2rem;
}

nav a {
  text-decoration: none;
  color: initial;
}

h1 img {
  width: 40px;
  margin-right: 1rem;
}

h1 a {
  color: var(--primary-green);
  display: flex;
  align-items: center;
}

a.router-link-active:not(h1 a) {
  position: relative;
}

a.router-link-active:not(h1 a)::before {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 50%;
  height: 2px;
  background: var(--primary-green);
  transform: translate(-50%);
}

@media screen and (max-width: 1020px) {
  nav {
    flex-direction: column;
    justify-content: space-evenly;
    height: 6rem;
  }
  ul li {
    margin: 0 0.5rem;
  }
}

@media screen and (max-width: 460px) {
  nav {
    height: 9rem;
  }

  ul li {
    display: block;
    margin: 0;
    text-align: center;
  }

  ul li:nth-child(2) {
    margin-top: 0.25rem;
  }
}

</style>