<template>
  <div ref="containerRef" class="container">
    <div v-for="box in 2" :key="box.id" :ref="boxesRef" class="glitchBox" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const containerRef = ref();
const boxesArray = ref([]);
const boxesRef = (el) => boxesArray.value.push(el);

function animate() {
  for (let i = 0; i < boxesArray.value.length; i++) {
    boxesArray.value[i].style.width = `${Math.floor(Math.random() * 700)}px`;
    boxesArray.value[i].style.height = `${Math.floor(Math.random() * 60)}px`;
    boxesArray.value[i].style.left = `${Math.floor(Math.random() * 100)}vw`;
    boxesArray.value[i].style.top = `${Math.floor(Math.random() * 100)}vh`;
    boxesArray.value[i].style.backgroundPosition = `${Math.floor(
      Math.random() * 50
    )}vh`;
  }
  requestAnimationFrame(animate);
}
onMounted(() => {
  animate();
});
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  width: 100%;
  height: calc(var(--vh) * 100);
  background: url(../../public/water.png);
  background-attachment: fixed;
  background-size: cover;
  overflow: hidden;
  .glitchBox {
    position: absolute;
    background: url(../../public/water.png);
    background-attachment: fixed;
  }
}
</style>
