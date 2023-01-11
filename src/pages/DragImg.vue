<template>
  <div class="container">
    <div class="empty">
      <div
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        ref="imgRef"
        class="fill"
        :style="onDragging ? { opacity: 0 } : ''"
        draggable="true"
      />
    </div>
    <div class="empty" />
    <div class="empty" />
    <div class="empty" />
    <div class="empty" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const imgRef = ref();
const onDragging = ref(false);

function onDragStart() {
  setTimeout(() => {
    onDragging.value = true;
  }, 0);
}
function onDragEnd() {
  onDragging.value = false;
}
function onDragOver(e) {
  e.preventDefault();
}
function onDragEnter(e) {
  e.preventDefault();
  this.className += " hovered";
}
function onDragLeave() {
  this.className = "empty";
}
function onDragDrop() {
  this.className = "empty";
  this.append(imgRef.value);
}
onMounted(() => {
  const empties = document.querySelectorAll(".empty");

  for (const empty of empties) {
    empty.addEventListener("dragover", onDragOver);
    empty.addEventListener("dragenter", onDragEnter);
    empty.addEventListener("dragleave", onDragLeave);
    empty.addEventListener("drop", onDragDrop);
  }
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: darksalmon;
}
.empty {
  display: inline-block;
  width: 160px;
  height: 160px;
  margin: 10px;
  background: white;
  border: 3px solid salmon;
  box-sizing: content-box;
}
.fill {
  position: relative;
  top: 5px;
  left: 5px;
  width: 150px;
  height: 150px;
  background: url("https://source.unsplash.com/random/150x150");
  cursor: pointer;
}

.hold {
  border: solid 5px #ccc;
}

.hovered {
  background: #f4f4f4;
  border-style: dashed;
}
</style>
