import Home from "./pages/Home.vue"

export default [
  { path: "/", component: Home },
  { path: "/toevoegen", component: () => import("./pages/AddTraining.vue") },
  { path: "/videos", component: () => import("./pages/Videos.vue") },
  { path: "/boards", component: () => import("./pages/Boards.vue") },
  { path: "/account", component: () => import("./pages/Account.vue") },
  { path: "/training/:id", component: () => import("./pages/SingleTraining.vue") },

  // Hidden from nav bar
  { path: "/algemene-voorwaarden", component: () => import("./pages/hidden/TermsOfService.vue")},
  { path: "/privacy-policy", component: () => import("./pages/hidden/PrivacyPolicy.vue")},
]