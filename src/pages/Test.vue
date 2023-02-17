<template>
  <div class="container">
    <canvas ref="canvasRef" @mousemove="mapMove" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as PIXI from "pixi.js";
PIXI.utils.skipHello();
let displacementFilter;
const canvasRef = ref();
// const img = new PIXI.Sprite.from("/train.jpg");
// const depthMap = new PIXI.Sprite.from("/train-map.png");
const img = PIXI.Sprite.from(require("@/assets/origin.png"));
const depthMap = PIXI.Sprite.from(require("@/assets/depthMap.png"));
const draw = (app) => {
  app.stage.addChild(img);
  app.stage.addChild(depthMap);
  displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
  app.stage.filters = [displacementFilter];
  onResize();
  window.addEventListener("resize", onResize);
};
const mapMove = (e) => {
  displacementFilter.scale.x =
    (canvasRef.value.offsetWidth / 2 - e.clientX) / 70;
  displacementFilter.scale.y =
    (canvasRef.value.offsetHeight / 2 - e.clientY) / 70;
};
function onResize() {
  img.width = canvasRef.value.offsetWidth / 2;
  img.height = canvasRef.value.offsetWidth * (3 / 4);
  img.position.y = (canvasRef.value.offsetHeight - img.height) / 2;
  depthMap.position.y = (canvasRef.value.offsetHeight - img.height) / 2;

  depthMap.width = img.width;
  depthMap.height = img.height;
}
onMounted(() => {
  const app = new PIXI.Application({
    width: canvasRef.value.offsetWidth,
    height: canvasRef.value.offsetHeight,
    view: canvasRef.value,
    antialias: true,
    backgroundAlpha: true,
    resizeTo: canvasRef.value,
  });
  draw(app);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
