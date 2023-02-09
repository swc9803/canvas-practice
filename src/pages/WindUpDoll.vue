<template>
  <div class="container">
    <div class="screen"></div>
    <div class="footer">
      <svg
        class="speed"
        viewBox="0 0 82 82"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="41" cy="41" r="41" fill="#4A4A4A" />
        <path
          ref="handRef"
          class="hand"
          d="M31.2871 46.0643 7.23556 58.3432 30.816 45.1822 40.5189 40l.4711.8821-9.7029 5.1822Z"
          fill="#FA4F4F"
        />
        <circle cx="41" cy="41" r="4" fill="#3A3A3A" />
      </svg>
      <div class="spring">
        <div ref="springRef" class="drag" />
        <img class="static" src="@/assets/static.png" />
        <img ref="rotateRef" class="rotate" src="@/assets/rotate.png" />
      </div>
      <div class="welcome">github{{ rotationValue }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const handRef = ref();
const springRef = ref();
const rotateRef = ref();

let draggableTrigger;
let dragAnimation;
let newRotation;
const rotationValue = ref(); // let으로 바꾸기

function animate() {
  handRef.value.style.transform = `rotate(${rotationValue.value}deg)`;
  rotateRef.value.style.transform = `rotate(${rotationValue.value * 7.5}deg)`;
  if (rotationValue.value > 0) {
    rotationValue.value -= 0.1;
  } else {
    rotationValue.value = 0;
  }
  dragAnimation = requestAnimationFrame(animate);
}

onMounted(() => {
  animate();
  draggableTrigger = Draggable.create(springRef.value, {
    type: "rotation",
    // bounds: { minRotation: 0, maxRotation: 10000 },
    onDrag: function () {
      if (this.rotation >= newRotation && rotationValue.value <= 240) {
        rotationValue.value++;
      } else if (rotationValue.value != 0) {
        rotationValue.value--;
      }
      newRotation = this.rotation;
    },
  });
});

onBeforeUnmount(() => {
  draggableTrigger.forEach((trigger) => trigger.kill());
  cancelAnimationFrame(dragAnimation);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(var(--vh) * 100);
  background: rgb(255, 216, 139);
  overflow: hidden;
  .screen {
    height: calc(var(--vh) * 60);
  }
  .footer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: calc(var(--vh) * 40);
    background: rgb(255, 255, 255);
    .speed {
      width: 30%;
    }
    .spring {
      position: relative;
      width: 30%;
      border-radius: 50%;
      transform-origin: center center;
      .drag {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .static {
        position: absolute;
        width: 100%;
        pointer-events: none;
        z-index: 1;
      }
      .rotate {
        position: relative;
        width: 100%;
        pointer-events: none;
      }
    }
    .welcome {
      width: 30%;
      height: 100%;
      @media (width <= 768px) {
        & {
          display: none;
        }
      }
    }
  }
}
.hand {
  transform-origin: center center;
}
</style>
