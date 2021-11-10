import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // Dynamic data
    user: null,
    trainings: null,

    // Static options
    themas: [
      { hoofd: "Techniek", sub: ["Frontaal", "Schuin-frontaal", "Zijwaarts", "Achterwaarts", "Aanname", "Handelingsnelheid", "Passing", "Leiden", "Dribbelen"] },
      { hoofd: "Speelwijze", sub: ["TT+ (TT- => TT+)", "TT- (TT+ => TT-)"] },
      { hoofd: "Fysiek", sub: ["Mobiliteit", "Stabiliteit", "Flexibiliteit"] },
      { hoofd: "Stilstaande fases", sub: ["Vrije trappen (B+, B-)", "Penalty's", "Corners (B+, B-)"] },
    ],
    onderdelen: [
      "Opwarming",
      "Techniekvorm",
      "Pasvorm",
      "Afwerkvorm",
      "Balbezitvorm / positiespel",
      "Wedstrijdvorm",
      "Spelvorm",
      "Cooling down",
      "Afgeleide wedstrijdvorm",
      "Keepertraining",
    ],
    basics: {
      plus: [
        { name: "B+", $isDisabled: true },
        { name: "Leiden en dribbelen" },
        { name: "Korte passing" },
        { name: "Controle op lage bal" },
        { name: "Doelpoging tot 10m (dichtbij)" },
        { name: "Doelpoging op lage voorzet" },
        { name: "Vrij en ingedraaid staan" },
        { name: "Vrijlopen: aanspeelbaar zijn door vrije ruimte te zoeken" },
        { name: "Inworp" },
        { name: "Halflange passing" },
        { name: "Controle op halfhoge" },
        { name: "Baldoelpoging vanop 15 à 20m (halfver)" },
        { name: "Doelpoging op halfhoge voorzet" },
        { name: "Vrijlopen om zelf anspeelbaar te zijn" },
        { name: "Steunen" },
        { name: "Corner + indirecte vrije trap" },
        { name: "Lange passing" },
        { name: "Controle op hoge bal" },
        { name: "Doelpoging vanaf 20m (ver)" },
        { name: "Doelpoging op hoge voorzet" },
        { name: "Vrijlopen om een medespeler aanspeelbaar te maken" },
        { name: "Vrijlopen door diep in de vrije ruimte te lopen (buitenspel omzeilen)" },
        { name: "Directe vrije trap" },
      ],
      minus: [
        { name: "B-", $isDisabled: true },
        { name: "Druk zetten, duel of remmend wijken" },
        { name: "Opstelling tussen tegenspeler en doel" },
        { name: "Korte dekking op korte pass" },
        { name: "Interceptie of afweren van korte pass" },
        { name: "Korte dekking op halflange pass" },
        { name: "Interceptie of afweren halflange pass" },
        { name: "Corner + indirecte vrije trap" },
        { name: "Speelhoeken afsluiten" },
        { name: "Korte dekking op lange pass" },
        { name: "Interceptie of afweren van lange pass" },
        { name: "Onderlinge dekking" },
        { name: "Directe vrije trap" },
      ],
    },
    tactics: {
      plus: [
        "1)	Openen: Breed",
        "2)	Openen: Diep",
        "3) Driehoekspel",
        "3a. Aanspeelbaarheid",
        "3b. Aanspeelbaarheid met aandacht wisselende voor spelsituaties.",
        "4)	Ruimte creëren voor zichzelf en het benutten ervan",
        "5)	Ruimte creëren voor een medespeler en het benutten ervan 06b.Efficiënte balcirculatie Progressie nastreven zonder risico op balverlies",
        "6)	Efficiënte balcirculatie",
        "6a. Progressie nastreven. Richting: ruit 1 => ruit 2: passing 1stegraad",
        "6b. Progressie nastreven zonder risico op balverlies",
        "7)	Efficiënte balcirculatie",
        "7a. Nauwkeurig doorspelen van de bal",
        "7b. Zo snel mogelijk nauwkeurig",
        "8)	Efficiënte balcirculatie: Een zo hoog mogelijke balsnelheid nastreven",
        "9)	Diagonale passing",
        "9a. Na aanspeelbaarheid",
        "9b. In & out passing naar de zwakke zone van de tegenpartij",
        "10) Een lijn overslaan bij passing diep (pass 2de gr)",
        "11) Efficiënte infiltratie met bal op het juiste moment: bij ruimte",
        "12) Efficiënte infiltratie zonder bal na een pass: Give & Go",
        "13) Efficiënte infiltratie zonder bal op het juiste moment: bij ruimte",
        "14) Infiltratie met bal: leiden of dribbelen: Challenge",
        "15) Een doelkans creëren via een individuele actie",
        "16) Een voorzet trappen",
        "16a over de grond die bruikbaar is vóór doel",
        "16b in de lucht die bruikbaar is voor doel",
        "17) Een subtiele eindpass in de diepte trappen naar een speler die in de rug van de laatste lijn duikt",
        "18) Efficiënte bezetting voor doel",
        "18a. door twee of drie spelers",
        "18b. bij voorzet: 1ste–2de paal, 11m&16m",
        "19) Strikte dekking ontvluchten: snel bewegen",
        "20) Diepte induiken maar opgelet off-side",
        "21) Zo snel mogelijk afwerken bij een werkelijke doelkans",
        "22) De aanvallers lopen zich vrij net vóór balrecuperatie (loshaken)",
        "23) Balrecuperatie: 1ste actie is diepte -gericht",
        "24) Diep blijven spelen",
        "25) Spelers in het blok: enkelen infiltreren (SPRINT)",
      ],
      minus: [
        "1)	Sluiten",
        "1a. Speelruimtes beperken",
        "1b. Speelruimtes beperken: Blok 35m -35m",
        "2)	Evenredige onderlinge afstanden",
        "3)	HOOG BLOK: aanv. & mids bevinden zich tussen de middenlijn en strafschopgebied van de tegenstander",
        "4)	Centrale verdediger dichtst bij het duel bepaalt off-sidelijn",
        "5)	Positieve pressing op de baldrager",
        "6)	Negatieve pressing op de baldrager",
        "7)	Dekking door dichtste medespeler",
        "8)	Geen kruisbeweging met naburige speler",
        "9)	Het schuiven en kantelen van het blok",
        "10) Een meeschuivende doelman (hoge positie)",
        "11) Het duel nooit verliezen: zich nooit laten uitschakelen",
        "12) Het duel proberen te winnen bij 100% zekerheid",
        "13) De bal recupereren door interceptie",
        "14) Collectieve W- pressing bij kans op balrecuperatie",
        "15) Zich niet laten uitschakelen door een individuele actie in de waarheidszone",
        "16) Een voorzet beletten",
        "17) Een subtiele eindpass in de diepte beletten: Centrum sluiten",
        "18) Efficiënte bezetting voor doel bij voorzet",
        "18a. defensieve T-vorm (2+1)",
        "18b. defensieve T-vorm (3+1)",
        "19) Kortere dekking in de waarheidszone: Split-Vision",
        "20) Geen systematische off-side door stap te zetten",
        "21) Doelpoging afblokken",
        "22) Een hoge compacte T-vorm:restverdediging van minstens 3 sp. + K",
        "23) Onmiddellijk na balverlies druk zetten en dieptepass verhinderen",
        "24) T-vorm: tegenaanval afremmen",
        "25) Niet T-vorm: zo snel mogelijk terug in het blok komen (SPRINT)",
      ],
    },

    // Interviews data
    interviews: [
      {
        id: 1,
        trainer: "Eddy Vanhemel",
        text: [
          {
            question: "Hoeveel trainingen is dat zo per week, OHL-beloften?",
            answer: "We trainen 6 keer per week, maar ik doe meer dan enkel en alleen de beloften trainen. Ik ben bij Oud-Heverlee Leuven Academy Head of Coaching, dus ik ben eigenlijk verantwoordelijk voor het sportieve plan 11v11. Daarbovenop doe ik de individuele begeleiding van de jeugdtrainers.",
          },
          {
            question: "Dat is vrij veel. Ik las online dat u ook nog docent bent (of bent geweest) bij Voetbal Vlaanderen.",
            answer: "Ik ben nog altijd docent bij Voetbal Vlaanderen. Ik geef daar de UEFA A cursus bij het reguliere traject, waarbij ik de mensen uit de ‘gewone’ voetbal het UEFA A verhaal probeer uit te leggen. Ik geef ook het UEFA A traject aan de ex-prof, binnen een apart circuit dat alleen maar toegankelijk is voor mensen die in het profvoetbal actief zijn geweest.",
          },
          {
            question: "U bent zelf nog jeugdvoetballer geweest voordat u trainer bent geworden?",
            answer: "Uiteraard! Zoals iedereen begin je als liefhebber van het spelletje in een jeugdacademie. Ik ben op vrij jonge leeftijd begonnen, laat ons zeggen toen ik 7 of 8 jaar oud was. Dan begin je natuurlijk in de club van het dorp, in mijn geval was dat Bree. Zo probeer je dan dromen waar te maken – als kind droom je vooral van profvoetballer te worden – maar goed, hoe verder je in dat opleidingstraject bent, hoe meer je die stap naar een eerste ploeg gaat willen zetten om dan in hogere competities te kunnen landen.",
          },
          {
            question: "Waar ergens hebt u de klik gemaakt om trainer te willen worden? Hoe is dat gebeurd?",
            answer: "Ik ben eigenlijk altijd gefascineerd geweest door het spel, alsook door wat trainers deden. Tijdens mijn speler carrière heb ik me altijd al de vraag gesteld ‘Waarom doen trainers dit?’. Ik was bezig met de keuzes van de trainers te begrijpen. \n Dan komt er op een bepaald moment die stap in je carrière waar je moet stoppen met voetballen, leeftijd zit dan in de weg en je gaat gaan kijken hoe je actief kan blijven binnen de voetbal. \n Alleen ben ik toch omgekeerd begonnen. Ik ben gestart bij het seniorenvoetbal bij Bochelt (een derdeklasser). Ik ben daar assistent-trainer geworden om daarna te promoveren tot hoofdtrainer. Ik heb het trainer zijn altijd gecombineerd met zelf te werken. Maar na verlang van tijd begon die combinatie wel te wegen. Toen had ik het idee van een sabbatjaar in te lassen, enerzijds om mezelf te herbronnen als trainer maar ook door die combinatie die de jaren ervoor wel wat gewogen heeft op mezelf. \n Vrij snel nadat ik die keuze gemaakt had werd ik gecontacteerd door KRC Genk. Wij zijn gaan zitten en wij zijn gaan praten. Ik ben daar wat verkennende gesprekken gaan voeren. Zij hebben me daar kunnen overtuigen om die academie in te stappen.",
          },
          {
            question: "U hebt aan veel leeftijdscategorieën training gegeven (U17,U21,TVJO functies, Head of Coaching, eerste ploegen, postformatie). Is er eentje waar u bepaald graag training aan geeft? Zijn dat dan de beloften?",
            answer: "De categorie waar ik het liefste training geeft is inderdaad (lacht) de U21 of de beloften, omdat je daar op de drempel zit met jongens klaar te maken, te confronteren met de stap die zij willen zetten om profvoetballer te worden. Dat is de omgeving die mij de meeste energie geeft en die mij ook voldoening geeft. Hier heb ik me in de laatste jaren echt in verdiept.",
          },
          {
            quote: "Trainer zijn is eerst en voor al met die spelers op ontdekkingstocht gaan van ‘Wat is het potentieel nu voor die gasten?’. Dan kunnen we met die jongens gaan zitten en zien hoe we dat potentieel kunnen gaan bereiken, zien wat daarvoor nodig is.",
          },
          {
            question: "Wat vindt u dan het fijnste aan trainer zijn zelf? Is dat dan die energie die u terugkrijgt of de voldoening van jeugd te zien doorstromen naar de A kern?",
            answer: "D’r zijn verschillende dingen die mij energie geven. Trainer zijn is eerst en voor al met die spelers op ontdekkingstocht gaan van ‘Wat is het potentieel nu voor die gasten?’. Dan kunnen we met die jongens gaan zitten en zien hoe we dat potentieel kunnen gaan bereiken, zien wat daarvoor nodig is. Hoe gaan wij dat als ploeg aanpakken en hoe gaan zij dat als speler zelf aanpakken? Door gerichte vraagstelling kunnen we die jongens op een gericht pad krijgen en op die manier kunnen we een actieplan uitwerken en daarmee aan de slag gaan. Dat is wat mij energie geeft aan het trainer zijn.",
          },
          {
            question: "Stel dat u nu een speler hebt met zo’n groot potentieel, maar waar de vooruitgang stelpt. Hoe gaat u dit als trainer/coach aanpakken?",
            answer: "Elke speler is anders. Ik denk dat je heel veel met die spelers moet gaan praten, heel veel naar die jongens moet gaan luisteren. Zo kunnen wij erachter komen hoe ze zich voelen, waarom ze zich zo voelen, wat daartoe leidt (omgeving, situatie, concurrentie, mentaal aspect, fysiek aspect). Soms moet je ook gaan kijken naar de spelers die wel goed staan maar die eigenlijk niet ambitieus genoeg zijn en die gemakzucht verkiezen. Maak daar de spelers ook bewust van zodat ook zij volledig in het verhaal meekunnen. ",
          },
          {
            question: "U hebt doorheen uw jaren van alle functies bekleed. Hoe werd u begeleid als coach? Zocht u die begeleiding op als coach?",
            answer: "Ja, ik heb een aantal maanden geleden nog een workshop gegeven voor de Vlaamse Trainerschool (VTS), waarbij de topic ‘Wie coacht de coach?’ was. Ik vind het heel belangrijk dat je ook als coach voor jezelf op zoek gaat naar klemborden waar je jezelf in kunt ontwikkelen. Ik doe dit vanuit verschillende invalshoeken. Ik heb dat in het begin gedaan door contact op te nemen met de trainers waarvan ik zelf training heb gekregen, omdat ik daar als speler al mee geconfronteerd was. Zij kennen jou en jij kent hun aanpak. \n Wat ik ook heel erg belangrijk vind is je laten beïnvloeden door jouw collega trainers. Ik luister graag naar de stem van de specialisten (physical coach, techniektrainers, etc.). Ook vind ik het belangrijk om nu en dan contact op te nemen met trainers waarmee ik een goede band heb, die misschien actief zijn in een ander land met andere culturen en invalshoeken. Daar kan je soms trends van overnemen of specifieke aandachtspunten. \n Je kan ook leren van mensen uit het bedrijfsleven. Voetbal – of het trainer zijn – beperkt zich niet alleen tot het trainer zijn. Ik denk dat je heel veel dingen vanuit het bedrijfsleven kan overpakken. Denk maar aan coaching, aan leiderschap... ik probeer echt vanuit zoveel mogelijk invalshoeken informatie te krijgen en dingen daaruit op te pikken.",
          },
          {
            quote: "Als je tegenwoordig op het hoogste niveau wil trainer zijn, moet je eerst en vooral jezelf heel goed leren kennen.",
          },
          {
            question: "Welke concrete tips kunt u meegeven aan gedreven trainers die gebrand staan om bij te leren?",
            answer: "Als je tegenwoordig op het hoogste niveau wil trainer zijn, moet je eerst en vooral jezelf heel goed leren kennen. Stop daar dan ook heel veel tijd in. Weet wie jij bent, waarvoor je staat, hoe je in bepaalde situaties bent of reageert. Weet ook hoe anderen naar jou kijken en weet waarom anderen zo kijken naar jou. \n Dit is cruciaal om beter te connecteren met mensen. Als je coach wil zijn zal jij daarin een specialist moeten worden.  Zo kan je jouw spelers te beïnvloeden, motiveren, inspireren, enthousiasmeren maar af en toe ook eens op de vingers te tikken om ze bij de les te houden, figuurlijk dan (lacht). \n Als je al die dingen weet kan je beginnen met je sporttechnische vaardigheden te laten ontwikkelen.",
          },
          {
            question: "U hebt UEFA Pro gehaald. Waarin lagen – binnen de cursussen – uw grootse leermomenten?",
            answer: "Ik denk dat je, ook buiten de cursus, meer dan 1 bepaald leermoment gaat kennen. Ik heb het meeste geleerd uit mensen – coaches, spelers, ouders – die mij aan het denken hebben gezet. Je pakt die zaken mee en gaat die vertalen naar jouw eigen filosofie.",
          },
          {
            quote: "Je moet niet altijd op zoek gaan naar nieuwe dingen. Een vorm kan door een aantal accentverschuivingen helemaal anders worden. Of door dezelfde accenten te pakken, daar kan je de vooruitgang van spelers echt zien.",
          },
          {
            question: "Nu een laatste vraag, eentje die al vaker moeilijk is voor een trainer. Hebt u een vorm die u graag geeft, waarbij u denkt dat de spelers veel vooruitgang boeken? Of dat u daar als trainer veel energie uit haalt?",
            answer: "Ja. Ik ben een trainer die heel veel energie haalt uit positiespelen. Niet eentje specifiek, maar ik val vaak terug op positiespelen binnen mijn trainingen omdat je daar binnen 1 vorm enorm kunt variëren, en toch heel veel kunt gaan herhalen. Je moet niet altijd op zoek gaan naar nieuwe dingen. Een vorm kan door een aantal accentverschuivingen helemaal anders worden. Of door dezelfde accenten te pakken, daar kan je de vooruitgang van spelers echt zien.",
          },
          {
            question: "Dan denk ik dat ik rond ben met mijn vragen. Ik wil u bedanken voor dit leerrijk interview en wens u nog veel succes met uw competitie met de beloften.",
            answer: "",
          },
        ]
      },
      {
        id: 2,
        trainer: "Werner Martens",
        text: [
          {
            question: "Werner, jij bent nu actief als trainer in het buitenland. Waar is dat en welke functie bekleed je?",
            answer: "Ik ben daar als assistent coach, en mijn rol is vooral het fitness-gedeelte. Ik ben verantwoordelijk voor het gym werk, de opwarming, planning, periodisering, blessure preventief werk. Dat is ook wat ik uitgeoefend heb met de meeste professionele clubs.",
          },
          {
            image: "02_WernerMartens_0.jpg",
          },
          {
            question: "Je bent in het verleden ook nog trainer geweest bij Beerschot en Lokeren?",
            answer: "Ja klopt. Vorig jaar zat ik in Slovakije. Daarvoor Lokeren en Beerschot. Daarvoor, even nadenken (lacht)… Willem II. En ik heb ook nog in Saudi-Arabië, Waasland-Beveren en Lommel gezeten. ",
          },
          {
            quote: "Je kunt geen plannen maken! Natuurlijk is het ideaal plaatje dat je dicht bij huis werkt en dat je daar vijftien jaar kan blijven werken. Maar met het hedendaags voetbal wordt het moeilijker om jouw job te behouden onder een kijktoren."
          },
          {
            question: "Is er een bepaalde gedachtegang achter het van land naar land trekken? Wil je van elke cultuurzaken meenemen?",
            answer: "Ja het is eigenlijk wat op mijn pad komt (lacht), ik heb altijd al gedroomd om in het profvoetbal terecht te komen maar ik had het niet zo verwacht. Om daar te komen moet je ten eerste heel hard werken aan jezelf en aan kennis te vergaren. Je moet natuurlijk ook het geluk hebben – dat ik gehad heb – om door een proftrainer naar een eerste elftal geroepen te worden. Daarvan is voor mij alles gegroeid. Ik ben met die trainer, Stijn Vreven, meegegaan naar verschillende clubs. Op een bepaald moment scheiden onze wegen en kon ik naar een andere ploeg terecht. Je kunt geen plannen maken! Natuurlijk is het ideaal plaatje dat je dicht bij huis werkt en dat je daar vijftien jaar kan blijven werken. Maar met het hedendaags voetbal wordt het moeilijker om jouw job te behouden onder een kijktoren. \n Je beperkt jouw job als je alleen maar naar België en Nederland kijkt, en dus moet je open staan voor andere ervaringen. Naar de andere kant van de wereld trekken verrijkt je wel als mens. Zo’n andere culturen leren kennen is wel leuk.",
          },
          {
            question: "Maar je moet er natuurlijk ook opofferingen voor doen.",
            answer: "Absoluut, ik heb een zoontje van drie jaar, een vriendin, die moet je dan wel achterlaten. \n Ik vergelijk het dan wel zo want mensen vragen dan wel eens ‘Dat moet toch niet simpel zijn, jouw gezin zo achterlaten?’. Tja, ik verdien er geld mee en mensen die in het leger zitten die op missie moeten gaan die moeten ook opofferingen doen en die zijn veel groter dan diegene die ik moet doen. Dus op dat vlak kan ik het wel relativeren.",
          },
          {
            quote: "Ze waren op zoek naar jeugdspelers die aan de slag wouden gaan bij de jongste leeftijden. En ik dacht bij mijn eigen ‘dat is misschien wel iets voor mij, misschien doe ik dat wel graag’."
          },
          {
            question: "Als we nu terug zouden gaan naar het begin, waar alles begonnen is. Wanneer heb jij die schakel gemaakt tussen (jeugd)speler en trainer? ",
            answer: "Ik heb altijd gevoetbald in mijn eigen dorp; Leopoldsburg. Daar heb ik mijn hele jeugdopleiding doorlopen. Op een bepaald moment – terwijl ik toen bij de juniors voetbalde (da’s al een tijdje geleden, lacht.) – was ik zeventien jaar en kwam de jeugdcoördinator de kleedkamer binnen en gaf hij aan dat ze een tekort hadden aan jeugdtrainers. Ze waren op zoek naar jeugdspelers die aan de slag wouden gaan bij de jongste leeftijden. En ik dacht bij mijn eigen ‘dat is misschien wel iets voor mij, misschien doe ik dat wel graag’. Dan ben ik als 17-jarige begonnen met U6 te trainen, daarna U7, U8. Elk jaar ging ik een of twee jaar hoger. Ik vond elke leeftijd leuk, maar elke keer dat ik een oudere categorie had vond ik het leuker. Toen ik 22 was deed ik de U14, had ik bijna alles gedaan. Ik ben dan begonnen met mijn getuigschrift C, en heb dan alle diploma’s tot en met UEFA A achter elkaar gedaan. Op mijn 26 had ik UEFA A, dan heb ik nog een half jaar elite jeugd gedaan. Ik ben in die periode ook van club veranderd (naar Lommel United). Daar heb ik een 5-tal jaar in de jeugdopleiding gedaan. Ik ben dan bij de beloften terecht gekomen. \n Daar heb ik dan ook een klik gemaakt. Ik had vroeger als ambitie om ergens hoofdtrainer te worden, in derde of vierde klasse. Maar toen ik bij de beloften van Lommel kennis begon te krijgen van professioneel voetbal, van de omkadering van een eerste elftal, daar heb ik ervaren dat hoofdtrainer bij een eerste ploeg niet paste met mijn persoonlijkheid en hoe ik als trainer gevormd was. Ik had als hoofdtrainer niet het beste uit mezelf gehaald. \n Ik ben mezelf dan gaan herontdekken en heb mezelf de vraag gesteld ‘Waar liggen mijn kwaliteiten?’ \n Toen ik me ben gaan verdiepen begon ik overal te lezen dat proftrainers altijd ex-profs waren, assistent-trainers ook, keepertrainers ook… Alleen physical coaches kwamen meestal van universiteiten. Op dat moment was ik 28, en zat universiteit studeren er bij mij niet meer in. Ik deed een job, ik was postbode. Ik ben me gaan bijscholen. Ik heb veel boeken gelezen, cursussen gevolgd, met experts samengezeten. \n Uiteindelijk heb ik bij Lommel mijn kans gekregen. Zo ben ik van mijn hobby mijn beroep kunnen maken. Daar ben ik tot vandaag nog altijd dankbaar over.",
          },
          {
            question: "Hoe schop je het tot dat professioneel niveau?",
            answer: "Blijf zoveel mogelijk kennis opdoen. Ervaring ga je wel krijgen, maar dus vooral veer kennis vergaren. Altijd jouw ogen openhouden. Volg webinars, benader ze kritisch. Spar met jouw collega’s. Blijf opleidingen doen. Als het kan, spreek dan ook zeker 1 op 1 met mensen.",
          },
          {
            image: "02_WernerMartens_1.jpg",
          },
          {
            question: "Doorheen jouw jaren heb je bijna elke leeftijd gecoacht. Je hebt ook aangegeven dat je altijd de oudere leeftijden begon te appreciëren. Heb je zo’n leeftijdscategorie die je wel erg graag hebt?",
            answer: "Ik deed heel graag die jongste leeftijden, maar ik had oudere leeftijden steeds weer liever, omdat daar altijd wel nieuwe zaken aan te pas komen. U10-U12 brengen jou enorm veel energie en die mannetjes zijn super leergierig. Volwassen voetbal ga ik altijd het leukste blijven vinden. Ik haal energie uit het moeten presteren. Als je niet wint ben je je job kwijt, dat is heel anders dan jeugdvoetbal. \n Wat wel mijn ogen heeft geopend, is als je al jaren elite gedaan hebt en denkt dat alles vanzelf begint te gaan, om nog eens een gewestelijke ploeg te doen. Dan moest je echt terug bij de basics komen. Dat was heerlijk.",
          },
          {
            question: "De ploeg waar je nu actief bent speelt op het hoogste niveau. Wat moeten we daarvan verwachten?",
            answer: "Zij hebben hier sinds 2014 de Indian Super League opgericht. Dat is via sponsorship gegaan, om India op de kaart te zetten. In het begin kwamen een aantal ex-profs hier nog voetballen zoals Thierry Henry, Alessandro Del Piero, etc. met de bedoeling om tv-inkomsten te genereren. De sterren zijn ondertussen wat minder geworden. \n Een groot verschil met Europese landen is dat ze hier geen jeugdopleiding hebben. Dit land is qua potentieel enorm (1,4 miljard inwoners) maar hier staat niets recht qua opleidingen. Wij gaan binnen ons club nu een tweede ploeg inrichten met jonge gasten die mogen komen testen. De spelers die hier komen missen wel een bepaald deel, waar we dan wel veel vooruitgang mee kunnen boeken.",
          },
          {
            question: "Hoe worden jullie ploegen dan gevuld met spelers?",
            answer: "Ze hebben, omdat dit land hier zo groot is, state leagues. Spelers worden dan rond de 14-jarige leeftijd gescout. Dan mogen ze in een 3de niveau reeks gaan spelen. Als ze goed genoeg zijn mogen ze naar het 2de niveau, waarna ze in de Indian Super League kunnen terechtkomen.",
          },
          {
            question: "Hoe hoger je terechtkomt als trainer, hoe hoger de druk op jou ligt. Hoe ga je daar als trainer mee om?",
            answer: "Ik heb dat leren relativeren. Het enige dat je kan doen is elke dag in de spiegel kijken en kunnen zeggen dat je er alles aan hebt gedaan om het beste uit jezelf te krijgen. Ik probeer heel veel verantwoordelijkheid te nemen. Ik probeer mezelf up-to-date te houden door alle mogelijke trends te volgen.",
          },
          {
            quote: "Het mooiste is en blijft een overwinning, en de adrenaline die erbij komt.",
          },
          {
            question: "Maar je haalt er wel steeds enorm veel plezier uit. Waar haal je als physical coach het meeste plezier uit?",
            answer: "Wij proberen als technische staf gemeenschappelijke doelen na te streven. Ik geniet van spelers fitter te maken, maar vooral ook het menselijk aspect. Voor mij staat de mens op numero 1. Mijn rol als physical coach is dan ook anders dan de hoofdtrainer en is mijn omgang met spelers dus ook anders. Een goede band hebben vind ik dus heel fijn, en vooral ook om ze beter te maken. Het mooiste is en blijft een overwinning, en de adrenaline die erbij komt kijken.",
          },
          {
            quote: "Ga op café met vrienden en teken vormen uit op bierkaartjes. Ik heb bierkaartjes vol getekend met vrienden die jeugdcoach zijn. Daar word je ook beter van.",
          },
          {
            question: "Je bent zelf nog docent geweest bij Voetbal Vlaanderen. Welke tips geef je aan jouw trainers mee om te groeien?",
            answer: "Sparren met collega’s. Een leuke is ook om jouw horizon te verbreden. Ga ook eens in het buiteland kijken, ga eens kijken naar Anderlecht, naar Genk. Kijk daar met een open vizier naar. \n Stel dat je nu naar een training kijkt en je vindt een vorm heel raar, vraag dan eerst naar het idee achter de vorm. Dan pas kan je beslissen of je die vorm zelf zou aanpassen of helemaal niet geven. Ik zal nooit zeggen ‘Dat is een slechte oefening’. Je moet eerst weten wat de filosofie erachter is. \n Als jeugdtrainer – en daarom vind ik jullie site ook interessant – was ik heel fel op zoek naar oefenstof. Zodat die rugzak gevuld kan worden, waarna je zelf vormen kan gaan ontwikkelen. \n Ga op café met vrienden en teken vormen uit op bierkaartjes (lacht). Ik heb bierkaartjes vol getekend met vrienden die jeugdcoach zijn. Daar word je ook beter van. \n Van op bierkaartjes vormen te tekenen tot 1 op 1 met experts te spreken, alles helpt jou. Stop nooit zelf met leren.",
          },
          {
            question: "Wat neem je mee van jouw ervaring om verschillende culturen te leren kennen waar je training in gegeven hebt?",
            answer: "Als coach heb ik geleerd dat je eerst helemaal in de cultuur moet zitten en moet snappen wat zij willen bereiken, voordat je daar jouw eigen ding in gaat doen.",
          },
          {
            question: "Dan heb ik zo’n beetje al mijn vragen gesteld. Ik wil jou bedanken voor het interview. Hopelijk kruisen onze wegen nog eens!",
            answer: "",
          },
        ]
      },
    ],
  },
  mutations: {
    setUser(state, userObj) {
      state.user = userObj;
    },
    setTrainings(state, trainings) {
      state.trainings = trainings;
    }
  },
});