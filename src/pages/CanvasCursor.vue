<template>
  <div class="container">
    <canvas
      ref="canvasRef"
      @mousemove="onMouseMove"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    />
    <img ref="imgRef" src="@/assets/star.png" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
const imgRef = ref();
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
    this.radius = Math.floor(Math.random() * 10 + 1);
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
    this.pushX = 0;
    this.pushY = 0;
    this.friction = 0.95;
    this.image = imgRef.value;
    this.spriteWidth = 50;
    this.spriteHeight = 50;
    this.sizeModifier = Math.random() + 0.2;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.halfWidth = this.width * 0.5;
    this.halfHeight = this.height * 0.5;
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - this.halfWidth,
      this.y - this.halfHeight,
      this.width,
      this.height
    );
  }
  update() {
    if (mouse.clicked) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.hypot(dx, dy);
      const force = mouse.radius / distance;
      if (distance < mouse.radius) {
        const angle = Math.atan2(dy, dx);
        this.pushX += Math.cos(angle) * force;
        this.pushY += Math.sin(angle) * force;
      }
    }
    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;

    if (this.x < this.radius) {
      this.x = this.radius;
      this.vx *= -1;
    } else if (this.x > this.effect.width - this.radius) {
      this.x = this.effect.width - this.radius;
      this.vx *= -1;
    }
    if (this.y < this.radius) {
      this.y = this.radius;
      this.vy *= -1;
    } else if (this.y > this.effect.height - this.radius) {
      this.y = this.effect.height - this.radius;
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
    this.numberOfParticles = 150;
    this.createParticles();
  }
  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  handleParticles(context) {
    this.connectParticles(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
  connectParticles(context) {
    const maxDistance = 80;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dx, dy);
        if (distance < maxDistance) {
          context.save();
          const opacity = 1 - distance / maxDistance;
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(this.particles[a].x, this.particles[a].y);
          context.lineTo(this.particles[b].x, this.particles[b].y);
          context.stroke();
          context.restore();
        }
      }
    }
  }
}

const animate = () => {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  effect.handleParticles(ctx);
  requestAnimationFrame(animate);
};

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
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  canvas {
    position: relative;
    top: 0;
    left: 0;
    background: black;
  }
}
</style>
