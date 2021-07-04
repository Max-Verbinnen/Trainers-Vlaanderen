<template>
  <div id="videos-page">
    <Header />
    <section id="videos">
      <h2>YouTube-video's van trainingen</h2>
      <div class="videos-categories">
        <div class="themas">
          <div class="thema" v-for="thema in themas" :key="thema">
            <h3>{{thema}}</h3>
            <template v-for="video in videos">
              <iframe v-if="video.selectedThema === thema" :key="video.id" :src="'https://www.youtube-nocookie.com/embed/' + getVideoID(video)" allowfullscreen frameborder="0"></iframe>
            </template>
          </div>
        </div>
      </div>
      <form class="add-videos" @submit.prevent="handleSubmit">
        <input type="url" v-model.trim="input.url" placeholder="Plak hier de URL naar de YouTube video" required>
        <select v-model="input.selectedThema" required>
          <option disabled value="">Kies één thema</option>
          <option v-for="thema in themas" :key="thema">{{thema}}</option>
        </select>
        <input type="submit" value="Voeg toe" class="btn">
        <p v-if="submitted">De video is toegevoegd bij het juiste thema.</p>
      </form>
    </section>
  </div>
</template>

<script>
import firebase from "firebase"
import Header from "../components/Header.vue"

export default {
  data() {
    return {
      themas: ["Thema 1", "Thema 2", "Thema 3", "Thema 4"],
      input: {
        url: "",
        selectedThema: ""
      },
      submitted: false,
      videos: []
    }
  },
  methods: {
    handleSubmit() {
      // Upload to database
      firebase.database().ref("Videos").push(this.input)
        .then(() => this.getVideos());

      // Reset values
      this.input.url = "";
      this.input.selectedThema = "";
      this.submitted = true;
    },
    getVideoID(video) {
      const regex = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
      const match = video.url.match(regex);
      return (match && match[1].length == 11) ? match[1] : false;
    },
    getVideos() {
      this.$http.get("https://trainers-vlaanderen-51280-default-rtdb.firebaseio.com/Videos.json")
        .then(data => data.json())
        .then(data => {
          let videosArray = [];
          for (let key in data) {
            data[key].id = key;
            videosArray.push(data[key]);
          }
          this.videos = videosArray;
        });
    }
  },
  components: {
    Header
  },
  created() {
    document.title = "Trainers Vlaanderen | YouTube video's";
    this.getVideos();
  }
}

</script>

<style scoped>

#videos-page {
  min-height: 110vh;
}

h2 {
  margin-bottom: 2rem;
}

h3 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.thema {
  margin-bottom: 2rem;
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
  margin-bottom: 4rem;
}

@media screen and (max-width: 350px) {
  iframe {
    max-width: 250px;
  }
}

</style>