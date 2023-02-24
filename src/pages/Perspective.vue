<template>
  <div class="container">
    <canvas ref="canvasRef" @mousemove="onMouseMove" @touchmove="onTouchMove" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as PIXI from "pixi.js";
PIXI.settings.RENDER_OPTIONS.hello;

let app;
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

const onMouseMove = (e) => {
  displacementFilter.scale.x =
    (canvasRef.value.offsetWidth / 2 -
      (e.pageX - (window.innerWidth - img.width) / 2)) /
    100;
  displacementFilter.scale.y =
    (canvasRef.value.offsetHeight / 2 - (e.pageY - 64)) / 100;
};

const onTouchMove = (e) => {
  displacementFilter.scale.x =
    (canvasRef.value.offsetWidth / 2 -
      (e.touches[0].pageX - (window.innerWidth - img.width) / 2)) /
    70;
  displacementFilter.scale.y =
    (canvasRef.value.offsetHeight / 2 - e.touches[0].pageY) / 70;
  e.preventDefault();
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
  app = new PIXI.Application({
    width: canvasRef.value.offsetWidth,
    height: canvasRef.value.offsetHeight,
    view: canvasRef.value,
    antialias: true,
    backgroundAlpha: true,
    resizeTo: canvasRef.value,
  });
  draw(app);
});

onBeforeUnmount(() => {
  app.stage.filters = null;
  displacementFilter.destroy();
  depthMap.destroy();
  img.destroy();
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 128px);
  overflow: hidden;
  canvas {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: calc(75vh - 96px);
    height: 100%;
  }
}
</style>
