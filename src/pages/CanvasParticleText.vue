<template>
  <canvas ref="canvasRef" @mousemove="movePointer" />
  <input type="text" ref="inputRef" :value="msgData" @input="msgTyping" />
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
const inputRef = ref();

const msgData = ref("글자를 입력하세요");
const msgTyping = (e) => {
  msgData.value = e.target.value;
};

const mouse = reactive({
  radius: 20000,
  x: 0,
  y: 0,
});
const movePointer = (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
};

class Particle {
  constructor(effect, x, y, color) {
    this.effect = effect;
    this.x = Math.random() * this.effect.canvasWidth;
    this.y = this.effect.canvasHeight;
    this.color = color;
    this.originX = x;
    this.originY = y;
    this.size = this.effect.gap;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = Math.random() * 0.6 + 0.15;
    this.ease = Math.random() * 0.1 + 0.03;
  }
  draw() {
    this.effect.context.fillStyle = this.color;
    this.effect.context.fillRect(this.x, this.y, this.size, this.size);
  }
  update() {
    this.dx = mouse.x - this.x;
    this.dy = mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -mouse.radius / this.distance;

    if (this.distance < mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }

    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
  }
}

class Effect {
  constructor(context, canvasWidth, canvasHeight) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.fontSize = 80;
    this.lineHeight = this.fontSize * 0.9;
    this.maxTextWidth = this.canvasWidth * 0.8;
    inputRef.value.addEventListener("keyup", (e) => {
      if (e.key !== " ") {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.wrapText(msgData.value);
      }
    });
    this.particles = [];
    this.gap = 3;
  }
  wrapText(text) {
    const gradient = this.context.createLinearGradient(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
    gradient.addColorStop(0.3, "red");
    gradient.addColorStop(0.5, "orange");
    gradient.addColorStop(0.7, "yellow");
    this.context.fillStyle = gradient;
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.lineWidth = 3;
    this.context.strokeStyle = "white";
    this.context.font = `${this.fontSize}px Arial`;

    let linesArray = [];
    let words = text.split(" ");
    let lineCounter = 0;
    let word = "";
    for (let i = 0; i < words.length; i++) {
      let testLine = word + words[i] + " ";
      if (this.context.measureText(testLine).width > this.maxTextWidth) {
        word = words[i] + "";
        lineCounter++;
      } else {
        word = testLine;
      }
      linesArray[lineCounter] = word;
    }
    let textHeight = this.lineHeight * lineCounter;
    this.textY = this.canvasHeight / 2 - textHeight / 2;
    linesArray.forEach((el, index) => {
      this.context.fillText(
        el,
        this.textX,
        this.textY + index * this.lineHeight
      );
      this.context.strokeText(
        el,
        this.textX,
        this.textY + index * this.lineHeight
      );
    });
    this.convertToParticles();
  }
  convertToParticles() {
    this.particles = [];
    const pixels = this.context.getImageData(
      0,
      0,
      canvasRef.value.width,
      canvasRef.value.height
    ).data;
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let y = 0; y < this.canvasHeight; y += this.gap) {
      for (let x = 0; x < this.canvasWidth; x += this.gap) {
        const index = (y * this.canvasWidth + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = `rgb(${red}, ${green}, ${blue})`;
          this.particles.push(new Particle(this, x, y, color));
        }
      }
    }
  }
  render() {
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
  }
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.maxTextWidth = this.canvasWidth * 0.8;
  }
}

const effect = ref();

const onResize = () => {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
  effect.value.resize(canvasRef.value.width, canvasRef.value.height);
  effect.value.wrapText(msgData.value);
};

onMounted(() => {
  const ctx = canvasRef.value.getContext("2d", {
    willReadFrequently: true,
  });
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;

  effect.value = new Effect(ctx, canvasRef.value.width, canvasRef.value.height);
  effect.value.wrapText(msgData.value);
  effect.value.render();

  function animate() {
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    effect.value.render();
    requestAnimationFrame(animate);
  }
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
input {
  position: absolute;
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
  z-index: 10;
}
</style>
