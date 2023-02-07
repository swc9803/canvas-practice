<template>
  <div
    class="container"
    @mousemove="onMouseMove"
    @touchmove.prevent="onTouchMove"
  >
    <img ref="imgRef" src="https://source.unsplash.com/random/800x800" />
    <p>Move the mouse cursor to the corner!</p>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const imgRef = ref();

const mouse = reactive({
  x: -100,
  y: -100,
});

let opacityRatio = 1.5; // 1 to 2

const onMouseMove = (e) => {
  mouse.x = e.pageX - window.innerWidth / opacityRatio;
  mouse.y = e.pageY - window.innerHeight / opacityRatio;

  let imgX = mouse.x / window.innerWidth;
  let imgY = mouse.y / window.innerHeight;
  if (imgX < 0) {
    imgX *= -1;
  }
  if (imgY < 0) {
    imgY *= -1;
  }
  if (imgX < imgY) {
    if (imgY < 0.1) {
      imgY = 0.1;
    }
    imgRef.value.style.opacity = imgY;
  } else if (imgX > imgY) {
    if (imgX < 0.1) {
      imgX = 0.1;
    }
    imgRef.value.style.opacity = imgX;
  }
};

const onTouchMove = (e) => {
  mouse.x = e.touches[0].pageX - window.innerWidth / opacityRatio;
  mouse.y = e.touches[0].pageY - window.innerHeight / opacityRatio;

  let imgX = mouse.x / window.innerWidth;
  let imgY = mouse.y / window.innerHeight;
  if (imgX < 0) {
    imgX *= -1;
  }
  if (imgY < 0) {
    imgY *= -1;
  }
  if (imgX < imgY) {
    if (imgY < 0.1) {
      imgY = 0.1;
    }
    imgRef.value.style.opacity = imgY;
  } else if (imgX > imgY) {
    if (imgX < 0.1) {
      imgX = 0.1;
    }
    imgRef.value.style.opacity = imgX;
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(var(--vh) * 100);
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2em;
    font-weight: 700;
    text-align: center;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: bottom;
    opacity: 0.1;
  }
}
</style>
