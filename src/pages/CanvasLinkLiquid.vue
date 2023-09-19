<template>
  <div class="container">
    <canvas
      ref="canvasRef"
      @mousemove="onMouseMove"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
let ctx;
let effect;

let mouse = {
  x: 0,
  y: 0,
  clicked: false,
  radius: 200,
};

const onMouseMove = (e) => {
  if (mouse.clicked) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }
};
const onMouseDown = (e) => {
  mouse.clicked = true;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};
const onMouseUp = () => {
  mouse.clicked = false;
};

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.floor(Math.random() * 15 + 10);
    this.buffer = this.radius * 4;
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
    this.pushX = 0;
    this.pushY = 0;
    this.friction = 0.8;
  }
  draw(context) {
    context.fillStyle = "white";
    context.fill();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  }
  update() {
    if (mouse.clicked) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.hypot(dx, dy);
      const force = distance / mouse.radius;
      if (distance < mouse.radius) {
        const angle = Math.atan2(dy, dx);
        this.pushX -= Math.cos(angle) * force;
        this.pushY -= Math.sin(angle) * force;
      }
    }
    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;

    if (this.x < this.buffer) {
      this.x = this.buffer;
      this.vx *= -1;
    } else if (this.x > this.effect.width - this.buffer) {
      this.x = this.effect.width - this.buffer;
      this.vx *= -1;
    }
    if (this.y < this.buffer) {
      this.y = this.buffer;
      this.vy *= -1;
    } else if (this.y > this.effect.height - this.buffer) {
      this.y = this.effect.height - this.buffer;
      this.vy *= -1;
    }
  }
  reset() {
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 200;
    this.createParticles();
  }
  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  handleParticles(context) {
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  effect.handleParticles(ctx);
  requestAnimationFrame(animate);
}

const onResize = () => {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
  effect = new Effect(canvasRef.value);
};

onMounted(() => {
  ctx = canvasRef.value.getContext("2d");
  onResize();

  animate();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: black;
  canvas {
    position: relative;
    top: 0;
    left: 0;
    background: black;
    filter: blur(7px) contrast(20);
  }
}
</style>
