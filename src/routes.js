import Home from "./pages/Home.vue"
import Videos from "./pages/Videos.vue"
import AddTraining from "./pages/AddTraining.vue"
import SingleTraining from "./pages/SingleTraining.vue"

export default [
  {path: "/", component: Home},
  {path: "/videos", component: Videos},
  {path: "/toevoegen", component: AddTraining},
  {path: "/training/:id", component: SingleTraining}
]