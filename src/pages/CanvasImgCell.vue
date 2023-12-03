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
  constructor(effect, x, y, index) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.index = index;
    this.positionX = this.effect.width * 0.5;
    this.positionY = this.effect.height;
    this.speedX;
    this.speedY;
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;
    this.image = imgRef.value;
    this.slideX = 0;
    this.slideY = 0;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.02;
    this.friction = 0.8;
    this.randomize = Math.random() * 50 + 2;
    setTimeout(() => {
      this.start();
    }, this.index * 4);
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.x + this.slideX,
      this.y + this.slideY,
      this.width,
      this.height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  }
  start() {
    this.speedX = (this.x - this.positionX) / this.randomize;
    this.speedY = (this.y - this.positionY) / this.randomize;
  }
  update() {
    // cell position
    if (Math.abs(this.speedX) > 0.01 || Math.abs(this.speedY) > 0.01) {
      this.speedX = (this.x - this.positionX) / this.randomize;
      this.speedY = (this.y - this.positionY) / this.randomize;
      this.positionX += this.speedX;
      this.positionY += this.speedY;
    }

    const dx = this.effect.mouse.x - this.x;
    const dy = this.effect.mouse.y - this.y;
    const distance = Math.hypot(dx, dy);
    if (distance < this.effect.mouse.radius) {
      const angle = Math.atan2(dy, dx);
      const force = distance / this.effect.mouse.radius;
      this.vx = force * Math.sin(angle);
      this.vy = force * Math.cos(angle);
    }
    this.slideX += this.vx *= this.friction - this.slideX * this.ease;
    this.slideY += this.vy *= this.friction - this.slideY * this.ease;
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 40;
    this.cellHeight = this.height / 22;
    this.imageGrid = [];
    this.createGrid();
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 100,
    };
    this.canvas.addEventListener("mousemove", (e) => {
      this.mouse.x = e.pageX;
      this.mouse.y = e.pageY;
    });
    this.canvas.addEventListener("mouseleave", () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
  }
  createGrid() {
    let index = 0;
    for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth) {
        index++;
        this.imageGrid.unshift(new Cell(this, x, y, index));
      }
    }
  }
  renderer(context) {
    this.imageGrid.forEach((cell) => {
      cell.update();
      cell.draw(context);
    });
  }
}

const animate = () => {
  if (effect) {
    effect.renderer(ctx);
  }
  requestAnimationFrame(animate);
};

const onResize = () => {
  canvasRef.value.width = 500;
  canvasRef.value.height = 600;
};

onMounted(() => {
  onResize();
  ctx = canvasRef.value.getContext("2d");
  animate();

  imgRef.value.onload = () => {
    effect = new Effect(canvasRef.value, imgRef.value);
  };

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
