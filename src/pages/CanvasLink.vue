<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
let ctx;
let effect;

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.random() * 6 + 3;
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
  }
  draw(context) {
    const gradient = context.createLinearGradient(
      0,
      0,
      canvasRef.value.width,
      canvasRef.value.height
    );
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.5, "magenta");
    gradient.addColorStop(1, "blue");

    context.fillStyle = gradient;
    context.fill();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.strokeStyle = "white";
    context.stroke();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > this.effect.width - this.radius || this.x < this.radius) {
      this.vx *= -1;
    }
    if (this.y > this.effect.height - this.radius || this.y < this.radius) {
      this.vy *= -1;
    }
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
    this.connectParticles(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
  connectParticles(context) {
    const maxDistance = 100;
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

function animate() {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  effect.handleParticles(ctx);
  requestAnimationFrame(animate);
}

const onResize = () => {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
};

onMounted(() => {
  ctx = canvasRef.value.getContext("2d");
  onResize();

  effect = new Effect(canvasRef.value);

  animate();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  background: black;
}
</style>
