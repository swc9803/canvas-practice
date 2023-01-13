<template>
  <div class="container">
    <div class="imgWrapper">
      <div ref="imgRef" class="showImg" />
    </div>
    <img
      id="knob"
      src="https://greensock.com/wp-content/uploads/custom/draggable/img/knob.png"
      width="410"
      height="410"
    />
    <p>
      {{ rotationValue }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const rotationValue = ref(100); // 초기 translate, ref값, 빼지는 값 동일하게
const imgRef = ref();

onMounted(() => {
  Draggable.create("#knob", {
    type: "rotation",
    bounds: { minRotation: 0, maxRotation: 1000 },
    onDrag: function () {
      rotationValue.value = 100 - this.rotation / 10;
      imgRef.value.style.transform = `translate(0, ${rotationValue.value}%)`;
    },
  });
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: skyblue;
  .imgWrapper {
    position: relative;
    width: 100%;
    height: 50%;
    overflow: hidden;
    .showImg {
      position: absolute;
      transform: translate(0, 100%);
      width: 50%;
      height: 100%;
      background-image: url("~@/assets/gom.png");
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  #knob {
    position: relative;
    width: 50vw;
    height: 50vw;
    margin-top: 10px;
  }
  p {
    position: absolute;
  }
}
</style>
