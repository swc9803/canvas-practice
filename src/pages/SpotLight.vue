<template>
  <div>
    <div v-show="loading">loading</div>
    <div v-show="!loading" ref="containerRef" class="container" />
    <!-- 버튼 누르면 카메라 z--, animation -->
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import gsap from "gsap";

const containerRef = ref();
const loading = ref(false);
let camera;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setClearColor(0x000000);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/"
);
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// 바닥
const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
const floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.receiveShadow = true;
floor.rotation.x = Math.PI / 2;
floor.position.set(0, -1, 0);
scene.add(floor);

const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 10;
plane.position.set(0, -1, -0.1);
scene.add(plane);

const light1 = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 15, 1);
light1.castShadow = true;
light1.position.set(-1.1, 3, 0);
light1.target.position.set(-0.5, 0, 0);
scene.add(light1);
scene.add(light1.target);
const light2 = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 15, 1);
light2.castShadow = true;
light2.position.set(1.1, 3, 0);
light2.target.position.set(0.5, 0, 0);
scene.add(light2);
scene.add(light2.target);

gltfLoader.load("/gob.gltf", (model) => {
  model.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  model.scene.position.set(-1, -1, 0);
  scene.add(model.scene);
});
gltfLoader.load("/gob.gltf", (model) => {
  model.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  model.scene.position.set(0, -1, 0);
  scene.add(model.scene);
  camera.lookAt(model.scene.position);
});
gltfLoader.load("/gob.gltf", (model) => {
  model.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  model.scene.position.set(1, -1, 0);
  scene.add(model.scene);
  loading.value = false;
});
function init() {
  loading.value = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(
    containerRef.value.offsetWidth,
    containerRef.value.offsetHeight
  );
  containerRef.value.appendChild(renderer.domElement);
}

let raf;
function animate() {
  raf = requestAnimationFrame(animate);
  camera.updateMatrixWorld();
  renderer.render(scene, camera);
}

let lightRaf;
let angle = 0;
function moveLight() {
  angle += 0.03;
  lightRaf = requestAnimationFrame(moveLight);
  gsap.to(light1.position, {
    x: Math.cos(angle) * 1.5,
    z: Math.sin(angle) * 1.5,
    ease: "none",
  });
  gsap.to(light2.position, {
    x: Math.cos(angle) * -1.5,
    z: Math.sin(angle) * -1.5,
    ease: "none",
  });
}

const onResize = () => {
  camera.aspect =
    containerRef.value.offsetWidth / containerRef.value.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(
    containerRef.value.offsetWidth,
    containerRef.value.offsetHeight
  );
};

onMounted(() => {
  camera = new THREE.PerspectiveCamera(
    75,
    containerRef.value.offsetWidth / containerRef.value.offsetHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.5, 3);

  init();
  animate();
  moveLight();

  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  cancelAnimationFrame(lightRaf);
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(var(--vh) * 100);
}
</style>
