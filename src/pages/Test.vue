<template>
  <div class="container">
    <div ref="wrapperRef" class="wrapper">
      <div v-for="card in cards" :key="card.id" :ref="cardRef" class="card">
        <div>
          text in 3d
          <small><br />text in 3d</small>
          <router-link :to="`/${card.path}`">
            <!-- <img class="" :src="`@/assets/${card.src}.jpg`" /> -->
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const cards = [
  {
    src: "",
    alt: "test",
    path: "",
  },
  {
    src: "",
    alt: "test",
    path: "",
  },
  {
    src: "",
    alt: "test",
    path: "",
  },
  {
    src: "",
    alt: "test",
    path: "",
  },
  {
    src: "",
    alt: "test",
    path: "",
  },
  {
    src: "",
    alt: "test",
    path: "",
  },
];

const wrapperRef = ref();
const cardArray = ref([]);
const cardRef = (el) => cardArray.value.push(el);

const dragDistancePerRotation = 3000;
const radius = 520;
let startProgress;

onMounted(() => {
  let proxy = document.createElement("div");
  let progressWrap = gsap.utils.wrap(0, 1);
  const spin = gsap.fromTo(
    cardArray.value,
    {
      rotationY: (i) => (i * 360) / cardArray.value.length,
    },
    {
      rotationY: "-=360",
      transformOrigin: `50% 50% ${-radius}px`,
      duration: 20,
      ease: "none",
      repeat: -1,
    }
  );
  Draggable.create(proxy, {
    trigger: wrapperRef.value,
    type: "x",
    inertia: true,
    allowNativeTouchScrolling: true,
    onPress() {
      gsap.killTweensOf(spin);
      spin.timeScale(0);
      startProgress = spin.progress();
    },
    onDrag: updateRotation,
    onThrowUpdate: updateRotation,
    onRelease() {
      if (!this.tween || !this.tween.isActive()) {
        gsap.to(spin, { timeScale: 1, duration: 1 });
      }
    },
    onThrowComplete() {
      gsap.to(spin, { timeScale: 1, duration: 1 });
    },
  });

  function updateRotation() {
    let p = startProgress + (this.startX - this.x) / dragDistancePerRotation;
    spin.progress(progressWrap(p));
  }
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(var(--vh) * 100);
  background: black;
  overflow: hidden;
  .wrapper {
    width: 680px;
    height: 400px;
    -webkit-font-smoothing: antialiased;
    margin: 50px auto;
    perspective: 1100px;
    margin-bottom: 200px;
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
img {
  position: relative;
  object-fit: cover;
  height: 80%;
}
</style>
