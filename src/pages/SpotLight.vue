<template>
  <div class="container">
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import * as THREE from "three";

const canvasRef = ref();
const ctx = ref();

// animate
// function animate() {
//   onAnimate.value = requestAnimationFrame(animate);
//   renderer.render(scene, camera);
//   //   camera.lookAt(scene.position);
//   camera.updateMatrixWorld();

//   // find intersections
//   raycaster.setFromCamera(pointer, camera);
//   const intersects = raycaster.intersectObjects(scene.children, false);

//   if (intersects.length > 0) {
//     if (intersected.value != intersects[0].object) {
//       if (intersected.value) {
//         intersected.value.material.emissive.setHex(
//           intersected.value.currentHex
//         );
//       }
//       intersected.value = intersects[0].object;
//       intersected.value.currentHex =
//         intersected.value.material.emissive.getHex();
//       intersected.value.material.emissive.setHex(0x0000ff);
//     }
//   } else {
//     if (intersected.value) {
//       intersected.value.material.emissive.setHex(intersected.value.currentHex);
//     }
//     intersected.value = null;
//   }
// }

onMounted(() => {
  ctx.value = canvasRef.value.getContext("2d", { willReadFrequently: true });
});

// function onResize() {
//   camera.aspect = canvasRef.value.offsetWidth / canvasRef.value.offsetHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(canvasRef.value.offsetWidth, canvasRef.value.offsetHeight);
// }
// function onPointerMove(e) {
//   pointer.x = (e.offsetX / canvasRef.value.offsetWidth) * 2 - 1;
//   pointer.y = -(e.offsetY / canvasRef.value.offsetHeight) * 2 + 1;
// }
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: calc(var(--vh) * 100);
  overflow: hidden;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
