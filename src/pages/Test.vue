<template>
  <div ref="containerRef" class="container" tabindex="0">
    <div v-for="item in items" :key="item.id" class="item" :class="item.class">
      item{{ item.id }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const containerRef = ref();

const items = [
  { id: 1, class: "color1" },
  { id: 2, class: "color2" },
  { id: 3, class: "color3" },
  { id: 4, class: "color4" },
  { id: 5, class: "color5" },
  { id: 6, class: "color1" },
  { id: 7, class: "color2" },
  { id: 8, class: "color3" },
  { id: 9, class: "color4" },
  { id: 10, class: "color5" },
];

const onkeyDown = (e) => {
  console.log(e);
  console.log("e");
};

onMounted(() => {
  containerRef.value.addEventListener("keydown", onkeyDown);
});
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #181818;
    font-size: 1.2rem;
    font-weight: bold;
  }
}
.color1 {
  background-color: #d7bee2;
}
.color2 {
  background-color: #a9c7d8;
}
.color3 {
  background-color: #c0df9f;
}
.color4 {
  background-color: #f2e5a6;
}
.color5 {
  background-color: #e89d9d;
}
</style>
