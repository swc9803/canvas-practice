<template>
  <div class="container">
    <router-link to="/">Home</router-link>
    <router-link v-for="route in routes" :key="route.id" :to="route.name">
      {{ route.name }}
    </router-link>
  </div>
</template>

<script setup>
const routes = [
  {
    name: "tree",
  },
  {
    name: "cybergallery",
  },
  {
    name: "imgcolor",
  },
];
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: black;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  a {
    color: rgb(223, 245, 255);
  }
}
</style>
