<template>
  <div
    @mouseup="onActive = false"
    @mouseleave="onActive = false"
    @touchcancel="onActive = false"
    @touchend="onActive = false"
    @mousemove="onMouseMove"
    @touchmove="onTouchMove"
    ref="containerRef"
    class="container"
  >
    <div class="before">
      <img
        src="https://farm2.staticflickr.com/1638/26145024230_06acd55d1b_b.jpg"
      />
    </div>
    <div ref="afterRef" class="after">
      <img
        src="https://farm2.staticflickr.com/1663/25814974803_d4c55ff708_b.jpg"
      />
    </div>
    <div
      @mousedown="onActive = true"
      @touchstart="onActive = true"
      ref="scrollerRef"
      class="scroller"
      :class="onActive ? 'scrolling' : ''"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <polygon points="0 50 37 68 37 32 0 50" fill="#ffffff" />
        <polygon points="100 50 64 32 64 68 100 50" fill="#ffffff" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const containerRef = ref();
const scrollerRef = ref();
const afterRef = ref();

const onActive = ref(false);
const afterSize = ref(0);
const mouseX = ref(0);

const moveScroller = (x) => {
  afterSize.value = Math.max(0, Math.min(x, containerRef.value.offsetWidth));
  afterRef.value.style.width = `${afterSize.value}px`;
  scrollerRef.value.style.left = `${afterSize.value - 25}px`;
};

const onMouseMove = (e) => {
  if (onActive.value) {
    mouseX.value = e.pageX - containerRef.value.getBoundingClientRect().left;
    moveScroller(mouseX.value);
  }
};
const onTouchMove = (e) => {
  if (onActive.value) {
    mouseX.value =
      e.touches[0].pageX - containerRef.value.getBoundingClientRect().left;
    moveScroller(mouseX.value);
  }
};

onMounted(() => {
  moveScroller(containerRef.value.offsetWidth / 2);
});
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  top: 50%;
  left: 50%;
  width: 900px;
  height: 600px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  .before,
  .after {
    //img
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    overflow: hidden;
    pointer-events: none;
    img {
      height: 100%;
      object-fit: cover;
    }
  }
  .scroller {
    svg {
      width: 100%;
      height: 100%;
      padding: 5px;
    }
  }
}

.scroller {
  position: absolute;
  transform: translate3d(0, -50%, 0);
  top: 50%;
  width: 50px;
  height: 50px;
  background: transparent;
  border: 5px solid white;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
  pointer-events: auto;
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    width: 6px;
    height: 100vh;
    margin-left: -3.5px;
    background: white;
  }
  &::before {
    top: 100%;
  }
  &::after {
    bottom: 100%;
  }
  &:hover {
    opacity: 1;
  }
}

.scrolling {
  pointer-events: none;
  opacity: 1;
}
</style>
