<template>
  <div class="container">
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
let slimeAnimation;

class Ball {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.random() * 80 + 30; // 원의 크기
    this.x =
      this.radius * 2 + Math.random() * (this.effect.width - this.radius * 4);
    this.y = -this.radius;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.angle = 0;
    this.va = Math.random() * 0.1 - 0.05;
    this.range = Math.random() * 30;
    this.gravity = Math.random() * 0.003;
    this.vy = 0;
  }
  update(ballList) {
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

    if (this.y <= this.effect.height - this.radius / 2) {
      this.y += this.speedY;
    } else {
      ballList.forEach((ball) => {
        if (ball !== this) {
          const dx = this.x - ball.x;
          const dy = this.y - ball.y;
          const dist = Math.sqrt(dx ** 2 + dy ** 2);
          const minDist = this.radius / 2 + ball.radius / 2;
          if (dist < minDist) {
            this.speedY = this.radius * 0.1;
            this.x += this.speedY * Math.sign(dx);
            ball.x -= ball.speedY * Math.sign(dx);
          }
        }
      });
    }
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
    this.metaballsArray.forEach((metaball, index, arr) => metaball.update(arr));
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

function animate() {
  ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  effect.value.update();
  effect.value.draw(ctx.value);
  slimeAnimation = requestAnimationFrame(animate);
}

const onResize = () => {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
  effect.value = new MetaballsEffect(
    canvasRef.value.width,
    canvasRef.value.height
  );
  ctx.value.fillStyle = "DeepSkyBlue";
  effect.value.resize(canvasRef.value.width, canvasRef.value.height);
  effect.value.init(20);
};

onMounted(() => {
  ctx.value = canvasRef.value.getContext("2d");
  onResize();

  animate();

  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(slimeAnimation);
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: calc(var(--vh) * 100);
  background: rgb(255, 255, 255);
  overflow: hidden;
  canvas {
    background: rgb(255, 255, 255);
    filter: blur(20px) contrast(40);
  }
}
</style>
