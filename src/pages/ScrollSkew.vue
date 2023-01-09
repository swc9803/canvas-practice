<template>
  <div class="container">
    <section ref="contentsRef">
      <div v-for="content in contents" :key="content.id" class="contentWrapper">
        <img :src="content.src" />
        <h1>title</h1>
        <p>message</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const contents = [
  { src: "water.png" },
  { src: "water.png" },
  { src: "water.png" },
  { src: "water.png" },
  { src: "water.png" },
];

const contentsRef = ref();
const originPos = ref(0);
const newPos = ref(0);

const skewSection = () => {
  newPos.value = window.pageYOffset;
  const speed = (newPos.value - originPos.value) * 0.3;

  contentsRef.value.style.transform = `translate(-50%, 0) skewY(${speed}deg)`;
  originPos.value = newPos.value;
  requestAnimationFrame(skewSection);
};

onMounted(() => {
  originPos.value = window.pageYOffset;
  skewSection();
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  background: rgb(22, 22, 22);
  color: white;
  overflow: hidden;
  section {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 70%;
    margin: 100px 0;
    transition: 0.8s;
    will-change: transform;
    .contentWrapper {
      width: 100%;
      img {
        width: 100%;
      }
      p {
        font-size: 1.2em;
        margin-bottom: 50px;
      }
    }
  }
}
</style>
