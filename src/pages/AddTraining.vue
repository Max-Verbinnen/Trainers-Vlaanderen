<template>
  <div id="add-training-page">
    <section id="add-training">
      <h2>Deel je trainingen door het formulier in te vullen</h2>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label id="info">Titel*</label><br>
          <input id="fill" type="text" v-model="training.titel" required>
        </div>

        <div class="input-group diploma">
          <label id="info">Diploma</label><br>
          <div id="fill">
            <MultiSelect
              id="fill"
              v-model="training.diploma"
              placeholder="Kies één diploma"
              :options="diplomas"
              :multiple="false"
              :searchable="false"
            >
            </MultiSelect>
          </div>
        </div>

        <div class="input-group">
          <label id="info">Club*</label><br>
          <input id="fill" type="text" v-model="training.club" required list="clubs" autocomplete="off">
          <datalist id="clubs">
            <option v-for="club in orderedClubs" :key="club" :value="club"></option>
          </datalist>
        </div>

        <div class="input-group category">
          <label id="info">Categorie</label><br>
          <div id="fill">
            <input type="checkbox" value="Onderbouw" v-model="training.categorie">
            <label> Onderbouw (U6 - U9)</label><br>
            <input type="checkbox" value="Middenbouw" v-model="training.categorie">
            <label> Middenbouw (U10 - U13)</label><br>
            <input type="checkbox" value="Bovenbouw" v-model="training.categorie">
            <label> Bovenbouw (U14 - U21)</label><br>
            <input type="checkbox" value="Volwassen" v-model="training.categorie">
            <label> Volwassen ploegen</label>
          </div>
        </div>

        <div class="input-group players">
          <label id="info">Spelers*</label><br>
          <select id="fill" v-model="training.spelers" required>
            <option v-for="n in 23" :key="n">{{ n - 1 }}</option>
          </select>
        </div>

        <div class="input-group keepers">
          <label id="info">Keepers*</label><br>
          <select id="fill" v-model="training.keepers" required>
            <option v-for="n in 6" :key="n">{{ n - 1 }}</option>
          </select>
        </div>

        <div class="input-group spelsituatie">
          <label id="info">Spelsituatie*</label><br>
          <select id="fill" v-model="training.spelsituatie1" required>
            <option v-for="n in 11" :key="n">{{ n }}</option>
          </select>
          v
          <select id="fill" v-model="training.spelsituatie2" required>
            <option v-for="n in 11" :key="n">{{ n }}</option>
          </select>
        </div>

        <div class="input-group duur">
          <label id="info">Duur (in minuten)*</label><br>
          <input id="fill" type="number" required autocomplete="off" v-model="training.duur">
        </div>

        <!-- <div class="input-group intensiteit">
          <label id="info">Intensiteit</label><br>
          <div id="fill">
            <MultiSelect
              id="fill"
              v-model="training.intensiteit"
              placeholder="Kies één optie"
              :options="intensiteit"
              :multiple="false"
              :searchable="false"
            >
            </MultiSelect>
          </div>
        </div> -->

        <div class="input-group onderdeel">
          <label id="info">Soort vorm*</label><br>
          <div id="fill">
            <MultiSelect
              id="fill"
              v-model="training.onderdeel"
              placeholder="Kies één onderdeel"
              :options="onderdelen"
              :multiple="false"
              :searchable="false"
            >
            </MultiSelect>
          </div>
        </div>

        <div class="input-group basics">
          <label id="info">Basics</label><br>
          <div id="fill">
            <MultiSelect
              id="fill"
              v-model="training.basics"
              placeholder="Kies een aantal opties"
              track-by="name"
              label="name"
              :options="basics.plus.concat(basics.minus)"
              :multiple="true"
              :taggable="true"
            >
            </MultiSelect>
          </div>
        </div>

        <div class="input-group hoofdthema">
          <label id="info">Hoofdthema*</label><br>
          <div id="fill">
            <MultiSelect
              id="fill"
              v-model="training.hoofdthema"
              placeholder="Kies één hoofdthema"
              :options="themas.map(thema => thema.hoofd)"
              :multiple="false"
              :searchable="false"
            >
            </MultiSelect>
          </div>
        </div>

        <div class="input-group subthema" v-if="training.hoofdthema">
          <label id="info">Subthema</label><br>
          <div id="fill">
            <MultiSelect
              id="fill"
              v-model="training.subthema"
              track-by="name"
              label="name"
              placeholder="Kies één subthema"
              :options="subthemas.find(s => s.hoofd === training.hoofdthema).subs"
              :multiple="false"
              :searchable="false"
            >
            </MultiSelect>
          </div>
        </div>

        <div v-if="training.subthema && training.subthema.plus === true" class="input-group tactics">
          <label id="info">Tactics</label><br>
          <div id="fill">
            <MultiSelect
              id="fill"
              v-model="training.tactics"
              placeholder="Kies een aantal opties"
              :options="tactics.plus"
              :multiple="true"
              :taggable="true"
            >
            </MultiSelect>
          </div>
        </div>

        <div v-if="training.subthema && training.subthema.plus === false" class="input-group tactics">
          <label id="info">Tactics</label><br>
          <div id="fill">
            <MultiSelect
              id="fill"
              v-model="training.tactics"
              placeholder="Kies een aantal opties"
              :options="tactics.minus"
              :multiple="true"
              :taggable="true"
            >
            </MultiSelect>
          </div>
        </div>

        <div class="input-group">
          <label id="info">Organization</label><br>
          <textarea id="fill" v-model="training.materiaal" autocomplete="off" placeholder="Materiaal, afstanden, ruimtes"></textarea>
        </div>

        <div class="input-group">
          <label id="info">Drill explanation*</label><br>
          <textarea id="fill" v-model="training.uitleg" required placeholder="Rewards (puntensysteem), restrictions (opdrachten), 2nd action (tweede bal? omschakeling?)"></textarea>
        </div>

        <div class="input-group">
          <label id="info">Coaching points</label><br>
          <textarea id="fill" v-model="training.doelstellingen" placeholder="Wat verwacht je van je spelers in possession, out of possession en in transition? Waar focus je op als coach?"></textarea>
        </div>

        <div class="input-group">
          <label id="info">Progressions & regressions</label><br>
          <textarea id="fill" v-model="training.challenge" :placeholder="`Progression: hoe maak je het moeilijker voor je spelers?\nRegression: hoe maak je het gemakkelijker voor je spelers?`"></textarea>
        </div>

        <div class="input-group">
          <label id="info">Variaties</label><br>
          <textarea id="fill" v-model="training.variaties" autocomplete="off"></textarea>
        </div>

        <div class="input-group">
          <label id="info">Doorschuifsysteem</label><br>
          <input id="fill" type="text" v-model="training.doorschuifsysteem">
        </div>

        <div class="input-group">
          <label id="info">Afbeelding* (.jpg / .png / .gif)</label><br>
          <p class="info-msg">
            Voor meer informatie omtrent het maken van dergelijke afbeeldingen, kan je
            <router-link to="/boards" target="_blank">hier</router-link> terecht.
          </p>
          <label
            id="fill"
            class="custom-file-upload"
            ref="dropZone"
            @dragover.prevent="$refs.dropZone.classList.add('adding-file')"
            @dragenter.prevent="$refs.dropZone.classList.add('adding-file')"
            @dragleave.prevent="$refs.dropZone.classList.remove('adding-file')"
            @drop.prevent="handleDropFile"
          >
            <img class="img-icon" src="../assets/img/picture.svg" alt="media icoon">
            <span v-if="!fileInformation">Upload hier een afbeelding van de training</span>
            <div v-else class="file-info">
              <p>{{ fileInformation.name }} - {{ fileInformation.size }} MB</p>
              <img class="delete-file" src="../assets/img/trash.svg" alt="Verwijder afbeelding" @click.prevent="deleteFile" width="21" height="21">
            </div>
            <!-- This file input field is hidden -->
            <input type="file" @change="handleFile" accept="image/*" ref="fileInput">
          </label><br>
          <!-- Preview image -->
          <img v-if="fileInformation" :src="fileInformation.blob" alt="training afbeelding" class="preview-img">
        </div>

        <p class="error-group">
          {{ error }}
        </p>

        <div class="input-group submit">
          <input id="fill" type="submit" value="Training toevoegen" class="btn">
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { db, storage } from "../firebase";
import { currentDate } from "../utils";

import MultiSelect from 'vue-multiselect';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      training: {
        // Training info
        titel: "",
        diploma: "",
        club: "",
        categorie: [],
        spelers: null,
        keepers: null,
        spelsituatie1: null,
        spelsituatie2: null,
        materiaal: "",
        niveau: "",
        duur: "",
        intensiteit: "",
        onderdeel: "",
        basics: [],
        tactics: [],
        hoofdthema: "",
        subthema: "",
        doelstellingen: "",
        uitleg: "",
        challenge: "",
        variaties: "",
        doorschuifsysteem: "",
        img: "",
        date: currentDate(),

        // Trainer reference
        user: null,
      },
      file: null,
      fileInformation: null,
      droppedFile: null,
      gotURL: false,

      clubsList: [],

      error: "",
      hasError: false,
    }
  },
  components: {
    MultiSelect,
  },
  computed: {
    ...mapState({
      user: state => state.user,
      themas: state => state.themas,
      subthemas: state => state.subthemas,
      intensiteit: state => state.intensiteit,
      onderdelen: state => state.onderdelen,
      diplomas: state => state.diplomas,
      basics: state => state.basics,
      tactics: state => state.tactics,
    }),
    orderedClubs() {
      const clubs = [...this.clubsList];
      return clubs.sort((a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) return -1;
        if (a.toLowerCase() > b.toLowerCase()) return 1;
      });
    },
  },
  methods: {
    async handleSubmit() {
      // Handle error
      this.validate();
      if (this.hasError || this.error.length > 0) return;

      // Training basics are objects
      this.unfoldTrainingBasics();
      this.unfoldSubthemas();
      this.sortTrainingTactics();

      // Store image in firebase storage
      storage.ref(`${this.file.name}`).put(this.file).then(data => {
        data.ref.getDownloadURL().then(url => {
          this.training.img = url;
          this.gotURL = true; // -> watch
        });
      });
    },
    handleDropFile(e) {
      this.$refs.dropZone.classList.remove('adding-file')
      this.droppedFile = e.dataTransfer.files[0];
      this.$refs.fileInput.dispatchEvent(new Event('change'));
    },
    handleFile(e) {
      const file = this.droppedFile || e.target.files[0];
      if (!file) return;

      const fileSize = (file.size / (1024 * 1024)).toFixed(2); // in MB

      // Store info for image preview & feedback
      this.fileInformation = {
        blob: URL.createObjectURL(file),
        name: file.name,
        size: fileSize,
      }

      const correctFileType = file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/gif";
      const correctFileSize = parseFloat(fileSize, 10) < 1;

      if (correctFileType && correctFileSize) {
        this.file = file;
        this.hasError = false;
        this.error = "";
      } else {
        this.file = null;
        this.hasError = true;
        if (!correctFileType) this.error = "Je kan enkel afbeeldingen uploaden van het type jpg, png of gif.";
        if (!correctFileSize) this.error = "De maximale toegestane grootte voor afbeeldingen is 1 MB.";
      }
    },
    deleteFile() {
      this.$refs.fileInput.value = "";
      this.file = null;
      this.fileInformation = null;
      this.droppedFile = null;
    },
    validate() {
      if (!this.file) {
        this.hasError = true;
        this.error = "Je hebt nog geen afbeelding geüpload."
      }
    },
    updateDiploma() {
      db.ref("Users/" + this.user.userID).update({ diploma: this.training.diploma });
    },
    async updateClub() {
      let newClub = true;

      await db.ref('Clubs').once('value', snapshot => {
        const data = snapshot.val();
        for (let key in data) {
          if (data[key].toLowerCase() === this.training.club.toLowerCase()) newClub = false; 
        }
      });
      
      // Store club in database if new
      if (newClub) db.ref("Clubs").push(this.training.club);

      // Update club in user profile
      db.ref("Users/" + this.user.userID).update({ club: this.training.club });
    },
    getDiploma() {
      db.ref("Users/" + this.user.userID).once("value", snapshot => {
        const diploma = snapshot.val().diploma;
        if (diploma) this.training.diploma = diploma;
      });
    },
    getClub() {
      db.ref("Users/" + this.user.userID).once("value", snapshot => {
        const club = snapshot.val().club;
        if (club) this.training.club = club;
      });
    },
    storeUser() {
      this.training.user = {
        email: this.user.email,
        name: this.user.name,
        userID: this.user.userID,
      };
    },
    unfoldTrainingBasics() {
      const basics = this.training.basics;
      this.training.basics = [];
      for (let basic of basics) {
        this.training.basics.push(basic.name);
      }
    },
    unfoldSubthemas() {
      const subthema = this.training.subthema;
      if (typeof subthema === 'object' && subthema !== null) this.training.subthema = subthema.name;
    },
    sortTrainingTactics() {
      this.training.tactics.sort((a, b) => parseInt(a.slice(0, 2), 10) - parseInt(b.slice(0, 2), 10));
    },
  },
  watch: {
    gotURL() {
      // Store in real-time database
      if (this.gotURL) {
        db.ref("Trainings").push(this.training)
        .then(() => {
          this.updateDiploma();
          this.updateClub();

          localStorage.setItem("trainingAdded", "true");
          this.$router.push("/account");
        });
      }
    },
    user() {
      // This runs as soon as the user info has been committed in App.vue
      this.storeUser();

      // Get diploma & club from db
      this.getDiploma();
      this.getClub();
    },
  },
  created() {
    db.ref('Clubs').once('value', snapshot => {
      const data = snapshot.val();
      for (let key in data) {
        this.clubsList.push(data[key]);
      }
    });

    // Get diploma & club from db
    if (this.user) {
      this.storeUser();
      this.getDiploma();
      this.getClub();
    }

    document.title = "Trainers Vlaanderen | Deel je eigen trainingen";
  },
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.multiselect {
  width: 20rem;
}
</style>

<style scoped>

h2 {
  margin-bottom: 2rem;
}

.input-group, .error-group {
  margin: 1rem 0;
}

.error-group {
  color: var(--error-red);
}

#info {
  font-size: 1.3rem;
}

#fill {
  margin-top: 0.5rem;
}

.info-msg {
  font-style: italic;
  font-size: 0.9rem;
  margin: 0.5em 0;
}

input, .players select, .keepers select, .spelsituatie select, .onderdeel select, .hoofdthema select, .subthema select, .diploma select, .duur select, .intensiteit select, textarea {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgb(161, 161, 161);
}

input[type="text"], input[type="number"], select, p {
  width: 20rem;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-green);
}

.spelsituatie select {
  width: 9.5rem;
}

.category #fill {
  max-width: 25rem;
}

.category #fill div {
  display: inline-block;
}

.category #fill input[type="checkbox"] {
  margin-right: 0.15rem;
}

.category #fill label {
  margin-right: 0.5rem;
}

textarea {
  resize: vertical;
  width: 20rem;
  height: 10rem;
}

input[type="submit"] {
  cursor: pointer;
  font-size: 1.1rem;
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
  display: inline-flex;
  flex-direction: column;
  width: 20rem;
  border: 2px dotted rgb(161, 161, 161);
  padding: 2rem 1rem;
  cursor: pointer;
  text-align: center;
}

.custom-file-upload.adding-file {
  border: 4px dotted rgb(161, 161, 161);
}

.custom-file-upload .img-icon {
  width: 2rem;
  align-self: center;
  margin-bottom: 1rem;
}

img.preview-img {
  width: 20rem;
  object-fit: cover;
  margin-top: 1rem;
}

.file-info {
  display: flex;
  justify-content: center;
  align-items: center;
}

img.delete-file {
  margin-left: 0.5rem;
  position: relative;
  align-self: center;
  cursor: pointer;
  z-index: 100;
}

.input-group.submit a {
  display: inline-block;
  margin-left: 1rem;
  color: initial;
}

.success h3 {
  font-weight: 600;
  margin-bottom: 2rem;
}

</style>