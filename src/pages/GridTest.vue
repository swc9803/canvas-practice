<template>
  <div class="container">
    <img
      src="https://picsum.photos/500/500/?random"
      alt="img"
      v-for="item in items"
      :key="item.id"
      :class="item.class"
    />
  </div>
</template>

<script setup>
const items = [
  { id: 1, class: "image1" },
  { id: 2, class: "image2" },
  { id: 3, class: "image3" },
  { id: 4, class: "image4" },
  { id: 5, class: "image5" },
  { id: 6, class: "image6" },
  { id: 7, class: "image7" },
  { id: 8, class: "image8" },
  { id: 9, class: "image9" },
  { id: 10, class: "image10" },
];
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 150px;
  grid-template-areas:
    "a a a"
    "b c c"
    "b d g"
    "e f g";
  gap: 1rem;
  padding: 5rem;
  background: black;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.image1 {
  grid-area: a;
}
.image2 {
  grid-area: b;
}
.image3 {
  grid-area: c;
}
.image4 {
  grid-area: d;
}
.image5 {
  grid-area: e;
}
.image6 {
  grid-area: f;
}
.image7 {
  grid-area: g;
}

// .container {
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   grid-auto-rows: minmax(150px, auto);
//   gap: 10px;
//   .class2 {
//     grid-column: 2 / -2;
//     grid-row: 1 / 3;
//   }
// }
// .color1 {
//   background-color: #d7bee2;
// }
// .color2 {
//   background-color: #a9c7d8;
// }
// .color3 {
//   background-color: #c0df9f;
// }
// .color4 {
//   background-color: #f2e5a6;
// }
// .color5 {
//   background-color: #e89d9d;
// }
</style>
