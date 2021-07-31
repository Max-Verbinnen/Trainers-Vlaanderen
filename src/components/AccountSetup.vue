<template>
  <div class="container">
    <div class="wrapper">
      <div class="box signin">
        <h2>Heb je al een account?</h2>
        <button class="signInBtn" @click="handleSignInClick">Login</button>
      </div>
      <div class="box signup">
        <h2>Heb je nog geen account?</h2>
        <button class="signupBtn" @click="handleSignUpClick">Registreer</button>
      </div>
    </div>
    <div class="formBx" ref="formBx">
      <div class="form signInForm">
        <form>
          <h3>Login</h3>
          <input type="email" placeholder="Email">
          <input type="password" placeholder="Wachtwoord">
          <input type="submit" value="Login">
          <a href="#" class="forgot">Wachtwoord vergeten</a>
        </form>
      </div>
      <div class="form signUpForm">
        <form>
          <h3>Registreer</h3>
          <input type="text" placeholder="Naam">
          <input type="email" placeholder="Email">
          <input type="password" placeholder="Wachtwoord">
          <input type="password" placeholder="Bevestig wachtwoord">
          <input type="submit" value="Registreer">
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    handleSignInClick() {
      this.$refs.formBx.classList.remove("active");
    },
    handleSignUpClick() {
      this.$refs.formBx.classList.add("active");
    },
  }
}

</script>

<style scoped>

.container {
  position: relative;
  width: 800px;
  height: 500px;
  margin: 20px;
}

.wrapper {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 420px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--secondary-green);
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.15);
}

.wrapper .box {
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.wrapper .box h2 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 10px;
}

.wrapper .box button {
  cursor: pointer;
  padding: 10px 20px;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  border: none;
}

.formBx {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: #fff;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.25);
  transition: 0.5s ease-in-out;
  overflow: hidden;
}

.formBx.active {
  left: 50%;
}

.formBx .form {
  position: absolute;
  left: 0;
  width: 100%;
  padding: 50px;
  transition: 0.5s;
}

.formBx .signInForm {
  transition-delay: 0.25s;
}

.formBx .signUpForm {
  left: 100%;
  transition-delay: 0s;
}

.formBx.active .signUpForm {
  left: 0;
}

.formBx.active .signInForm {
  left: -100%;
  transition-delay: 0s;
}

.formBx .form form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.formBx .form form h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 500;
}

.formBx .form form input {
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  outline: none;
  font-size: 16px;
  border: 1px solid #333;
}

.formBx .form form input[type="submit"] {
  background: var(--primary-green);
  border: none;
  color: #fff;
  max-width: 100px;
  cursor: pointer;
}

.formBx .form form .forgot {
  color: initial;
}

@media (max-width: 991px) {
  .container {
    max-width: 400px;
    height: 650px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container .wrapper {
    top: 0;
    height: 100%;
  }
  .formBx {
    width: 100%;
    height: 500px;
    top: 0;
    box-shadow: none;
  }
  .wrapper .box {
    position: absolute;
    width: 100%;
    height: 150px;
    bottom: 0;
  }
  .box.signin {
    top: 0;
  }
  .formBx.active {
    left: 0;
    top: 150px;
  }
}

</style>