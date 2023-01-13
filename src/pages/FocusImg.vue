<template>
  <div class="container">
    <div class="focus">
      <img src="@/assets/gom.png" alt="img" />
    </div>
    <div class="boxWrapper">
      <div class="box" />
      <div class="box" />
      <div class="box" />
      <div class="box" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
onMounted(() => {});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: salmon;
  .focus {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 50%;
    img {
      width: 100%;
      min-width: 400px;
      vertical-align: bottom;
    }
  }
  .boxWrapper {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 50vw;
    height: 12.5vw;
    min-width: 400px;
    background: black;
    display: flex;
    cursor: pointer;
    .box {
      width: 25%;
      height: 100%;
      &:nth-child(1) {
        background: yellow;
      }
      &:nth-child(2) {
        background: blue;
      }
      &:nth-child(3) {
        background: green;
      }
      &:nth-child(4) {
        background: red;
      }
    }
  }
}
</style>
