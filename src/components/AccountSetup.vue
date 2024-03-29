<template>
  <section id="make-account">
    <div class="container">
      <div class="wrapper">
        <div class="box signin">
          <h2>Al een account?</h2>
          <button class="signInBtn btn" @click="handleSignInClick">Login</button>
        </div>
        <div class="box signup">
          <h2>Nog geen account?</h2>
          <button class="signUpBtn btn" @click="handleSignUpClick">Registreer</button>
        </div>
      </div>
      <div class="formBx" ref="formBx">
        <div class="form signInForm">
          <form @submit.prevent="handleLoginSubmission">
            <h3>Login</h3>
            <div class="input-data">
              <input type="email" autocomplete="email" required v-model="loginData.email">
              <div class="underline"></div>
              <label>Email</label>
            </div>
            <div class="input-data">
              <input type="password" required v-model="loginData.password">
              <div class="underline"></div>
              <label>Wachtwoord</label>
            </div>
            <p class="errMsg">{{ loginData.errorMsg }}</p>
            <input type="submit" value="Login" class="btn">
            <a href="#" class="forgot" @click="$refs.forgotPassword.show(loginData.email)">Wachtwoord vergeten</a>
          </form>
        </div>
        <div class="form signUpForm">
          <form @submit.prevent="handleSignupSubmission">
            <h3>Registreer</h3>
            <div class="input-data">
              <input type="text" autocomplete="name" required v-model="signupData.name">
              <div class="underline"></div>
              <label>Volledige naam</label>
            </div>
            <div class="input-data">
              <input type="email" autocomplete="email" required v-model="signupData.email">
              <div class="underline"></div>
              <label>Email</label>
            </div>
            <div class="input-data">
              <input type="password" required v-model="signupData.password">
              <div class="underline"></div>
              <label>Wachtwoord</label>
            </div>
            <div class="privacy">
              <input type="checkbox" required>
              <label>
                Ik ga akkoord met de
                <router-link to="/privacy-policy" target="_blank">privacyverklaring</router-link>
              </label>
            </div>
            <p class="errMsg">{{ signupData.errorMsg }}</p>
            <input type="submit" value="Registreer" class="btn">
          </form>
        </div>
      </div>

      <!-- Modal for when you forget your password -->
      <ForgotPassword
        ref="forgotPassword"
      />
    </div>

    <!-- Show login snackbar if you came from "add training" page -->
    <transition name="fade">
      <Snackbar
        ref="addTrainingSnackbar"
      />
    </transition>

    <!-- Show login snackbar if you wanted to give a rating -->
    <transition name="fade">
      <Snackbar
        ref="ratingSnackbar"
      />
    </transition>

    <!-- Show login snackbar if you wanted to see all trainings -->
    <transition name="fade">
      <Snackbar
        ref="loadTrainingsSnackbar"
      />
    </transition>

    <!-- Show login snackbar if you wanted to see training that's not part of the 9 public ones -->
    <transition name="fade">
      <Snackbar
        ref="prohibitedTrainingSnackbar"
      />
    </transition>
  </section>
</template>

<script>
import { db, auth } from "../firebase";
import { authErrors, currentDate } from "../utils";

import ForgotPassword from "./modals/ForgotPasswordModal.vue";
import Snackbar from "./modals/Snackbar.vue";

export default {
  data() {
    return {
      loginData: {
        email: "",
        password: "",
        errorMsg: "",
      },
      signupData: {
        name: "",
        email: "",
        password: "",
        errorMsg: "",
      },
    }
  },
  components: {
    ForgotPassword,
    Snackbar,
  },
  mounted() {
    if (localStorage.getItem("addTrainingToAccountRoute")) {
      this.$refs.addTrainingSnackbar.show("Je moet ingelogd zijn om trainingen te kunnen toevoegen.");
      localStorage.removeItem("addTrainingToAccountRoute");
    } else if (localStorage.getItem("ratingToAccountRoute")) {
      this.$refs.ratingSnackbar.show("Je moet ingelogd zijn om een training een rating te kunnen geven.");
      localStorage.removeItem("ratingToAccountRoute");
    } else if (localStorage.getItem("loadTrainingsToAccountRoute")) {
      this.$refs.loadTrainingsSnackbar.show("Je moet ingelogd zijn om alle trainingen te bekijken.");
      localStorage.removeItem("loadTrainingsToAccountRoute");
    } else if (localStorage.getItem("prohibitedTrainingToAccountRoute")) {
      this.$refs.loadTrainingsSnackbar.show("Je moet ingelogd zijn om deze training te bekijken.");
      localStorage.removeItem("prohibitedTrainingToAccountRoute");
    }
  },
  methods: {
    handleSignInClick() {
      this.$refs.formBx.classList.remove("active");
    },
    handleSignUpClick() {
      this.$refs.formBx.classList.add("active");
    },
    handleLoginSubmission() {
      auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
        .then(() => this.loginData = {})
        .catch(err => this.handleError(err, "login"));
    },
    handleSignupSubmission() {
      auth.createUserWithEmailAndPassword(this.signupData.email, this.signupData.password)
        .then(data => {
          db.ref('Users/' + data.user.uid).set({
            name: this.formatFullName(this.signupData.name),
            email: data.user.email,
            date: currentDate(),
          });
          this.signupData = {};
        })
        .catch(err => this.handleError(err, "signup"));
    },
    formatFullName(name) {
      if (!name) return "";

      const nameArray = name.trim().split(" ");
      const casing = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      if (nameArray.length === 1) return casing(nameArray[0]);

      // Name consists of 2 or more parts (only uppercase first and last part => i.e. not "de")
      nameArray.forEach((part, index) => nameArray[index] = part.charAt(0) + part.slice(1).toLowerCase());
      nameArray[0] = casing(nameArray[0]);
      nameArray[nameArray.length - 1] = casing(nameArray[nameArray.length - 1]);
      return nameArray.join(" ");
    },
    handleError(error, state) {
      // eslint-disable-next-line
      if (process.env.NODE_ENV === "development") console.log(error.code, ' - ', error.message);
      const code = error.code.split("/")[1];

      if (authErrors()[code]) {
        if (state === "login") this.loginData.errorMsg = authErrors()[code];
        if (state === "signup") this.signupData.errorMsg = authErrors()[code];
      } else {
        const defaultErr = "Er is een fout opgetreden in ons systeem. Onze excuses hiervoor.";
        if (state === "login") this.loginData.errorMsg = defaultErr;
        if (state === "signup") this.signupData.errorMsg = defaultErr;
      }

      setTimeout(() => {
        this.loginData.errorMsg = "";
        this.signupData.errorMsg = "";
      }, 5000);
    },
  },
}

</script>

<style scoped>

#make-account {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  position: relative;
  width: 51em;
  height: 31.25em;
  margin: 1.25rem;
}

.wrapper {
  position: absolute;
  top: 2.5em;
  width: 100%;
  height: 26.25em;
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
  margin-bottom: 0.625rem;
}

.wrapper .box button {
  cursor: pointer;
  padding: 0.625rem 1.25rem;
  border: none;
  color: initial;
}

.formBx {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: #fff;
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
  padding: 3.125rem;
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

.input-data {
  height: 40px;
  width: 100%;
  position: relative;
  margin-bottom: 1.5rem;
}

.input-data input {
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  font-size: 17px;
  border-bottom: 2px solid silver;
}

.input-data input:focus ~ label, .input-data input:valid ~ label {
  transform: translateY(-25px);
  font-size: 0.8rem;
  color: initial;
}

.input-data label {
  position: absolute;
  bottom: 10px;
  left: 0;
  color: grey;
  pointer-events: none;
  transition: all 0.3s ease;
}

.input-data .underline {
  position: absolute;
  height: 2px;
  width: 100%;
  bottom: 0;
}

.input-data .underline::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background: var(--primary-green);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-in-out;
}

.input-data input:focus ~ .underline:before, .input-data input:valid ~ .underline:before {
  transform: scaleX(1);
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active {
 -webkit-box-shadow: 0 0 0 30px white inset !important;
}

.privacy {
  margin-bottom: 0.25rem;
}

.privacy input[type="checkbox"] {
  margin-right: 0.25rem;
}

.privacy a {
  color: initial;
}

.signInBtn, .signUpBtn, input[type="submit"] {
  font-size: 1rem;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
}

.formBx .form form h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.25rem;
}

.formBx .form form input[type="submit"] {
  max-width: 10em;
  background: var(--primary-green);
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.75rem 1.25rem;
}

.btn {
  background: #fff;
  margin-top: 1rem;
}

.formBx .form form .forgot {
  color: initial;
  margin-top: 1rem;
}

.errMsg {
  color: var(--error-red);
  font-size: 0.9rem;
}

@media (max-width: 991px) {
  .container {
    max-width: 25em;
    height: 40.625em;
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
    height: 31.25em;
    top: 0;
    box-shadow: none;
  }
  .wrapper .box {
    position: absolute;
    width: 100%;
    height: 9.375em;
    bottom: 0;
  }
  .box.signin {
    top: 0;
  }
  .formBx.active {
    left: 0;
    top: 9.375em;
  }
}

</style>