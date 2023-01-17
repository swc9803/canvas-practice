<template>
  <canvas ref="canvasRef" @mousemove="onMouseMove" @touchmove="onTouchMove" />
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
const ctx = ref();
let flowFieldAnimation;

const mouse = reactive({
  x: 0,
  y: 0,
});

const onMouseMove = (e) => {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
};
const onTouchMove = (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
  e.preventDefault();
};
class FlowFieldEffect {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.ctx.lineWidth = 1;
    this.width = width;
    this.height = height;
    this.lastTime = 0;
    this.interval = 1000 / 60; // fps
    this.timer = 0;
    this.cellSize = 15;
    this.gradient;
    this.createGradient();
    this.ctx.strokeStyle = this.gradient;
    this.radius = 4;
    this.vr = 0.03;
  }
  createGradient() {
    this.gradient = this.ctx.createLinearGradient(
      0,
      0,
      this.width,
      this.height
    );
    this.gradient.addColorStop("0.1", "#ff5c33");
    this.gradient.addColorStop("0.2", "#ff66b3");
    this.gradient.addColorStop("0.4", "#ccccff");
    this.gradient.addColorStop("0.6", "#b3ffff");
    this.gradient.addColorStop("0.8", "#80ff80");
    this.gradient.addColorStop("0.9", "#ffff33");
  }
  drawLine(angle, x, y) {
    let positionX = x;
    let positionY = y;
    let dx = mouse.x - positionX;
    let dy = mouse.y - positionY;
    let distance = dx * dx + dy * dy;
    if (distance > 600000) {
      distance = 600000;
    } else if (distance < 50000) {
      distance = 50000;
    }

    const length = distance / 15000;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    this.ctx.stroke();
  }
  animate(timeStamp) {
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    if (this.timer > this.interval) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.radius += this.vr;
      if (this.radius > 5 || this.radius < -5) {
        this.vr *= -1;
      }

      for (let y = 0; y < this.height; y += this.cellSize) {
        for (let x = 0; x < this.width; x += this.cellSize) {
          const angle =
            (Math.cos(mouse.x * x * 0.00001) +
              Math.sin(mouse.y * y * 0.00001)) *
            this.radius;
          this.drawLine(angle, x, y);
        }
      }

      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
  }
}

const onResize = () => {
  cancelAnimationFrame(flowFieldAnimation);
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
  const flowField = new FlowFieldEffect(
    ctx.value,
    canvasRef.value.width,
    canvasRef.value.height
  );
  flowField.animate(0);
};

onMounted(() => {
  ctx.value = canvasRef.value.getContext("2d");
  onResize();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(flowFieldAnimation);
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
