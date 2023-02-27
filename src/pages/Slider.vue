<template>
  <div class="container">
    <div ref="wrapperRef" class="wrapper">
      <div v-for="card in cards" :key="card.id" :ref="cardRef" class="card">
        <div>
          text in 3d
          <small><br />text in 3d</small>
          <!-- <img class="" :src="`@/assets/${card.src}.jpg`" /> -->
        </div>
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

const wrapperRef = ref();
const cardArray = ref([]);
const cardRef = (el) => cardArray.value.push(el);

const proxy = document.createElement("div");
const dragAmount = 3000;
const cardGap = 520;
let startProgress;
let draggableTrigger;

onMounted(() => {
  let progressLimit = gsap.utils.wrap(0, 1);
  const spin = gsap.fromTo(
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
  draggableTrigger = Draggable.create(proxy, {
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
});

onBeforeUnmount(() => {
  draggableTrigger.forEach((trigger) => trigger.kill());
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(var(--vh) * 100);
  background: black;
  overflow: hidden;
  .wrapper {
    position: relative;
    width: 680px;
    height: 400px;
    -webkit-font-smoothing: antialiased;
    perspective: 1100px;
    // background: white;
    transform-style: preserve-3d;
  }
  .card {
    position: absolute;
    width: 180px;
    height: 180px;
    display: inline-block;
    margin: 10px 20px 50px 235px;
    overflow: hidden;
    border: 1px solid #00fff3;
    color: #00fff2;
    background: transparent;
    height: 600px;
    &:hover {
      cursor: pointer;
      box-shadow: 0 4px 8px 0 #00fff3, 0 6px 20px 0 #00fff3;
    }
  }
}
</style>
