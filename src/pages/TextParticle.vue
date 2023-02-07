<template>
  <div class="container">
    <div class="scrollEl" ref="scrollEl" />
    <div class="svgWrapper">
      <Squiggly />
      <!-- svgomg을 거치면 순서대로 -->
      <!-- lost boy -->
      <!-- <svg class="goTrip" viewBox="0 0 229 39">
        <path
          d="M25.8518.265991V38.276h3.528V.265991h-3.528ZM28.4138 15.68v2.898h7.014V15.68h-7.014ZM16.1498 4.38199v.546c0 10.03801-5.25 18.14401-15.749959 23.47801l1.931999 2.688C14.5958 24.92 19.5518 15.176 19.5518 4.38199h-3.402Zm-13.98596 0v2.856H17.9558v-2.856H2.16384ZM67.0506 15.428v2.94h7.014v-2.94h-7.014ZM64.4886.265991V38.276h3.528V.265991h-3.528ZM40.2966 4.00399V27.524h3.486V4.00399h-3.486Zm0 21.71401v2.94h3.024c5.754 0 11.592-.378 18.06-1.722l-.42-2.898c-6.258 1.302-12.012 1.68-17.64 1.68h-3.024ZM103.125.265991V38.318h3.528V.265991h-3.528ZM105.813 15.26v2.94h7.056v-2.94h-7.056ZM79.0593 25.928v2.94h2.982c7.14 0 12.138-.21 17.9757-1.302l-.3777-2.94c-5.67 1.05-10.584 1.302-17.598 1.302h-2.982Zm0-21.96601V27.23h3.444V6.81799h14.196v-2.856h-17.64ZM141.804.265991V38.318h3.486V.265991h-3.486ZM144.45 15.386v2.94h7.056v-2.94h-7.056Zm-26.838 10.878v2.898h3.024c7.266 0 12.306-.294 18.228-1.344l-.378-2.898c-5.754 1.092-10.71 1.344-17.85 1.344h-3.024Zm-.084-22.42801v2.856h13.734V14.588h-13.65V27.44h3.444v-9.996h13.65V3.83599h-17.178Zm38.679.252V28.658h17.43V4.08799h-17.43Zm14.028 2.814V25.844h-10.626V6.90199h10.626ZM180.399.307991V38.276h3.528V.307991h-3.528ZM183.087 15.47v2.94h7.056v-2.94h-7.056ZM219.035.307991V38.276h3.528V.307991h-3.528ZM221.723 15.218V18.2h7.056v-2.982h-7.056Zm-26.88-11.71801V29.162h17.724V3.49999h-3.444V13.538h-10.836V3.49999h-3.444ZM198.287 16.31h10.836v9.996h-10.836V16.31Z"
          fill="black"
        />
        <g ref="group" />
      </svg> -->

      <svg class="goTrip" viewBox="0 0 229 39">
        <path
          d="M25.8518 0.265991V38.276H29.3798V0.265991H25.8518ZM28.4138 15.68V18.578H35.4278V15.68H28.4138ZM16.1498 4.38199V4.92799C16.1498 14.966 10.8998 23.072 0.399841 28.406L2.33184 31.094C14.5958 24.92 19.5518 15.176 19.5518 4.38199H16.1498ZM2.16384 4.38199V7.23799H17.9558V4.38199H2.16384Z"
          fill="black"
        />
        <path
          d="M67.0506 15.428V18.368H74.0646V15.428H67.0506ZM64.4886 0.265991V38.276H68.0166V0.265991H64.4886ZM40.2966 4.00399V27.524H43.7826V4.00399H40.2966ZM40.2966 25.718V28.658H43.3206C49.0746 28.658 54.9126 28.28 61.3806 26.936L60.9606 24.038C54.7026 25.34 48.9486 25.718 43.3206 25.718H40.2966Z"
          fill="black"
        />
        <path
          d="M103.125 0.265991V38.318H106.653V0.265991H103.125ZM105.813 15.26V18.2H112.869V15.26H105.813ZM79.0593 25.928V28.868H82.0413C89.1813 28.868 94.1793 28.658 100.017 27.566L99.6393 24.626C93.9693 25.676 89.0553 25.928 82.0413 25.928H79.0593ZM79.0593 3.96199V27.23H82.5033V6.81799H96.6993V3.96199H79.0593Z"
          fill="black"
        />
        <path
          d="M141.804 0.265991V38.318H145.29V0.265991H141.804ZM144.45 15.386V18.326H151.506V15.386H144.45ZM117.612 26.264V29.162H120.636C127.902 29.162 132.942 28.868 138.864 27.818L138.486 24.92C132.732 26.012 127.776 26.264 120.636 26.264H117.612ZM117.528 3.83599V6.69199H131.262V14.588H117.612V27.44H121.056V17.444H134.706V3.83599H117.528Z"
          fill="black"
        />
        <path
          d="M156.207 4.08799V28.658H173.637V4.08799H156.207ZM170.235 6.90199V25.844H159.609V6.90199H170.235ZM180.399 0.307991V38.276H183.927V0.307991H180.399ZM183.087 15.47V18.41H190.143V15.47H183.087Z"
          fill="black"
        />
        <path
          d="M219.035 0.307991V38.276H222.563V0.307991H219.035ZM221.723 15.218V18.2H228.779V15.218H221.723ZM194.843 3.49999V29.162H212.567V3.49999H209.123V13.538H198.287V3.49999H194.843ZM198.287 16.31H209.123V26.306H198.287V16.31Z"
          fill="black"
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
