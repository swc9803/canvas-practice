<template>
  <div class="container">
    <div class="scrollEl" ref="scrollEl" />
    <div class="svgWrapper">
      <Squiggly />
      <!-- svgomg을 거치면 순서대로 -->
      <!-- lost boy -->
      <svg
        class="goTrip"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 221 81"
      >
        <path
          fill="#000"
          d="M42.392 26v28.96h2.688V26h-2.688Zm1.952 11.744v2.208h5.344v-2.208h-5.344ZM35 29.136v.416c0 7.648-4 13.824-12 17.888l1.472 2.048c9.344-4.704 13.12-12.128 13.12-20.352H35Zm-10.656 0v2.176h12.032v-2.176H24.344ZM73.7815 37.552v2.24h5.344v-2.24h-5.344ZM71.8295 26v28.96h2.688V26h-2.688Zm-18.432 2.848v17.92h2.656v-17.92h-2.656Zm0 16.544v2.24h2.304c4.384 0 8.832-.288 13.76-1.312l-.32-2.208c-4.768.992-9.152 1.28-13.44 1.28h-2.304ZM101.267 26v28.992h2.688V26h-2.688Zm2.048 11.424v2.24h5.376v-2.24h-5.376Zm-20.384 8.128v2.24h2.272c5.44 0 9.248-.16 13.696-.992l-.288-2.24c-4.32.8-8.064.992-13.408.992h-2.272Zm0-16.736v17.728h2.624V30.992h10.816v-2.176h-13.44ZM130.737 26v28.992h2.656V26h-2.656Zm2.016 11.52v2.24h5.376v-2.24h-5.376Zm-20.449 8.288v2.208h2.304c5.536 0 9.376-.224 13.888-1.024l-.287-2.208c-4.384.832-8.161 1.024-13.601 1.024h-2.304Zm-.063-17.088v2.176h10.463v6.016h-10.4v9.792h2.624v-7.616h10.4V28.72h-13.087ZM141.71 28.912v18.72h13.28v-18.72h-13.28Zm10.688 2.144v14.432h-8.096V31.056h8.096Zm7.744-5.024V54.96h2.688V26.032h-2.688Zm2.048 11.552v2.24h5.376v-2.24h-5.376ZM189.579 26.032V54.96h2.689V26.032h-2.689Zm2.049 11.36v2.272h5.376v-2.272h-5.376Zm-20.48-8.928v19.552h13.504V28.464h-2.625v7.648h-8.256v-7.648h-2.623Zm2.623 9.76h8.256v7.616h-8.256v-7.616Z"
        />
        <g ref="group" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Squiggly from "@/components/Squiggly";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scrollEl = ref();
const group = ref();
let delay = 0;

onMounted(() => {
  const items = document.querySelectorAll(".goTrip > path");
  const sceneryTextAni = gsap.timeline();
  ScrollTrigger.create({
    animation: sceneryTextAni,
    trigger: scrollEl.value,
    start: "20% top",
    end: "80% 100%",
    scrub: 3,
    markers: true,
  });
  items.forEach((item) => {
    const length = item.getTotalLength();
    for (let i = 0; i < length; i++) {
      const pointLength = Math.random() * length;
      const point = item.getPointAtLength(pointLength);
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", point.x);
      circle.setAttribute("cy", point.y);
      circle.setAttribute("r", Math.random() * 3 + 1);
      group.value.appendChild(circle);
      sceneryTextAni.to(
        circle,
        {
          cx: point.x + (Math.random() - 0.5) * 50,
          cy: point.y + (Math.random() - 0.5) * 50,
          opacity: 0,
          delay: (delay + pointLength) * 0.001,
        },
        0
      );
    }
  });
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.scrollEl {
  position: absolute;
  top: 0;
  width: 0;
  height: 200vh;
  opacity: 0;
}
.svgWrapper {
  position: fixed;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .goTrip {
    position: relative;
    width: 100%;
    animation: squiggly 0.3s linear infinite;
    path {
      opacity: 0;
    }
  }
}
@keyframes squiggly {
  0% {
    filter: url("#squiggly1");
  }
  25% {
    filter: url("#squiggly2");
  }
  50% {
    filter: url("#squiggly3");
  }
  75% {
    filter: url("#squiggly4");
  }
  100% {
    filter: url("#squiggly5");
  }
}
</style>
