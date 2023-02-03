<template>
  <div>
    <div v-show="loading">loading</div>
    <div v-show="!loading" ref="containerRef" class="container" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
// import gsap from "gsap";

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
scene.add(floor);
floor.rotation.x = Math.PI / 2;
floor.position.set(0, -1, 0);

const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
scene.add(plane);
plane.rotation.x = -Math.PI / 10;
plane.position.set(0, -1, -0.1);

const light1 = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 10, 1);
light1.castShadow = true;
scene.add(light1);
light1.position.set(-1.5, 1.8, 0);
const light2 = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 10, 1);
light2.castShadow = true;
scene.add(light2);
light2.position.set(-1.5, 1.8, -1);

gltfLoader.load("/gob.gltf", (model) => {
  model.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  scene.add(model.scene);
  model.scene.position.set(-1, -1, 0);
});
gltfLoader.load("/gob.gltf", (model) => {
  model.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  scene.add(model.scene);
  model.scene.position.set(0, -1, 0);
});
gltfLoader.load("/gob.gltf", (model) => {
  model.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  scene.add(model.scene);
  model.scene.position.set(1, -1, 0);
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

const onResize = () => {
  camera.aspect =
    containerRef.value.offsetWidth / containerRef.value.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(
    containerRef.value.offsetWidth,
    containerRef.value.offsetHeight
  );
};

// const light1Ani = gsap.timeline();
// const light2Ani = gsap.timeline();

onMounted(() => {
  camera = new THREE.PerspectiveCamera(
    75,
    containerRef.value.offsetWidth / containerRef.value.offsetHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 4);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  //   light1Ani.to(light1.position, {
  //     x: 1.5,
  //     yoyo: true,
  //     repeat: -1,
  //     duration: 2,
  //     ease: "none",
  //   });
  //   light2Ani.to(light2.position, {
  //     x: -1.5,
  //     yoyo: true,
  //     repeat: -1,
  //     duration: 2,
  //     ease: "none",
  //   });

  init();
  animate();

  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(var(--vh) * 100);
}
</style>
