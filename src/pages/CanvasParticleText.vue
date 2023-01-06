<template>
  <input ref="inputRef" type="text" placeholder="Type something..." />
  <canvas ref="canvasRef" />
</template>

<script setup>
//https://www.youtube.com/watch?v=2F2t1RJoGt8&ab_channel=Frankslaboratory
import { ref, onMounted } from "vue";

const inputRef = ref();
const canvasRef = ref();
onMounted(() => {
  const ctx = canvasRef.value.getContext("2d");
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;

  ctx.lineWidth = 3;
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(canvasRef.value.width / 2, 0);
  ctx.lineTo(canvasRef.value.width / 2, canvasRef.value.height);
  ctx.stroke();

  ctx.strokeStyle = "green";
  ctx.beginPath();
  ctx.moveTo(0, canvasRef.value.height / 2);
  ctx.lineTo(canvasRef.value.width, canvasRef.value.height / 2);
  ctx.stroke();

  const gradient = ctx.createLinearGradient(
    0,
    0,
    canvasRef.value.width,
    canvasRef.value.height
  );
  gradient.addColorStop(0.3, "red");
  gradient.addColorStop(0.5, "fuchsia");
  gradient.addColorStop(0.7, "purple");
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "white";
  ctx.font = "80px Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const maxTextWidth = canvasRef.value.width * 0.8;
  const lineHeight = 80;

  function wrapText(text) {
    let linesArray = [];
    let lineCounter = 0;
    let word = "";
    let words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      let testLine = word + words[i] + " ";
      if (ctx.measureText(testLine).width > maxTextWidth) {
        word = words[i] + "";
        lineCounter++;
      } else {
        word = testLine;
      }
      linesArray[lineCounter] = word;
    }
    let textHeight = lineHeight * lineCounter;
    let textY = canvasRef.value.height / 2 - textHeight / 2;
    linesArray.forEach((el, index) => {
      ctx.fillText(el, canvasRef.value.width / 2, textY + index * lineHeight);
    });
  }
  inputRef.value.addEventListener("keyup", (e) => {
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    wrapText(e.target.value);
  });
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
