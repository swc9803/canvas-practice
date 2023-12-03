<template>
  <div>
    <p v-for="item in introText" :key="item.id" :ref="wordRef" class="word">
      {{ item.text }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const wordArray = ref([]);
const wordRef = (el) => wordArray.value.push(el);

const introText = [
  { text: "Creative" },
  { text: "Interactive" },
  { text: "Web Developer" },
];

const wordTl = gsap.timeline();
onMounted(() => {
  wordTl.from(wordArray.value[0], {
    filter: "blur(1em)",
    opacity: 0,
    duration: 1,
  });
  wordTl.to(wordArray.value[0], {
    y: "-50vh",
    duration: 1,
    ease: "power3.in",
  });
  wordTl.from(wordArray.value[1], {
    filter: "blur(1em)",
    opacity: 0,
    duration: 1,
  });
  wordTl.to(wordArray.value[1], {
    y: "-50vh",
    duration: 1,
    ease: "power3.in",
  });
  wordTl.from(wordArray.value[2], {
    filter: "blur(1em)",
    opacity: 0,
    duration: 1,
  });
  wordTl.to(wordArray.value[2], {
    y: "-50vh",
    duration: 1,
    ease: "power3.in",
  });
});
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100vh;
  background: black;
  .word {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 5vw;
    font-weight: 900;
  }
}
</style>
