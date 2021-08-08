<template>
  <div>
    <section id="boards">
      <h2>Lijst van de beste coaching boards</h2>
      <ol>
        <li>
          <h3>Tactics Manager 3.0</h3>
          <div class="content">
            <div class="explanation">
              <p class="exp">Tactics manager is online te verkrijgen via <a href="https://www.soccertutor.com/" target="_blank" rel="noopener">soccertutor.com</a>.
              43 veldtypes, 128 speleracties, 12 soorten pijlen, ballen, kegels, doelen, palen, horden, speedladders, speedringen en paspoppen. Mogelijkheid om alle objecten diverse kleuren te geven (heel brede selectie).
              De app biedt de mogelijkheid om trainingen uit te schrijven en de afbeeldingen direct op te slaan op jouw computer zelf. Een van de meest nuttige aspecten aan deze software, is dat de pijlen gecorrigeerd worden waardoor de oefeningen er overzichtelijker uitzien. 
              Grote prijs voor goede kwaliteit.
              </p>
              <p class="rating"><strong>Rating:</strong> 4.7/5 (270 reviews)</p>
              <p><strong>Prijs:</strong> 1x €70</p>
            </div>
            <div class="imgBx">
              <img src="../assets/img/board-one.png" alt="">
            </div>
          </div>
        </li>
        <li>
          <h3>Tactisch bord: voetbal</h3>
          <div class="content">
            <div class="explanation">
              <p class="exp">Zeer goede prijs-kwaliteit app. Deze software biedt een goedkope oplossing voor trainers die digitaal hun trainingen willen uitschrijven zonder er al te veel geld aan te besteden. 
              17 veldtypes, 110 spelers en keepershoudingen, geanimeerde oefeningen, 8 soorten pijlen (recht of hand getrokken, zonder correctie), ballen, kegels, doelen, palen, horden, speedladders, speedringen en paspoppen. Selectie uit 3 kleuren.
              </p>
              <p class="rating"><strong>Rating:</strong> 3.6/5 (5 reviews)</p>
              <p><strong>Prijs:</strong> 1x €9,99</p>
            </div>
            <div class="imgBx">
              <img src="../assets/img/board-two.png" alt="">
            </div>
          </div>
        </li>
        <li>
          <h3>3D Tactical Pad</h3>
          <div class="content">
            <div class="explanation">
              <p class="exp">De TacticalPad is een dynamische en innovatieve coaching-app. De voetbaltraining-app, TacticalPad, is een van de meest complete coaching-apps voor tactische analyse, tegenstanderstrategie, het maken van oefeningen, het plannen van sessies en het tekenen van nieuwe formaties. De 3D-visie van het programma creëert een verhoogd realiteitsgevoel en maakt het gebruik van de interface veel gemakkelijker. En natuurlijk mogen we de oefeningendatabase niet vergeten. (volgens ertheo.com)
              </p>
              <p><strong>Prijs:</strong>€53,04 per jaar</p>
            </div>
            <div class="imgBx">
              <img src="../assets/img/board-three.jpg" alt="">
            </div>
          </div>
        </li>
        <li>
          <h3>Powerpoint</h3>
          <div class="content">
            <div class="explanation">
              <p class="exp">Via powerpoint kan je eenvoudig trainingen uitschrijven. Perfecte, gratische oplossing voor startende trainers of coaches die niet bereid zijn om te investeren in een trainingssoftware. Download <a href="https://drive.google.com/file/d/1FYBuPRhxZsgO4HhEEsn8xY9MegyGQpzf/view?usp=sharing" target="_blank" rel="noopener">hier</a> een template.
              </p>
              <p><strong>Prijs:</strong>€0</p>
            </div>
            <div class="imgBx">
              <img src="../assets/img/board-four.png" alt="">
            </div>
          </div>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
// import axios from "axios"

export default {
  created() {
    document.title = "Trainers Vlaanderen | Coaching Boards";
  },
}

</script>

<style scoped>

h2 {
  margin-bottom: 2rem;
}

h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

a {
  color: black;
}

ol li {
  margin-bottom: 4rem;
}

.content {
  display: flex;
  flex-direction: row;
}

.content .explanation {
  max-width: 35rem;
  margin-right: 4rem;
}

.exp {
  margin-bottom: 1rem;
}

.imgBx img {
  width: 35rem;
}

@media screen and (max-width: 1100px) {
  .content {
    flex-direction: column;
  }

  .explanation {
    margin: 0 0 2rem 0;
  }

  ol li {
    margin-bottom: 2rem;
  }
}

@media screen and (max-width: 670px) {
  .imgBx img {
    width: 20rem;
  }
}

</style>