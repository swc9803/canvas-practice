<template>
  <div class="container">
    <canvas ref="canvasRef" />
    <img ref="imgRef" src="/water.png" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
const imgRef = ref();
let ctx;
let effect;

class Cell {
  constructor(effect, x, y) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;
  }
  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 35;
    this.cellHeight = this.height / 55;
    this.cell = new Cell(this, 0, 0);
    this.imageGrid = [];
  }
  createGrid() {
    for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth) {
        this.imageGrid.push(new Cell(this, x, y));
      }
    }
  }
  renderer(context) {
    this.cell.draw(context);
  }
}

// const animate = () => {
//   // ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
//   requestAnimationFrame(animate);
// };

const onResize = () => {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
};

onMounted(() => {
  onResize();
  ctx = canvasRef.value.getContext("2d");
  // animate();

  effect = new Effect(canvasRef.value);
  effect.renderer(ctx);

  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  img {
    display: none;
  }
}
</style>
