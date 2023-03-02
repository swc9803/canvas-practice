<template>
  <div class="container">
    <img src="" alt="" />
    <canvas ref="canvasRef" />
    <svg>
      <defs>
        <filter id="blob" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -10"
          />
          <feBlend mode="normal" in="SourceGraphic" />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
let slimeAnimation;

class Ball {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.random() * 80 + 30;
    this.x = Math.random() * 0.9 + canvasRef.value.width / 2;
    this.y = -this.radius;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.angle = 0;
    this.va = Math.random() * 0.1 - 0.05;
    this.range = Math.random() * 30;
    this.gravity = Math.random() * 0.003;
    this.vy = 0;
    this.scale = 1;
  }
  update(ballList) {
    if (this.effect.height + this.radius < this.y) {
      this.radius = Math.random() * 80 + 30;
      this.y = -this.radius;
      this.vy = 0;
      this.speedY = Math.random() * 1 + 1;
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
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = this.radius / 2 + ball.radius / 2;
          if (dist < minDist) {
            this.speedY = this.radius * 0.1;
            this.x += this.speedY * 0.05 * Math.sign(dx);
            ball.x -= ball.speedY * 0.05 * Math.sign(dx);
          }
        }
      });
      this.scale = 0.5;
    }
  }
  draw(context) {
    context.beginPath();
    context.save();
    context.scale(1, this.scale);
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.restore();
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
    ctx.value.fillStyle = "#FFC107";
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
  overflow: hidden;
  img {
    position: absolute;
    background: url("~@/assets/test.jpg") no-repeat center/cover;
    bottom: 0;
    width: 100%;
    height: 30vh;
  }
  canvas {
    position: relative;
    opacity: 0.7;
    filter: url("#blob");
  }
  svg {
    position: absolute;
    width: 0;
    height: 0;
  }
}
</style>
