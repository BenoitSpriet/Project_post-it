import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Create from "@/views/Create";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/notes/:id",
    name: "NoteDetail",
    component: () => import("@/views/NoteDetail"),
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
