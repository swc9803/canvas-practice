<template>
  <div>
    <canvas
      ref="canvasRef"
      tabindex="0"
      @mousemove="onMouseMove"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @keydown="onkeyDown"
    />
    <h1 ref="caption">welcome</h1>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
const caption = ref();
const debug = ref(false);
let ctx;
let effect;

let mouse = {
  x: 0,
  y: 0,
  clicked: false,
  radius: 150,
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
const onkeyDown = (e) => {
  if (e.key === "d") {
    debug.value = !debug.value;
    console.log(debug.value);
  }
};

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.floor(Math.random() * 7 + 3);
    this.x = this.effect.element.x + this.effect.element.width * Math.random();
    this.y = -Math.random() * this.effect.height * 0.5;
    this.vx = Math.random() * 2 - 1;
    this.vy = 0;
    this.gravity = this.radius * 0.001;
    this.friction = 0.95;
    this.width = this.radius * 2;
    this.height = this.radius * 2;
    this.bounced = 0;
  }
  draw(context) {
    let gradient = context.createLinearGradient(
      0,
      0,
      0,
      canvasRef.value.height
    );
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.5, "magenta");
    gradient.addColorStop(1, "pink");

    context.fillStyle = gradient;
    context.fill();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.strokeStyle = "white";
    // context.stroke();
    if (debug.value) {
      context.strokeRect(
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2
      );
    }
  }
  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (
      this.y > this.effect.height + this.radius + this.effect.maxDistance ||
      this.x < -this.radius - this.effect.maxDistance ||
      this.x > this.effect.width + this.radius + this.effect.maxDistance
    ) {
      this.reset();
    }

    // 충돌 감지
    if (
      this.x - this.radius <
        this.effect.element.x + this.effect.element.width &&
      this.x - this.radius + this.width > this.effect.element.x &&
      this.y - this.radius < this.effect.element.y + 5 &&
      this.height + this.y - this.radius > this.effect.element.y &&
      this.bounced < 10
    ) {
      this.vy *= -0.6;
      this.vx *= 2;
      this.y = this.effect.element.y - this.radius;
      this.bounced++;
    }
  }
  reset() {
    this.x = this.effect.element.x + this.effect.element.width * Math.random();
    this.y =
      -this.radius -
      this.effect.maxDistance -
      Math.random() * this.effect.height * 0.2;
    this.vy = 0;
    this.vx = Math.random() * 2 - 1;
    this.bounced = 0;
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.element = caption.value.getBoundingClientRect();
    this.particles = [];
    this.numberOfParticles = 200;
    this.maxDistance = 90;
    this.createParticles();
  }
  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  handleParticles(context) {
    let gradient = context.createLinearGradient(
      0,
      0,
      0,
      canvasRef.value.height
    );
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.5, "magenta");
    gradient.addColorStop(1, "pink");
    context.fillStyle = gradient;
    this.connectParticles(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
    if (debug.value) {
      context.strokeRect(
        this.element.x,
        this.element.y,
        this.element.width,
        this.element.height
      );
    }
  }
  connectParticles(context) {
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dx, dy);
        if (distance < this.maxDistance) {
          context.save();
          const opacity = 1 - distance / this.maxDistance;
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
  //   ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);
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
canvas {
  position: absolute;
  top: 0;
  left: 0;
  background: black;
}
h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 100px;
  font-family: Impact, cursive;
  border-top: 5px solid white;
  z-index: 1;
  pointer-events: none;
}
</style>
