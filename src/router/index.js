import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/_Home.vue";
import Tree from "../pages/Tree.vue";
import GetImgColor from "../pages/GetImgColor.vue";
import Input from "../pages/Input.vue";
import RainDrawImg from "../pages/RainDrawImg.vue";
import Pinning from "../pages/Pinning.vue";
import CanvasParticleText from "../pages/CanvasParticleText.vue";
import CanvasPhysicParticle from "../pages/CanvasPhysicParticle.vue";
import CanvasSlime from "../pages/CanvasSlime.vue";
import ScrollSkew from "../pages/ScrollSkew.vue";
import Glitch from "../pages/Glitch.vue";
import SvgWave from "../pages/SvgWave.vue";
import MovingStar from "../pages/MovingStar.vue";
import Collision from "../pages/Collision.vue";
import DragRotation from "../pages/DragRotation.vue";
import SpotLight from "../pages/SpotLight.vue";
import ComparisonImg from "../pages/ComparisonImg.vue";
import CanvasCursor from "../pages/CanvasCursor.vue";
import CanvasPattern from "../pages/CanvasPattern.vue";
import CanvasTrackEyes from "../pages/CanvasTrackEyes.vue";
import CanvasAudio from "../pages/CanvasAudio.vue";
import CanvasGoku from "../pages/CanvasGoku.vue";
import CanvasMatrix from "../pages/CanvasMatrix.vue";
import CanvasStar from "../pages/CanvasStar.vue";
import Corner from "../pages/CornerFocus.vue";
import Spotlight from "../pages/SpotLight.vue";
import Doll from "../pages/WindUpDoll.vue";
import ScrollPlay from "../pages/ScrollPlay.vue";
import Textparticle from "../pages/TextParticle.vue";
import Perspective from "../pages/Perspective.vue";
import Slider from "../pages/Slider.vue";
import Link from "../pages/CanvasLink.vue";
import Liquid from "../pages/CanvasLinkLiquid.vue";
import Grid from "../pages/GridTest.vue";
import Galaga from "../pages/Galaga.vue";
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
    path: "/dragrotation",
    name: "dragrotation",
    component: DragRotation,
  },
  {
    path: "/spotlight",
    name: "spotlight",
    component: SpotLight,
  },
  {
    path: "/comparison",
    name: "comparison",
    component: ComparisonImg,
  },
  {
    path: "/cursor",
    name: "cursor",
    component: CanvasCursor,
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
    path: "/goku",
    name: "goku",
    component: CanvasGoku,
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
    path: "/corner",
    name: "corner",
    component: Corner,
  },
  {
    path: "/spotlight",
    name: "spotlight",
    component: Spotlight,
  },
  {
    path: "/doll",
    name: "doll",
    component: Doll,
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
    path: "/perspective",
    name: "perspective",
    component: Perspective,
  },
  {
    path: "/slider",
    name: "slider",
    component: Slider,
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
    path: "/grid",
    name: "grid",
    component: Grid,
  },
  {
    path: "/galaga",
    name: "galaga",
    component: Galaga,
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
