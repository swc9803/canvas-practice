<template>
  <canvas ref="canvasRef" @mousemove="onMouseMove" @touchmove="onTouchMove" />
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
const ctx = ref();
let eyeAnimation;
let eyes = [];
let theta;
const mouse = reactive({
  x: 0,
  y: 0,
});

const onMouseMove = (e) => {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
};
const onTouchMove = (e) => {
  mouse.x = e.touches[0].pageX;
  mouse.y = e.touches[0].pageY;
  e.preventDefault();
};

class Eye {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    ctx.value.beginPath();
    ctx.value.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.value.fillStyle = "red";
    ctx.value.fill();
    ctx.value.closePath();

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    theta = Math.atan2(dy, dx);
    let iris_x = this.x + (Math.cos(theta) * this.radius) / 10;
    let iris_y = this.y + (Math.sin(theta) * this.radius) / 10;
    let irisRadius = this.radius / 1.2;
    ctx.value.beginPath();
    ctx.value.arc(iris_x, iris_y, irisRadius, 0, Math.PI * 2, true);
    ctx.value.fillStyle = "white";
    ctx.value.fill();
    ctx.value.closePath();

    let pupilRadius = this.radius / 2.5;
    let pupil_x = this.x + (Math.cos(theta) * this.radius) / 1.9;
    let pupil_y = this.y + (Math.sin(theta) * this.radius) / 1.9;
    ctx.value.beginPath();
    ctx.value.arc(pupil_x, pupil_y, pupilRadius, 0, Math.PI * 2, true);
    ctx.value.fillStyle = "black";
    ctx.value.fill();
    ctx.value.closePath();

    ctx.value.beginPath();
    ctx.value.arc(
      pupil_x - pupilRadius / 3,
      pupil_y - pupilRadius / 3,
      pupilRadius / 2,
      0,
      Math.PI * 2,
      true
    );
    ctx.value.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.value.fill();
    ctx.value.closePath();

    // mouse
    ctx.value.beginPath();
    ctx.value.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2, true);
    ctx.value.fillStyle = "gold";
    ctx.value.fill();
    ctx.value.closePath();
  }
}
function init() {
  eyes = [];
  let overlapping = false;
  let numberOfEyes = 20;
  let protection = 10000;
  let counter = 0;

  while (eyes.length < numberOfEyes && counter < protection) {
    let eye = {
      x: Math.random() * canvasRef.value.width,
      y: Math.random() * canvasRef.value.height,
      radius: Math.floor(Math.random() * 100) + 5,
    };
    overlapping = false;
    for (let i = 0; i < eyes.length; i++) {
      let previousEye = eyes[i];
      let dx = eye.x - previousEye.x;
      let dy = eye.y - previousEye.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < eye.radius + previousEye.radius) {
        overlapping = true;
        break;
      }
    }
    if (!overlapping) {
      eyes.push(new Eye(eye.x, eye.y, eye.radius));
    }
    counter++;
  }
}
function animate() {
  eyeAnimation = requestAnimationFrame(animate);
  ctx.value.fillStyle = "rgba(0,0,0, 0.25)";
  ctx.value.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  for (let i = 0; i < eyes.length; i++) {
    eyes[i].draw();
  }
}

const onResize = () => {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
  init();
};

onMounted(() => {
  ctx.value = canvasRef.value.getContext("2d");
  onResize();
  animate();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(eyeAnimation);
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
img {
  display: none;
}
.controls {
  position: absolute;
  z-index: 9;
}
</style>
