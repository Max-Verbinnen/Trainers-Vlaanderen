export default [
  {path: "/", component: () => import("./pages/Home.vue")},
  {path: "/toevoegen", component: () => import("./pages/AddTraining.vue")},
  {path: "/videos", component: () => import("./pages/Videos.vue")},
  {path: "/boards", component: () => import("./pages/Boards.vue")},
  {path: "/training/:id", component: () => import("./pages/SingleTraining.vue")}
]