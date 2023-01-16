<template>
  <div class="container">
    <canvas ref="canvasRef" @mousemove="onMouseMove" @touchmove="onTouchMove" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
const ctx = ref();

const particleArray = [];
let hue = 0;

const mouse = reactive({
  x: -100,
  y: -100,
});

const onMouseMove = (e) => {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
  for (let i = 0; i < 4; i++) {
    particleArray.push(new Particle());
  }
};
const onTouchMove = (e) => {
  mouse.x = e.touches[0].pageX;
  mouse.y = e.touches[0].pageY;
  // e.preventDefault(); // 스크롤 잠금
  for (let i = 0; i < 2; i++) {
    particleArray.push(new Particle());
  }
};

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) {
      this.size -= 0.1;
    }
  }
  draw() {
    ctx.value.fillStyle = this.color;
    ctx.value.beginPath();
    ctx.value.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.value.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    for (let j = i; j < particleArray.length; j++) {
      const dx = particleArray[i].x - particleArray[j].x;
      const dy = particleArray[i].y - particleArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.value.beginPath();
        ctx.value.strokeStyle = particleArray[i].color;
        ctx.value.lineWidth = 0.5;
        ctx.value.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.value.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.value.stroke();
        ctx.value.closePath();
      }
    }
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      i--;
    }
  }
}

const onAnimate = ref();
function animate() {
  ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  handleParticles();
  hue += 2;
  onAnimate.value = requestAnimationFrame(animate);
}

onMounted(() => {
  ctx.value = canvasRef.value.getContext("2d");
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;

  animate();

  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  onAnimate.value = requestAnimationFrame(animate);
  window.cancelAnimationFrame("resize", onResize);
});

function onResize() {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  canvas {
    background: black;
  }
}
</style>
