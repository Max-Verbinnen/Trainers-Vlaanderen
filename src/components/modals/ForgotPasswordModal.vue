<template>
  <div id="forgot-password-modal" @click="shouldExit" ref="modal" v-if="visible">
    <div class="modal">
      <h3>Wachtwoord vergeten?</h3>
      <p>{{ emailSent ? `Er is een e-mail verzonden naar ${email}` : "Er wordt een mail gestuurd" }} waarin een link staat om je wachtwoord te veranderen. Kijk zeker ook eens in je spam of junk folder indien de mail niet direct aankomt.</p>
      <div class="input-data">
        <input
          type="email"
          autocomplete="email"
          :disabled="emailSent"
          required
          v-model="email"
        >
        <div class="underline"></div>
        <label v-visible="!emailSent">Email</label>
      </div>

      <p class="errMsg">{{ forgotPasswordErrorMsg }}</p>

      <input
        type="submit"
        :value="emailSent ? 'E-mail verzonden' : 'Verzend e-mail'"
        :disabled="emailSent"
        class="btn"
        :class="{ 'disabled': emailSent }"
        @click="handleForgotPassword"
      >

      <!-- Close modal -->
      <div class="close-modal">
        <button @click="close">
          <img src="../../assets/img/close.svg" alt="sluiten" width="21" height="21">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../../firebase"
import { authErrors } from "../../utils"

export default {
  data() {
    return {
      visible: false,
      
      forgotPasswordErrorMsg: "",
      email: "",
      emailSent: false,
    };
  },
  methods: {
    show(email) {
      this.visible = true;
      document.body.classList.add("modal-open");

      this.email = email;
    },
    close() {
      this.visible = false;
      document.body.classList.remove("modal-open");
    },
    shouldExit(e) {
      if (e.target === this.$refs.modal) this.close();
    },
    handleForgotPassword() {
      auth.sendPasswordResetEmail(this.email, { url: "https://www.trainersvlaanderen.be/account" })
        .then(() => {
          this.emailSent = true;
          this.forgotPasswordErrorMsg = "";
        })
        .catch(err => this.handleError(err));
    },
    handleError(error) {
      if (process.env.NODE_ENV === "development") console.log(error.code, ' - ', error.message);
      const code = error.code.split("/")[1];

      if (authErrors()[code]) {
        this.forgotPasswordErrorMsg = authErrors()[code];
      } else {
        const defaultErr = "Er is een fout opgetreden in ons systeem. Onze excuses hiervoor.";
        this.forgotPasswordErrorMsg = defaultErr;
      }

      setTimeout(() => {
        this.forgotPasswordErrorMsg = "";
      }, 5000);
    },
  },
}

</script>

<style scoped>

#forgot-password-modal {
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

.input-data {
  height: 40px;
  width: 100%;
  position: relative;
  margin: 2rem 0 1.5rem 0;
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

input[type="submit"] {
  font-size: 1rem;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 0.625rem 1.25rem;
  border: none;
  color: #fff;
}

input[type="submit"].disabled {
  cursor: default;
  background: var(--disabled-grey);
}

.errMsg {
  color: var(--error-red);
  font-size: 0.9rem;
}

</style>