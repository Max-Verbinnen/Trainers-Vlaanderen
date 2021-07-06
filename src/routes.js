import Home from "./pages/Home.vue"
import AddTraining from "./pages/AddTraining.vue"
import Videos from "./pages/Videos.vue"
import Boards from "./pages/Boards.vue"
import SingleTraining from "./pages/SingleTraining.vue"

export default [
  {path: "/", component: Home},
  {path: "/toevoegen", component: AddTraining},
  {path: "/videos", component: Videos},
  {path: "/boards", component: Boards},
  {path: "/training/:id", component: SingleTraining}
]