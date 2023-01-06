<template>
  <input ref="inputRef" type="text" placeholder="Type something..." />
  <canvas ref="canvasRef" />
</template>

<script setup>
//https://www.youtube.com/watch?v=2F2t1RJoGt8&ab_channel=Frankslaboratory // 49m
import { ref, onMounted } from "vue";

const inputRef = ref();
const canvasRef = ref();
onMounted(() => {
  const ctx = canvasRef.value.getContext("2d");
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;

  //   class Particle {
  //     constructor() {}
  //     draw() {}
  //     update() {}
  //   }
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
          ctx.clearRect(0, 0, this.canvasWidth, this.canvasWidth);
          this.wrapText(e.target.value);
        }
      });
      this.particle = [];
      this.gap = 3;
      this.mouse = {
        radius: 20000,
        x: 0,
        y: 0,
      };
      window.addEventListener("mousemove", (e) => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      });
    }
    wrapText(text) {
      const gradient = this.context.createLinearGradient(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      gradient.addColorStop(0.3, "red");
      gradient.addColorStop(0.5, "fuchsia");
      gradient.addColorStop(0.7, "purple");
      this.context.fillStyle = gradient;
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.lineWidth = 3;
      this.context.strokeStyle = "white";
      this.context.font = `${this.fontSize}px Helvetica`;

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
      this.particle = [];
      const pixels = this.context.getImageData(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
    }
    render() {}
  }
  const effect = new Effect(ctx, canvasRef.value.width, canvasRef.value.height);
  effect.wrapText("Hello");
});
</script>

<style lang="scss" scoped>
canvas {
  background: black;
}
input {
  position: absolute;
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
  z-index: 1;
}
</style>
