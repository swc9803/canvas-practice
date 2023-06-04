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
  { name: "dragrotation" },
  { name: "comparison" },
  { name: "pattern" },
  { name: "trackeyes" },
  { name: "audio" },
  { name: "matrix" },
  { name: "corner" },
  { name: "spotlight" },
  { name: "doll" },
  { name: "scrollplay" },
  { name: "textparticle" },
  { name: "perspective" },
  { name: "slider" },
  { name: "link" },
  { name: "physic" },
  { name: "test" },
];
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(var(--vh) * 100);
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
