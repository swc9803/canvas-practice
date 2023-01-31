<template>
  <div
    class="container"
    @mousemove="onMouseMove"
    @touchmove.prevent="onTouchMove"
  >
    <div ref="monsterRef" class="img">img</div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const monsterRef = ref();

const mouse = reactive({
  x: -100,
  y: -100,
});

const onMouseMove = (e) => {
  mouse.x = e.pageX - window.innerWidth / 2;
  mouse.y = e.pageY - window.innerHeight / 2;

  let monsterX = mouse.x / window.innerWidth;
  let monsterY = mouse.y / window.innerHeight;
  if (monsterX < 0) {
    monsterX *= -1;
  }
  if (monsterY < 0) {
    monsterY *= -1;
  }
  if (monsterX < monsterY) {
    if (monsterY < 0.1) {
      monsterY = 0.1;
    }
    monsterRef.value.style.opacity = monsterY;
  } else if (monsterX > monsterY) {
    if (monsterX < 0.1) {
      monsterX = 0.1;
    }
    monsterRef.value.style.opacity = monsterX;
  }
};

const onTouchMove = (e) => {
  mouse.x = e.touches[0].pageX - window.innerWidth / 2;
  mouse.y = e.touches[0].pageY - window.innerHeight / 2;

  let monsterX = mouse.x / window.innerWidth;
  let monsterY = mouse.y / window.innerHeight;
  if (monsterX < 0) {
    monsterX *= -1;
  }
  if (monsterY < 0) {
    monsterY *= -1;
  }
  if (monsterX < monsterY) {
    if (monsterY < 0.1) {
      monsterY = 0.1;
    }
    monsterRef.value.style.opacity = monsterY;
  } else if (monsterX > monsterY) {
    if (monsterX < 0.1) {
      monsterX = 0.1;
    }
    monsterRef.value.style.opacity = monsterX;
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  .img {
    width: 300px;
    height: 300px;
    background: red;
  }
}
</style>
