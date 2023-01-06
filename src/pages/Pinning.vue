<template>
  <div class="container">
    <section class="section1">
      <p>곰표</p>
    </section>
    <section class="section2">
      <div class="titleWrapper">
        <p class="works">곰표가 하는일</p>
        <div
          v-for="(title, i) in titles"
          :key="title.id"
          :ref="titlesRef"
          class="titles"
        >
          <p class="number">0{{ i + 1 }}</p>
          <p class="title">{{ title.title }}</p>
          <p class="description">{{ title.description }}</p>
        </div>
      </div>
      <div ref="previewRef" class="preview">
        <img
          v-for="img in imgs"
          :key="img.id"
          :ref="slideImgRef"
          class="slideImg"
          :src="img.src"
          alt="img"
        />
      </div>
    </section>
    <div class="background" />
    <section class="section3">
      <p>곰표</p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const previewRef = ref();
const titlesArray = ref([]);
const titlesRef = (el) => titlesArray.value.push(el);
const slideImgArray = ref([]);
const slideImgRef = (el) => slideImgArray.value.push(el);

const titles = [
  { title: "인기 절정의 순간", description: "description" },
  { title: "콜라보 행진을 잠시 멈추고", description: "description" },
  { title: "폰트를 만든 브랜드가 있었습니다.", description: "description" },
  { title: "title", description: "description" },
  { title: "title", description: "description" },
];
const imgs = [
  { src: require("../assets/gom.png") },
  { src: require("../assets/gom.png") },
  { src: require("../assets/gom.png") },
  { src: require("../assets/gom.png") },
  { src: require("../assets/gom.png") },
];

onMounted(() => {
  const horizontalSlideTl = gsap.timeline();
  ScrollTrigger.create({
    animation: horizontalSlideTl,
    trigger: previewRef.value,
    start: "top 50%",
    end: "+=50",
    scrub: 1,
  });
  horizontalSlideTl.from(previewRef.value, {
    transformOrigin: "left",
    scaleX: 0,
  });

  gsap.set(slideImgArray.value[0], {
    x: "-700px",
  });
  gsap.set(slideImgArray.value[1], {
    x: "-700px",
  });
  gsap.set(slideImgArray.value[2], {
    x: "-700px",
  });
  gsap.set(slideImgArray.value[3], {
    x: "-700px",
  });
  gsap.set(slideImgArray.value[4], {
    x: "-700px",
  });
  const slideImgTl1 = gsap.timeline();
  ScrollTrigger.create({
    animation: slideImgTl1,
    trigger: titlesArray.value[0],
    start: "top 40%",
    end: "+=300",
    scrub: 1,
  });
  slideImgTl1.to(slideImgArray.value[0], {
    x: "700px",
  });
  const slideImgTl2 = gsap.timeline();
  ScrollTrigger.create({
    animation: slideImgTl2,
    trigger: titlesArray.value[1],
    start: "top 40%",
    end: "+=300",
    scrub: 1,
  });
  slideImgTl2.to(slideImgArray.value[1], {
    x: "700px",
  });
  const slideImgTl3 = gsap.timeline();
  ScrollTrigger.create({
    animation: slideImgTl3,
    trigger: titlesArray.value[2],
    start: "top 40%",
    end: "+=300",
    scrub: 1,
  });
  slideImgTl3.to(slideImgArray.value[2], {
    x: "700px",
  });
  const slideImgTl4 = gsap.timeline();
  ScrollTrigger.create({
    animation: slideImgTl4,
    trigger: titlesArray.value[3],
    start: "top 40%",
    end: "+=300",
    scrub: 1,
  });
  slideImgTl4.to(slideImgArray.value[3], {
    x: "700px",
  });
  const slideImgTl5 = gsap.timeline();
  ScrollTrigger.create({
    animation: slideImgTl5,
    trigger: titlesArray.value[4],
    start: "top 40%",
    end: "+=300",
    scrub: 1,
  });
  slideImgTl5.to(slideImgArray.value[4], {
    x: "700px",
  });
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: #267544;
  section {
    position: relative;
    width: 100%;
    word-break: keep-all;
  }
  .section1 {
    height: 100%;
    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 3em;
      font-weight: 800;
    }
  }
  .section2 {
    display: flex;
    background: #267544;
    div {
      width: 50%;
    }
    .titleWrapper {
      min-width: 50%;
      .works {
        margin: 0 0 50% 5%;
        color: white;
        font-size: 3em;
        font-weight: 800;
      }
      .titles {
        width: 95%;
        margin: 0 0 100% 5%;
        color: white;
        font-size: 2em;
        font-weight: 800;
        .number {
          font-size: 0.5em;
          margin-bottom: 5%;
        }
        .description {
          margin-top: 5%;
          font-size: 0.6em;
        }
      }
    }
    .preview {
      position: sticky;
      top: 0;
      height: calc(var(--vh, 1vh) * 100);
      background: white;
      color: black;
      overflow: hidden;
      .slideImg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
        border: 1px solid black;
        box-sizing: border-box;
      }
    }
  }
  .background {
    width: 100%;
    height: 60%;
    border: 20px solid black;
    box-sizing: border-box;
    background-image: url("~@/assets/gom.png");
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
  }
  .section3 {
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    background: black;
    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 3em;
      font-weight: 800;
    }
  }
}
</style>
