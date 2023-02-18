<template>
  <div class="container">
    <canvas ref="canvasRef" @mousemove="mapMove" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as PIXI from "pixi.js";
PIXI.settings.RENDER_OPTIONS.hello;

let displacementFilter;
const canvasRef = ref();
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
  img.width = canvasRef.value.offsetWidth;
  img.height = canvasRef.value.offsetHeight;
  img.position.y = (canvasRef.value.offsetHeight - img.height) / 2;
  depthMap.position.y = (canvasRef.value.offsetHeight - img.height) / 2;
  depthMap.width = img.width;
  depthMap.height = img.height;
  displacementFilter.scale.x = 0;
  displacementFilter.scale.y = 0;
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
  height: calc(100vh - 128px);
  overflow: hidden;
  canvas {
    width: calc(75vh - 96px);
    height: 100%;
  }
}
</style>
