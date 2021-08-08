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
          <select id="fill" v-model="training.diploma">
            <option disabled value="">Kies één diploma</option>
            <option>Geen diploma</option>
            <option>Keepertrainer 1</option>
            <option>Keepertrainer 2</option>
            <option>Physical coach 1</option>
            <option>Physical coach 2</option>
            <option>Initiator C</option>
            <option>Instructeur B</option>
            <option>UEFA B</option>
            <option>UEFA A</option>
            <option>UEFA Pro</option>
          </select>
        </div>
        <div class="input-group category">
          <label id="info">Categorie</label><br>
          <div id="fill">
            <div v-for="n in 14" :key="n">
              <input type="checkbox" :value="'U' + (n+5)" v-model="training.categorie">
              <label>U{{n + 5}}</label>
            </div>
            <div>
              <input type="checkbox" value="U21" v-model="training.categorie">
              <label>U21</label>
            </div>
            <div>
              <input type="checkbox" value="B" v-model="training.categorie">
              <label>B-ploeg / beloften</label>
            </div>
            <div>
              <input type="checkbox" value="A" v-model="training.categorie">
              <label>A-ploeg</label>
            </div>
          </div>
        </div>
        <div class="input-group players">
          <label id="info">Spelers*</label><br>
          <select id="fill" v-model="training.spelers" required>
            <option v-for="n in 23" :key="n">{{n - 1}}</option>
          </select>
        </div>
        <div class="input-group keepers">
          <label id="info">Keepers*</label><br>
          <select id="fill" v-model="training.keepers" required>
            <option v-for="n in 6" :key="n">{{n - 1}}</option>
          </select>
        </div>
        <div class="input-group">
          <label id="info">Materiaal</label><br>
          <input type="text" id="fill" v-model="training.materiaal" autocomplete="off">
        </div>
        <div class="input-group niveau">
          <label id="info">Niveau van spelers</label><br>
          <div id="fill">
            <div><input type="radio" value="Gemiddeld" v-model="training.niveau"><label>Gemiddeld</label></div>
            <div><input type="radio" value="Goed" v-model="training.niveau"><label>Goed</label></div>
            <div><input type="radio" value="Heel goed" v-model="training.niveau"><label>Heel goed</label></div>
            <div><input type="radio" value="Uitstekend" v-model="training.niveau"><label>Uitstekend</label></div>
          </div>
        </div>
        <div class="input-group duur">
          <label id="info">Duur (in minuten)*</label><br>
          <input id="fill" type="number" required autocomplete="off" v-model="training.duur">
        </div>
        <div class="input-group intensiteit">
          <label id="info">Intensiteit</label><br>
          <select id="fill" v-model="training.intensiteit">
            <option disabled value="">Kies één optie</option>
            <option>Arbeid</option>
            <option>Rust</option>
            <option>Herhalingen</option>
            <option>Sessie</option>
            <option>Rustsessie</option>
          </select>
        </div>
        <div class="input-group onderdeel">
          <label id="info">Onderdeel*</label><br>
          <select id="fill" v-model="training.onderdeel" required>
            <option disabled value="">Kies één onderdeel</option>
            <option>Opwarming</option>
            <option>Techniekvorm</option>
            <option>Pasvorm</option>
            <option>Afwerkvorm</option>
            <option>Balbezitvorm / positiespel</option>
            <option>Wedstrijdvorm</option>
            <option>Spelvorm</option>
            <option>Cooling down</option>
            <option>Keepertraining</option>
          </select>
        </div>
        <div class="input-group hoofdthema">
          <label id="info">Hoofdthema*</label><br>
          <select id="fill" v-model="training.hoofdthema" required>
            <option disabled value="">Kies één hoofdthema</option>
            <option>Techniek</option>
            <option>Speelwijze</option>
            <option>Fysiek</option>
            <option>Spelfases</option>
          </select>
        </div>
        <div class="input-group subthema" v-if="training.hoofdthema === 'Techniek'">
          <label id="info">Subthema</label><br>
          <select id="fill" v-model="training.subthema">
            <option disabled value="">Kies één subthema</option>
            <option>Frontaal</option>
            <option>Schuin-frontaal</option>
            <option>Zijwaarts</option>
            <option>Achterwaarts</option>
            <option>Gerichte aanname</option>
          </select>
        </div>
        <div class="input-group subthema" v-if="training.hoofdthema === 'Speelwijze'">
          <label id="info">Subthema</label><br>
          <select id="fill" v-model="training.subthema">
            <option disabled value="">Kies één subthema</option>
            <option>Opbouw</option>
            <option>Aanval via de flank</option>
            <option>Aanval via centrum</option>
            <option>Druk zetten</option>
          </select>
        </div>
        <div class="input-group subthema" v-if="training.hoofdthema === 'Fysiek'">
          <label id="info">Subthema</label><br>
          <select id="fill" v-model="training.subthema">
            <option disabled value="">Kies één subthema</option>
            <option>Activatie</option>
            <option>Aerobic</option>
            <option>Anaerobic</option>
            <option>Sterkte</option>
            <option>SAQ (Speed, Agility + Quickness)</option>
          </select>
        </div>
        <div class="input-group subthema" v-if="training.hoofdthema === 'Spelfases'">
          <label id="info">Subthema</label><br>
          <select id="fill" v-model="training.subthema">
            <option disabled value="">Kies één subthema</option>
            <option>Vrije trappen (B+, B-)</option>
            <option>Penalty's</option>
            <option>Corners (B+, B-)</option>
          </select>
        </div>
        <div class="input-group">
          <label id="info">Doelstellingen</label><br>
          <textarea id="fill" v-model="training.doelstellingen" placeholder="Wat wil je bereiken met deze vorm?"></textarea>
        </div>
        <div class="input-group">
          <label id="info">Uitleg van de training*</label><br>
          <textarea id="fill" v-model="training.uitleg" required></textarea>
        </div>
        <div class="input-group">
          <label id="info">Variaties</label><br>
          <input id="fill" type="text" v-model="training.variaties">
        </div>
        <div class="input-group">
          <label id="info">Doorschuifsysteem</label><br>
          <input id="fill" type="text" v-model="training.doorschuifsysteem">
        </div>
        <div class="input-group">
          <label id="info">Afbeelding* (.jpg / .png / .gif)</label><br>
          <input id="fill" type="file" @change="handleFile" accept="image/*" required>
        </div>
        <div class="input-group submit">
          <input id="fill" type="submit" value="Training toevoegen" class="btn">
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { db, storage, auth } from "../firebase";

export default {
  data() {
    return {
      training: {
        titel: "",
        diploma: "",
        categorie: [],
        spelers: 0,
        keepers: 0,
        materiaal: "",
        niveau: "",
        duur: 0,
        intensiteit: "",
        onderdeel: "",
        hoofdthema: "",
        subthema: "",
        doelstellingen: "",
        uitleg: "",
        variaties: "",
        doorschuifsysteem: "",
        img: "",

        // Trainer reference
        user: null,
      },
      file: null,
      gotURL: false,
    }
  },
  methods: {
    handleSubmit() {
      // Store image in firebase storage
      const storageRef = storage.ref(`${this.file.name}`).put(this.file);
      storageRef.on(`state_changed`, () => {
        storageRef.snapshot.ref.getDownloadURL().then(url => {
          this.training.img = url;
          this.gotURL = true;
          // Store this in database - view gotURL watch
        });
      });
    },
    handleFile(e) {
      this.file = e.target.files[0];
    },
    updateDiploma() {
      db.ref("Users/" + this.training.user.userID).update({ diploma: this.training.diploma });
    },
    getDiploma() {
      db.ref("Users/" + this.training.user.userID).once("value", snapshot => {
        const diploma = snapshot.val().diploma;
        if (diploma) this.training.diploma = diploma;
      });
    },
  },
  watch: {
    gotURL() {
      // Store in real-time database
      if (this.gotURL) {
        db.ref("Trainings").push(this.training)
        .then(() => {
          this.updateDiploma();
          localStorage.setItem("trainingAdded", "true");
          this.$router.push("/account");
        })
        .catch(err => console.log(err));
      }
    }
  },
  beforeCreate() {
    auth.onAuthStateChanged(user => {
      if (!user) return;
      db.ref('Users/' + user.uid).once("value", snapshot => {
        // email, name & userID
        this.training.user = {...snapshot.val(), userID: user.uid};

        // Get diploma from db
        this.getDiploma();
      });
    });
  },
  created() {
    document.title = "Trainers Vlaanderen | Deel je eigen trainingen";
  },
}

</script>

<style scoped>
h2 {
  margin-bottom: 2rem;
}

.input-group {
  margin: 1rem 0;
}

#info {
  font-size: 1.3rem;
}

#fill {
  margin-top: 0.5rem;
}

input, .players select, .keepers select, .onderdeel select, .hoofdthema select, .subthema select, .diploma select, .duur select, .intensiteit select, textarea {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgb(161, 161, 161);
}

input[type="text"], input[type="number"], select {
  width: 15rem;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-green);
}

.category #fill {
  max-width: 25rem;
}

.category #fill div {
  display: inline-block;
}

.category #fill input[type="checkbox"], .niveau #fill input[type="radio"] {
  margin-right: 0.15rem;
}

.category #fill label, .niveau #fill label {
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