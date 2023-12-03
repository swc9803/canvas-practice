import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/_Home.vue";
import Tree from "../pages/Tree.vue";
import GetImgColor from "../pages/GetImgColor.vue";
import Input from "../pages/Input.vue";
import RainDrawImg from "../pages/RainDrawImg.vue";
import CanvasParticleText from "../pages/CanvasParticleText.vue";
import CanvasPhysicParticle from "../pages/CanvasPhysicParticle.vue";
import CanvasSlime from "../pages/CanvasSlime.vue";
import SvgWave from "../pages/SvgWave.vue";
import MovingStar from "../pages/MovingStar.vue";
import Collision from "../pages/Collision.vue";
import CanvasCursor from "../pages/CanvasCursor.vue";
import CanvasImgCell from "../pages/CanvasImgCell.vue";
import CanvasPattern from "../pages/CanvasPattern.vue";
import CanvasTrackEyes from "../pages/CanvasTrackEyes.vue";
import CanvasAudio from "../pages/CanvasAudio.vue";
import CanvasMatrix from "../pages/CanvasMatrix.vue";
import CanvasStar from "../pages/CanvasStar.vue";
import ScrollPlay from "../pages/ScrollPlay.vue";
import Textparticle from "../pages/TextParticle.vue";
import Link from "../pages/CanvasLink.vue";
import Liquid from "../pages/CanvasLinkLiquid.vue";
import Galaga from "../pages/Galaga.vue";
import IntroBlur from "../pages/IntroBlur.vue";
import Test from "../pages/Test.vue";

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
    path: "/pattern",
    name: "pattern",
    component: CanvasPattern,
  },
  {
    path: "/trackeyes",
    name: "trackeyes",
    component: CanvasTrackEyes,
  },
  {
    path: "/audio",
    name: "audio",
    component: CanvasAudio,
  },
  {
    path: "/matrix",
    name: "matrix",
    component: CanvasMatrix,
  },
  {
    path: "/star",
    name: "star",
    component: CanvasStar,
  },
  {
    path: "/scrollplay",
    name: "scrollplay",
    component: ScrollPlay,
  },
  {
    path: "/textparticle",
    name: "textparticle",
    component: Textparticle,
  },
  {
    path: "/link",
    name: "link",
    component: Link,
  },
  {
    path: "/liquid",
    name: "liquid",
    component: Liquid,
  },
  {
    path: "/galaga",
    name: "galaga",
    component: Galaga,
  },
  {
    path: "/intro",
    name: "intro",
    component: IntroBlur,
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
