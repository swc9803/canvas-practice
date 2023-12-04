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
  { name: "audio" },
  { name: "cursor" },
  { name: "cell" },
  { name: "link" },
  { name: "liquid" },
  { name: "particletext" },
  { name: "pattern" },
  { name: "physic" },
  { name: "slime" },
  { name: "star" },
  { name: "trackeyes" },
  { name: "collision" },
  { name: "galaga" },
  { name: "imgcolor" },
  { name: "input" },
  { name: "intro" },
  { name: "movingstar" },
  { name: "raindraw" },
  { name: "scrollplay" },
  { name: "svgwave" },
  { name: "textparticle" },
  { name: "tree" },
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
