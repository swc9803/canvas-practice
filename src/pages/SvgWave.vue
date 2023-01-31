<template>
  <div class="container">
    <svg>
      <filter id="noise" x="0" y="0" width="100%" height="100%">
        <feTurbulence
          ref="turbulenceRef"
          baseFrequency="0.02 0.03"
          numOctaves="1"
          result="NOISE"
          id="turbulence"
        />
        <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="20" />
      </filter>
    </svg>
    <div class="overlay">
      <div class="imgWrapper">
        <img src="water.png" />
        <img src="water.png" />
        <img src="water.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const turbulenceRef = ref();
const waveTl = gsap.timeline();

onMounted(() => {
  waveTl
    .from("img", {
      x: -100,
      y: -120,
      opacity: 0,
      duration: 1,
      ease: "power4.easeOut",
      stagger: 0.3,
    })
    .to(
      turbulenceRef.value,
      {
        attr: {
          baseFrequency: "0 0",
        },
        duration: 3,
      },
      "<"
    );
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@600&display=swap");

.container {
  position: relative;
  width: 100%;
  height: calc(var(--vh) * 100);
  font-family: "Playfair Display";
  svg {
    position: absolute;
  }
  .overlay {
    position: absolute;
    top: 0;
    .imgWrapper {
      display: grid;
      grid-template-columns: repeat(3, auto);
      align-items: center;
      width: 80%;
      height: calc(var(--vh) * 100);
      margin: 0 auto;
      img {
        width: 100%;
        filter: url(#noise);
      }
    }
  }
}
</style>
