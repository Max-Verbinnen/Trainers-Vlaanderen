<template>
  <div id="videos-page">
    <section id="videos">
      <h2>YouTube-video's van trainingen</h2>
      <form class="add-videos" @submit.prevent="handleSubmit">
        <input type="url" v-model.trim="input.url" placeholder="Plak hier de URL naar de YouTube video" required>
        <select v-model="input.selectedThema" required>
          <option disabled value="">Kies één thema</option>
          <option v-for="thema in themas" :key="thema">{{thema}}</option>
        </select>
        <input type="submit" value="Voeg toe" class="btn">
        <p v-if="submitted">De video is toegevoegd bij het juiste thema.</p>
      </form>
      <div class="links">
        <a v-for="thema in themas" :href="'#' + thema" :key="thema">
          {{thema}}
        </a>
      </div>
      <div class="videos-categories">
        <div class="themas">
          <div class="thema" v-for="thema in themas" :key="thema" :id="thema">
            <h3>{{thema}}</h3>
            <template v-for="video in videos">
              <iframe v-if="video.selectedThema === thema" :key="video.id" :src="'https://www.youtube-nocookie.com/embed/' + getVideoID(video)" allowfullscreen frameborder="0"></iframe>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  data() {
    return {
      themas: ["Opwarming", "Techniekvorm", "Pasvorm", "Afwerkvorm", "Balbezitvorm / positiespel", "Wedstrijdvorm", "Spelvorm", "Cooling down", "Spelfases", "Keepertraining"],
      input: {
        url: "",
        selectedThema: "",
      },
      submitted: false,
      videos: []
    }
  },
  methods: {
    handleSubmit() {
      // Upload to database
      db.ref("Videos").push(this.input)
        .then(() => this.getVideos());

      // Reset values
      this.input = {};
      this.submitted = true;
      setTimeout(() => this.submitted = false, 3000);
    },
    getVideoID(video) {
      const regex = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
      const match = video.url.match(regex);
      return (match && match[1].length == 11) ? match[1] : false;
    },
    getVideos() {
      db.ref('Videos').once('value', snapshot => {
        const data = snapshot.val();
        let videosArray = [];

        for (let key in data) {
          data[key].id = key;
          videosArray.push(data[key]);
        }
        this.videos = videosArray;
      });
    }
  },
  created() {
    document.title = "Trainers Vlaanderen | YouTube video's";
    this.getVideos();
  },
  mounted() {
    window.scrollTo(0, 0);
  }
}

</script>

<style scoped>

#videos-page {
  min-height: 110vh;
}

#videos {
  margin-bottom: 5rem;
}

h2 {
  margin-bottom: 2rem;
}

h3 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.thema {
  padding-top: 5rem;
  margin-bottom: -3rem;
}

.videos-categories {
  margin-bottom: 4rem;
}

iframe {
  margin: 0 1rem 1rem 0;
}

input[type="url"] {
  width: 21rem;
  border-radius: 0.5rem 0 0 0.5rem;
}

input, select {
  padding: 0.5rem 1rem;
  border: 1px solid rgb(161, 161, 161);
}

input:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-green);
}

input[type="submit"] {
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

form p {
  margin-top: 0.5rem;
  padding-left: 1rem;
}

.add-videos {
  margin-bottom: 0.5rem;
}

@media screen and (max-width: 350px) {
  iframe {
    max-width: 250px;
  }
}

.links {
  margin-top: 1rem;
}

.links a {
  text-decoration: none;
  display: inline-block;
  background: #D0EAE8;
  color: #66A8A2;
  padding: 0.25rem 0.5rem;
  border-radius: 5rem;
  margin: 0 0.25rem 0.5rem 0;
  font-size: 0.9rem;
}

</style>