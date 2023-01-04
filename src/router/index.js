import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Tree from "../pages/Tree.vue";
import CyberGallery from "../pages/CyberGallery.vue";
import GetImgColor from "../pages/GetImgColor.vue";
import Input from "../pages/Input.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/tree",
    name: "tree",
    component: Tree,
  },
  {
    path: "/cybergallery",
    name: "cybergallery",
    component: CyberGallery,
  },
  {
    path: "/imgcolor",
    name: "imgcolor",
    component: GetImgColor,
  },
  {
    path: "/input",
    name: "input",
    component: Input,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
