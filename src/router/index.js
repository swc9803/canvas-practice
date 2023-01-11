import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/_Home.vue";
import Tree from "../pages/Tree.vue";
import GetImgColor from "../pages/GetImgColor.vue";
import Input from "../pages/Input.vue";
import RainDrawImg from "../pages/RainDrawImg.vue";
import Pinning from "../pages/Pinning.vue";
import CanvasParticleText from "../pages/CanvasParticleText.vue";
import CanvasSlime from "../pages/CanvasSlime.vue";
import ScrollSkew from "../pages/ScrollSkew.vue";
import Glitch from "../pages/Glitch.vue";
import SvgWave from "../pages/SvgWave.vue";
import MovingStar from "../pages/MovingStar.vue";
import Collision from "../pages/Collision.vue";
import DragImg from "../pages/DragImg.vue";

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
    path: "/imgcolor",
    name: "imgcolor",
    component: GetImgColor,
  },
  {
    path: "/input",
    name: "input",
    component: Input,
  },
  {
    path: "/pinning",
    name: "pinning",
    component: Pinning,
  },
  {
    path: "/raindraw",
    name: "raindraw",
    component: RainDrawImg,
  },
  {
    path: "/particletext",
    name: "particletext",
    component: CanvasParticleText,
  },
  {
    path: "/slime",
    name: "slime",
    component: CanvasSlime,
  },
  {
    path: "/scrollskew",
    name: "scrollskew",
    component: ScrollSkew,
  },
  {
    path: "/glitch",
    name: "glitch",
    component: Glitch,
  },
  {
    path: "/svgwave",
    name: "svgwave",
    component: SvgWave,
  },
  {
    path: "/movingstar",
    name: "movingstar",
    component: MovingStar,
  },
  {
    path: "/collision",
    name: "collision",
    component: Collision,
  },
  {
    path: "/dragimg",
    name: "dragimg",
    component: DragImg,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
