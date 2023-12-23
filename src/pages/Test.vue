<template>
  <div class="container">
    <p ref="text1">S</p>
    <p ref="text2">K</p>
    <p ref="text3">I</p>
    <p ref="text4">L</p>
    <p ref="text5">L</p>
    <p ref="text6">S</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const text1 = ref();
const text2 = ref();
const text3 = ref();
const text4 = ref();
const text5 = ref();
const text6 = ref();

onMounted(() => {
  gsap.to(
    [
      text1.value,
      text2.value,
      text3.value,
      text4.value,
      text5.value,
      text6.value,
    ],
    {
      opacity: 1,
      y: 50,
      stagger: 0.3,
      duration: 0.3,
      ease: "bounce",
    }
  );
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  p {
    opacity: 0;
  }
}
</style>
