<template>
  <div class="container">
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();

class Ball {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.random() * 80 + 30; // 원의 크기
    this.x =
      this.radius * 2 + Math.random() * (this.effect.width - this.radius * 4);
    this.y = -this.radius;
    this.speedX = Math.random() * 0.2 - 0.1;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.angle = 0;
    this.va = Math.random() * 0.1 - 0.05;
    this.range = Math.random() * 30;
    this.gravity = Math.random() * 0.005;
    this.vy = 0;
  }
  update() {
    if (this.x < this.radius || this.effect.width - this.radius < this.x) {
      this.speedX *= -1;
    }
    if (this.effect.height + this.radius < this.y) {
      this.radius = Math.random() * 80 + 30; // 원의 크기
      this.y = -this.radius;
      this.vy = 0;
      this.speedY = Math.random() * 1.5 + 0.5;
      this.x =
        this.radius * 2 + Math.random() * (this.effect.width - this.radius * 4);
    }
    if (this.y > this.radius * 2) {
      this.vy += this.gravity;
      this.speedY += this.vy;
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
  resize() {
    this.x = this.effect.width * 0.5;
    this.y = this.effect.height * 0.5;
  }
}

class MetaballsEffect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.metaballsArray = [];
  }
  init(numberOfBalls) {
    for (let i = 0; i < numberOfBalls; i++) {
      this.metaballsArray.push(new Ball(this));
    }
  }
  update() {
    this.metaballsArray.forEach((metaball) => metaball.update());
  }
  draw(context) {
    this.metaballsArray.forEach((metaball) => metaball.draw(context));
  }
  resize(newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
    this.metaballsArray.forEach((metaball) => metaball.resize());
  }
}

const ctx = ref();
const effect = ref();

const onResize = () => {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
  effect.value = new MetaballsEffect(
    canvasRef.value.width,
    canvasRef.value.height
  );
  ctx.value.fillStyle = "white";
  effect.value.resize(canvasRef.value.width, canvasRef.value.height);
  effect.value.init(20);
};

onMounted(() => {
  ctx.value = canvasRef.value.getContext("2d");
  onResize();

  function animate() {
    ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    effect.value.update();
    effect.value.draw(ctx.value);
    requestAnimationFrame(animate);
  }
  animate();

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
  background: black;
  overflow: hidden;
  canvas {
    background: black;
    filter: blur(20px) contrast(40);
  }
}
</style>
