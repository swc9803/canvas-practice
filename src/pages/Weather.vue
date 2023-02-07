<template>
  <div class="scrollElement" />
  <Scroll class="svg" />
  <Spring />
  <Summer />
  <Fall />
  <Winter />
</template>

<script setup>
import Scroll from "@/components/weather/Scroll";
import Spring from "@/components/weather/spring/Spring";
import Summer from "@/components/weather/summer/Summer";
import Fall from "@/components/weather/fall/Fall";
import Winter from "@/components/weather/winter/Winter";
</script>

<style scoped>
.svg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.scrollElement {
  position: absolute;
  top: 0;
  height: 1600%;
  width: 100px;
  opacity: 0;
}
</style>
