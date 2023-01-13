<template>
  <div class="container">
    <div ref="imgWrapperRef" class="wrapper">
      <div class="before">
        <img
          class="content-image"
          src="https://farm2.staticflickr.com/1638/26145024230_06acd55d1b_b.jpg"
        />
      </div>
      <div ref="afterRef" class="after">
        <img
          class="content-image"
          src="https://farm2.staticflickr.com/1663/25814974803_d4c55ff708_b.jpg"
        />
      </div>
      <div ref="scrollerRef" class="scroller">
        <svg
          class="scrollerSvg"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const imgWrapperRef = ref();
const scrollerRef = ref();
const afterRef = ref();

const onActive = ref(false);

onMounted(() => {
  // First we'll have to set up our event listeners
  // We want to watch for clicks on our scroller
  scrollerRef.value.addEventListener("mousedown", function () {
    onActive.value = true;
    // Add our scrolling class so the scroller has full opacity while active
    scrollerRef.value.classList.add("scrolling");
  });
  // We also want to watch the body for changes to the state,
  // like moving around and releasing the click
  // so let's set up our event listeners
  document.body.addEventListener("mouseup", function () {
    onActive.value = false;
    scrollerRef.value.classList.remove("scrolling");
  });
  document.body.addEventListener("mouseleave", function () {
    onActive.value = false;
    scrollerRef.value.classList.remove("scrolling");
  });

  // Let's figure out where their mouse is at
  document.body.addEventListener("mousemove", function (e) {
    if (!onActive.value) return;
    // Their mouse is here...
    let x = e.pageX;
    // but we want it relative to our wrapper
    x -= imgWrapperRef.value.getBoundingClientRect().left;
    // Okay let's change our state
    scrollIt(x);
  });

  // Let's use this function
  function scrollIt(x) {
    let transform = Math.max(0, Math.min(x, imgWrapperRef.value.offsetWidth));
    afterRef.value.style.width = transform + "px";
    scrollerRef.value.style.left = transform - 25 + "px";
  }

  // Let's set our opening state based off the width,
  // we want to show a bit of both images so the user can see what's going on
  scrollIt(150);

  // And finally let's repeat the process for touch events
  // first our middle scroller...
  scrollerRef.value.addEventListener("touchstart", function () {
    onActive.value = true;
    scrollerRef.value.classList.add("scrolling");
  });
  document.body.addEventListener("touchend", function () {
    onActive.value = false;
    scrollerRef.value.classList.remove("scrolling");
  });
  document.body.addEventListener("touchcancel", function () {
    onActive.value = false;
    scrollerRef.value.classList.remove("scrolling");
  });
});
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  left: 50%;
  top: 50%;
  width: 900px;
  height: 600px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
}

/* Our image information */
.before,
.after {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-color: white;
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
}

.after {
  width: 125px;
}

.content-image {
  height: 100%;
}
.scroller {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 100px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: transparent;
  opacity: 0.9;
  pointer-events: auto;
  cursor: pointer;
  border: 5px solid #fff;
}

.scroller::before,
.scroller::after {
  content: " ";
  display: block;
  width: 7px;
  height: 9999px;
  position: absolute;
  left: 50%;
  margin-left: -3.5px;
  z-index: 30;
  transition: 0.1s;
  background: #fff;
}
.scroller::before {
  top: 100%;
}
.scroller::after {
  bottom: 100%;
}

.scroller:hover {
  opacity: 1;
}

.scrolling {
  pointer-events: none;
  opacity: 1;
}

.scrollerSvg {
  width: 100%;
  height: 100%;
  padding: 5px;
}
</style>
