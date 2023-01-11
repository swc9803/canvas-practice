<template>
  <div class="container">
    <div class="routerWrapper">
      <router-link to="/">Home</router-link>
      <router-link v-for="route in routes" :key="route.id" :to="route.name">
        {{ route.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
const routes = [
  { name: "tree" },
  { name: "imgcolor" },
  { name: "input" },
  { name: "pinning" },
  { name: "raindraw" },
  { name: "particletext" },
  { name: "slime" },
  { name: "scrollskew" },
  { name: "glitch" },
  { name: "svgwave" },
  { name: "movingstar" },
  { name: "collision" },
];
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: black;
  .routerWrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    a {
      color: rgb(223, 245, 255);
    }
  }
}
</style>
