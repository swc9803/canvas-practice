<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
const ctx = ref();
const effect = ref();
let matrixAnimation;

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters = "가나다라마바사아자차카타파하";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "";
    this.canvasHeight = canvasHeight;
  }
  draw(context) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.initialize();
  }
  initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.initialize();
  }
}

const onResize = () => {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
  effect.value = new Effect(canvasRef.value.width, canvasRef.value.height);
  effect.value.resize(canvasRef.value.width, canvasRef.value.height);
};

let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if (timer > nextFrame) {
    ctx.value.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.value.textAlign = "center";
    ctx.value.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    ctx.value.fillStyle = "#0aff0a";
    ctx.value.font = `${effect.value.fontSize}px monospace`;
    effect.value.symbols.forEach((symbol) => symbol.draw(ctx.value));
    timer = 0;
  } else {
    timer += deltaTime;
  }
  matrixAnimation = requestAnimationFrame(animate);
}

onMounted(() => {
  ctx.value = canvasRef.value.getContext("2d");
  onResize();

  animate(0);
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(matrixAnimation);
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
