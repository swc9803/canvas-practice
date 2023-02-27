<template>
  <div class="container">
    <div ref="wrapperRef" class="wrapper">
      <div ref="dragElRef" />
      <div v-for="card in cards" :key="card.id" :ref="cardRef" class="card">
        <p>text in 3d</p>
        <small><br />text in 3d</small>
        <!-- <img class="" :src="`@/assets/${card.src}.jpg`" /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const cards = [
  {
    src: "",
    alt: "test",
  },
  {
    src: "",
    alt: "test",
  },
  {
    src: "",
    alt: "test",
  },
  {
    src: "",
    alt: "test",
  },
  {
    src: "",
    alt: "test",
  },
  {
    src: "",
    alt: "test",
  },
];

const dragElRef = ref();
const wrapperRef = ref();
const cardArray = ref([]);
const cardRef = (el) => cardArray.value.push(el);

const dragAmount = -3000;
let cardGap = 520;
let startProgress;
let draggableTrigger;
let spin;

const onResize = () => {
  cardGap = Math.min(window.innerWidth / 1.8, 520);
  spin = gsap.fromTo(
    cardArray.value,
    {
      rotationY: (i) => (i * 360) / cardArray.value.length,
    },
    {
      rotationY: "+=360",
      transformOrigin: `50% 50% ${-cardGap}px`,
      duration: 50,
      ease: "none",
      repeat: -1,
    }
  );
};

onMounted(() => {
  onResize();

  let progressLimit = gsap.utils.wrap(0, 1);
  draggableTrigger = Draggable.create(dragElRef.value, {
    trigger: wrapperRef.value,
    allowNativeTouchScrolling: true,
    onPress() {
      gsap.killTweensOf(spin);
      spin.timeScale(0); // 애니메이션 중지
      startProgress = spin.progress();
    },
    onDrag() {
      let currentProgress = startProgress + (this.startX - this.x) / dragAmount;
      spin.progress(progressLimit(currentProgress));
    },
    onRelease() {
      if (!this.tween || !this.tween.isActive()) {
        gsap.to(spin, { timeScale: 1, duration: 1 });
      }
    },
  });

  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  draggableTrigger.forEach((trigger) => trigger.kill());
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1920px;
  height: calc(var(--vh) * 100);
  background: rgb(129, 129, 129);
  overflow: hidden;
  .wrapper {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 680px;
    height: 400px;
    transform-style: preserve-3d;
    perspective: 1200px;
    // background: white;
    .card {
      position: absolute;
      width: 25vh;
      height: 60vh;
      margin: 10px 20px 50px 235px;
      border: 2px solid #00fff3;
      color: #00fff2;
      //   background: transparent;
      background: red;
      overflow: hidden;
      &:hover {
        cursor: pointer;
        box-shadow: 0 4px 8px 0 #00fff3, 0 6px 20px 0 #00fff3;
      }
    }
  }
}
</style>
