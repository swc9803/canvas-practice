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
  { name: "movingstar" },
  { name: "trackeyes" },
  { name: "audio" },
  { name: "matrix" },
  { name: "scrollplay" },
  { name: "link" },
  { name: "liquid" },
  { name: "physic" },
  { name: "star" },
  { name: "galaga" },
  { name: "cursor" },
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
