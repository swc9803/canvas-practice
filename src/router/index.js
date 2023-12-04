import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/_Home.vue";
import CanvasAudio from "../pages/CanvasAudio.vue";
import CanvasCursor from "../pages/CanvasCursor.vue";
import CanvasImgCell from "../pages/CanvasImgCell.vue";
import CanvasLink from "../pages/CanvasLink.vue";
import CanvasLiquid from "../pages/CanvasLinkLiquid.vue";
import CanvasMatrix from "../pages/CanvasMatrix.vue";
import CanvasParticleText from "../pages/CanvasParticleText.vue";
import CanvasPattern from "../pages/CanvasPattern.vue";
import CanvasPhysicParticle from "../pages/CanvasPhysicParticle.vue";
import CanvasSlime from "../pages/CanvasSlime.vue";
import CanvasStar from "../pages/CanvasStar.vue";
import CanvasTrackEyes from "../pages/CanvasTrackEyes.vue";
import Collision from "../pages/Collision.vue";
import Galaga from "../pages/Galaga.vue";
import GetImgColor from "../pages/GetImgColor.vue";
import Input from "../pages/Input.vue";
import IntroBlur from "../pages/IntroBlur.vue";
import MovingStar from "../pages/MovingStar.vue";
import RainDrawImg from "../pages/RainDrawImg.vue";
import ScrollPlay from "../pages/ScrollPlay.vue";
import SvgWave from "../pages/SvgWave.vue";
import Textparticle from "../pages/TextParticle.vue";
import Tree from "../pages/Tree.vue";

import Test from "../pages/Test.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/audio",
    name: "audio",
    component: CanvasAudio,
  },
  {
    path: "/cursor",
    name: "cursor",
    component: CanvasCursor,
  },
  {
    path: "/cell",
    name: "cell",
    component: CanvasImgCell,
  },
  {
    path: "/link",
    name: "link",
    component: CanvasLink,
  },
  {
    path: "/liquid",
    name: "liquid",
    component: CanvasLiquid,
  },
  {
    path: "/matrix",
    name: "matrix",
    component: CanvasMatrix,
  },
  {
    path: "/particletext",
    name: "particletext",
    component: CanvasParticleText,
  },
  {
    path: "/pattern",
    name: "pattern",
    component: CanvasPattern,
  },
  {
    path: "/physic",
    name: "physic",
    component: CanvasPhysicParticle,
  },
  {
    path: "/slime",
    name: "slime",
    component: CanvasSlime,
  },
  {
    path: "/star",
    name: "star",
    component: CanvasStar,
  },
  {
    path: "/trackeyes",
    name: "trackeyes",
    component: CanvasTrackEyes,
  },
  {
    path: "/collision",
    name: "collision",
    component: Collision,
  },
  {
    path: "/galaga",
    name: "galaga",
    component: Galaga,
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
    path: "/intro",
    name: "intro",
    component: IntroBlur,
  },
  {
    path: "/movingstar",
    name: "movingstar",
    component: MovingStar,
  },
  {
    path: "/raindraw",
    name: "raindraw",
    component: RainDrawImg,
  },
  {
    path: "/scrollplay",
    name: "scrollplay",
    component: ScrollPlay,
  },
  {
    path: "/svgwave",
    name: "svgwave",
    component: SvgWave,
  },
  {
    path: "/textparticle",
    name: "textparticle",
    component: Textparticle,
  },
  {
    path: "/tree",
    name: "tree",
    component: Tree,
  },
  {
    path: "/test",
    name: "test",
    component: Test,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
