<template>
  <div>
    <svg
      ref="snail"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496.07 269.85"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="red" />
          <stop offset="20%" stop-color="yellow" />
          <stop offset="40%" stop-color="green" />
          <stop offset="60%" stop-color="cyan" />
          <stop offset="80%" stop-color="blue" />
          <stop offset="100%" stop-color="magenta" />
        </linearGradient>
      </defs>
      <path
        class="cls-1"
        d="M416.48,101.23s-2.22-62.5,8.45-87.83c0,0-6.22-11.56,5.33-12.89,0,0,11.56,2.66,0,12.89,0,0-12.89,58.33,1.78,87.83,0,0,8-1.17,12.89,3.72,0,0,29.78-70.22,38.67-77.78,0,0-4-16,8.88-12.44,0,0,9.34,8-4.44,13.33,0,0-36,62.22-28.44,93.34,0,0,18.22,36.88-31.12,74.66s-25.27,54.22-12.19,59.56-14.92,19.55-36.69,11.11-34.67-10.22-62.67-5.78-39.11,2.22-63.11-3.11-23.56,7.56-44.45,7.56-43.55-4.45-56.89-10.67c0,0-19.11-2.22-41.33,6.67,0,0-25.33,0-43.11-9.34,0,0-15.56-1.78-29.33,6.22,0,0-30.23-.88-37.78-25.77,0,0-8.89-11.11,54.22-7.11,0,0,80-14.67,117.78-39.56s92.44-11.11,100.44-10.67S327.6,173,340,163.62s26.67-22.22,37.33-23.56S392.54,100.31,416.48,101.23Z"
      />
      <path
        class="cls-1"
        d="M432.63,157.45s-14.82,6.4-18.92,5.38-8.53-3.55-10,2.89,7.36,4.4,10.48,1.64,14.22-2.84,18.3.27"
      />
      <path
        class="cls-1"
        d="M456.72,164.49s15.1,1.78,19.3,5.41,7.73,8.15,11.57,3.66-1.76-7.57-7.4-6.83-18.74-6.83-19.43-10.62"
      />
      <path
        class="cls-1"
        d="M430.26,187s-4-15-29-3.86S368.93,221.62,343.6,235s-40.89,27.39-60.78,28"
      />
    </svg>
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
const ctx = ref();
const snail = ref();

class Bar {
  constructor(x, y, width, height, color, index) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.index = index;
  }
  update(micInput) {
    const sound = micInput * 1000;
    if (sound > this.height) {
      this.height = sound;
    } else {
      this.height -= this.height * 0.03;
    }
  }
  draw(context) {
    context.strokeStyle = this.color;
    context.innerWidth = this.width;
    context.save();
    context.rotate(this.index * 0.043);
    context.beginPath();
    context.bezierCurveTo(
      this.x / 2,
      this.y / 2,
      this.height * -0.5 - 150,
      this.height + 50,
      this.x,
      this.y
    );
    context.stroke();

    if (this.index > 170) {
      ctx.value.beginPath();
      ctx.value.arc(
        this.x,
        this.y + 10 + this.height / 2,
        this.height * 0.1,
        this.height * 0.05,
        0,
        Math.PI * 2
      );
      context.stroke();
      context.beginPath();
      context.moveTo(this.x, this.y + 10);
      context.lineTo(this.x, this.y + 10 + this.height / 2);
      context.stroke();
    }
    context.restore();
  }
}

class Microphone {
  constructor(fftSize) {
    this.initialized = false;
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(
        function (stream) {
          this.audioContext = new AudioContext();
          this.microphone = this.audioContext.createMediaStreamSource(stream);
          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = fftSize;
          const bufferLength = this.analyser.frequencyBinCount;
          this.dataArray = new Uint8Array(bufferLength);
          this.microphone.connect(this.analyser);
          this.initialized = true;
        }.bind(this)
      )
      .catch((err) => {
        alert(err);
      });
  }
  getSamples() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    let normSamples = [...this.dataArray].map((e) => e / 128 - 1);
    return normSamples;
  }
  getVolume() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    let normSamples = [...this.dataArray].map((e) => e / 128 - 1);
    let sum = 0;
    for (let i = 0; i < normSamples.length; i++) {
      sum += normSamples[i] * normSamples[i];
    }
    let volume = Math.sqrt(sum / normSamples.length);
    return volume;
  }
}

let fftSize = 512;
const microphone = new Microphone(fftSize);

const onResize = () => {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
};

onMounted(() => {
  ctx.value = canvasRef.value.getContext("2d");
  onResize();
  let bars = [];
  //   let barWidth = canvasRef.value.width / (fftSize / 2);
  function createBars() {
    for (let i = 1; i < fftSize / 2; i++) {
      let color = `hsl(${i * 2}, 100%, 50%)`;
      bars.push(new Bar(0, i * 0.9, 1, 0, color, i));
    }
  }

  let softVolume = 0;
  function animate() {
    if (microphone.initialized) {
      ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
      const samples = microphone.getSamples();
      const volume = microphone.getVolume();
      ctx.value.save();
      ctx.value.translate(
        canvasRef.value.width / 2 - 70,
        canvasRef.value.height / 2 + 50
      );
      bars.forEach((bar, i) => {
        bar.update(samples[i]);
        bar.draw(ctx.value);
      });
      ctx.value.restore();

      softVolume = softVolume * 0.9 + volume * 0.1;
      snail.value.style.transform = `translate(-50%, -50%) scale(${
        (1 + softVolume * 3, 1 + softVolume * 3)
      })`;
    }
    requestAnimationFrame(animate);
  }

  createBars();
  animate();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  //   cancelAnimationFrame(flowFieldAnimation);
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
svg {
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  top: 50%;
  left: 50%;
  width: 800px;
  z-index: 1;
  .cls-1 {
    fill: none;
    stroke: url(#gradient);
    stroke-miterlimit: 10;
    stroke-width: 2;
  }
}
</style>
