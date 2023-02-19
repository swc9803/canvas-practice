<template>
  <div class="container">
    <div class="cloud"></div>
    <svg ref="pathRef" class="path" viewBox="0 0 405 141">
      <path
        id="path"
        stroke="#000"
        d="M404.5 70.5c0 9.5244-5.543 18.6699-15.731 27.0557-10.185 8.3833-24.952 15.9543-43.244 22.3233-36.58 12.735-87.147 20.621-143.025 20.621s-106.445-7.886-143.0247-20.621c-18.2922-6.369-33.0596-13.94-43.2441-22.3233C6.04329 89.1699.5 80.0244.5 70.5s5.54329-18.6699 15.7312-27.0557c10.1845-8.383 24.9519-15.9547 43.2441-22.3231C96.055 8.38602 146.622.5 202.5.5s106.445 7.88602 143.025 20.6212c18.292 6.3684 33.059 13.9401 43.244 22.3231C398.957 51.8301 404.5 60.9756 404.5 70.5Z"
      />
    </svg>

    <div class="wrapper">
      <div class="sun"></div>
      <div class="moon"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

const pathRef = ref();

const animate = () => {
  gsap.to(".moon", {
    motionPath: {
      path: "#path",
      align: "#path",
      autoRotate: true,
      alignOrigin: [0.5, 0.5],
    },
    duration: 10,
    repeat: -1,
    ease: "none",
  });
  gsap.to(".moon", {
    // rotate: -360,
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
.cloud {
  position: relative;
  top: 10%;
  left: 10%;
  width: 200px;
  height: 100px;
  background: #fff;
  border-radius: 100px;
  transform: skew(-20deg) rotate(-5deg);
  box-shadow: -20px -20px 0 -10px #fff, 20px -20px 0 -10px #fff, 0 0 0 30px #fff,
    15px 10px 0 0 #fff, -15px 10px 0 0 #fff;
}
.path {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
}
.wrapper {
  //   background: white;
  width: 100%;
  height: 100%;
}
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
