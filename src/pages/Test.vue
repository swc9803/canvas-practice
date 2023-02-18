<template>
  <div class="container">
    <!-- <div class="wrapper"> -->
    <div class="sun"></div>
    <div class="moon"></div>
    <!-- </div> -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";

const animate = () => {
  gsap.to(".container", {
    rotate: 360,
    duration: 5,
    repeat: -1,
    ease: "none",
  });
  gsap.to(".moon", {
    rotate: -360,
    duration: 5,
    repeat: -1,
    ease: "none",
  });
};

onMounted(() => {
  animate();
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 60vh;
  background: red;
  .sun {
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translate3d(-100%, -50%, 0);
    width: 20vh;
    height: 20vh;
    background: rgb(236, 217, 41);
    border-radius: 100px;
  }
  .moon {
    position: absolute;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    width: 20vh;
    height: 20vh;
    border-radius: 50%;
    box-shadow: inset 2.5em -2.5em #e7c738;
  }
}
</style>
