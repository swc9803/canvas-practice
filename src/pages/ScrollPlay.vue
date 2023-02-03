<template>
  <div>
    <div class="videoWrap">
      <div ref="controller" class="controller" />
      <video
        ref="video"
        src="https://assets.codepen.io/39255/output_960.mp4"
        playsinline="true"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const video = ref();
const controller = ref();
const loading = ref(false);

onMounted(() => {
  window.scrollTo(0, 0);
  loading.value = true;

  //  비디오 로딩 후
  video.value.addEventListener("loadedmetadata", () => {
    loading.value = false;
    scrollAnimation.fromTo(
      video.value,
      { currentTime: 0 },
      { currentTime: video.value.duration || 1 }
    );
  });

  //   스크롤 컨트롤
  const scrollAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: controller.value,
      start: "top top",
      scrub: 0.5,
    },
  });
});
</script>

<style lang="scss" scoped>
.videoWrap {
  width: 100%;
  min-height: 500vh;
  video {
    position: sticky;
    top: 0;
    width: 100%;
    pointer-events: none;
  }
}
.controller {
  position: absolute;
  min-height: 500vh;
  overflow: hidden;
}
@media screen and (max-aspect-ratio: 1200 / 800) {
  video {
    height: 100vh;
  }
}
</style>
