<template>
  <div id="videos-page">
    <section id="videos">
      <h2>YouTube-video's van trainingen</h2>
      <form class="add-videos" @submit.prevent="handleSubmit">
        <input type="url" v-model.trim="input.url" placeholder="Plak hier de URL naar de YouTube video" required>
        <select v-model="input.selectedThema" required>
          <option disabled value="">Kies één thema</option>
          <option v-for="thema in themas" :key="thema">{{ thema }}</option>
        </select>
        <input type="submit" value="Voeg toe" class="btn">
        <p v-if="submitted">De video is toegevoegd bij het juiste thema.</p>
      </form>
      <div class="links">
        <a v-for="thema in themas" :href="'#' + thema" :key="thema">
          {{ thema }}
        </a>
      </div>
      <div class="videos-categories">
        <div class="themas">
          <div class="thema" v-for="thema in themas" :key="thema" :id="thema">
            <h3>{{ thema }}</h3>
            <div class="videos-wrapper">
              <template v-for="video in videos">
                <div
                  v-if="video.selectedThema === thema && !video.play"
                  :key="'img' + video.id"
                  class="video-overlay"
                >
                  <img :src="getThumbnail(video)" alt="video thumbnail" class="thumbnail">
                  <div class="play-btn" @click="video.play = true"></div>
                </div>
                <iframe
                  v-if="video.selectedThema === thema && video.play"
                  :src="`https://www.youtube-nocookie.com/embed/${getVideoID(video)}?autoplay=1`"
                  :key="'iframe' + video.id"
                  allowfullscreen
                  allow="autoplay"
                  frameborder="0"
                >
                </iframe>
              </template>
            </div>
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
      videos: [],
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
    getThumbnail(video) {  
      return `https://img.youtube.com/vi/${this.getVideoID(video)}/mqdefault.jpg`;
    },
    async getVideos() {
      await db.ref('Videos').once('value', snapshot => {
        const data = snapshot.val();
        let videosArray = [];

        for (let key in data) {
          data[key].id = key;
          data[key].play = false;
          videosArray.push(data[key]);
        }
        this.videos = videosArray;
      });
    },
  },
  async created() {
    document.title = "Trainers Vlaanderen | YouTube video's";
    await this.getVideos();
  },
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

.videos-wrapper {
  display: flex;
  flex-wrap: wrap;
}

iframe, .video-overlay {
  width: 300px;
  height: 150px;
  margin: 0 1rem 1rem 0;
}

.video-overlay {
  position: relative;
}

.video-overlay img {
  width: 100%;
  height: 100%;
  filter: brightness(0.6);
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2rem;
  height: 2rem;
  background: var(--primary-green);
  cursor: pointer;
  clip-path: polygon(100% 50%, 0 0, 0 100%);
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