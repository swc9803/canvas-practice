<template>
  <div class="container">
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as PIXI from "pixi.js";

PIXI.settings.RENDER_OPTIONS.helloDeprecated;

// let displacementFilter;
const canvasRef = ref();

const img = PIXI.Sprite.from("water.png");
const filterMap = PIXI.Sprite.from("filter.png");

const draw = (app) => {
  app.stage.addChild(img);

  // Make sure the sprite is wrapping.
  filterMap.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  const displacementFilter = new PIXI.filters.DisplacementFilter(filterMap);
  displacementFilter.padding = 10;
  filterMap.position = img.position;

  app.stage.addChild(filterMap);

  img.filters = [displacementFilter];

  displacementFilter.scale.x = 30;
  displacementFilter.scale.y = 60;

  app.ticker.add(() => {
    filterMap.x++;
    if (filterMap.x > filterMap.width) {
      filterMap.x = 0;
    }
  });

  onResize();
  window.addEventListener("resize", onResize);
};

function onResize() {
  if (canvasRef.value.offsetHeight * 4 < canvasRef.value.offsetWidth * 3) {
    // desktop
    img.width = canvasRef.value.offsetWidth;
    img.height = canvasRef.value.offsetWidth * (3 / 4);
    img.position.y = (canvasRef.value.offsetHeight - img.height) / 2;
    filterMap.position.y = (canvasRef.value.offsetHeight - img.height) / 2;
  } else {
    // mobile
    img.width = canvasRef.value.offsetHeight * (4 / 3);
    img.height = canvasRef.value.offsetHeight;
    img.position.x = (canvasRef.value.offsetWidth - img.width) / 2;
    filterMap.position.x = (canvasRef.value.offsetWidth - img.width) / 2;
  }
  filterMap.width = img.width;
  filterMap.height = img.height;
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
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
