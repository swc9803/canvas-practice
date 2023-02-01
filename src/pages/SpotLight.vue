<template>
  <div>
    <div v-show="loading">loading</div>
    <!-- @mousemove="onMouseMove" -->
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
// let mixer
let camera;

// const clock = new THREE.Clock();
// const pointer = new THREE.Vector2();
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

const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
const floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
floor.receiveShadow = true;
floor.position.set(0, -1, 0);
scene.add(floor);

const light = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 10, 1);
light.position.set(0, 1.8, 0);
light.castShadow = true;
scene.add(light);

gltfLoader.load("/gob.gltf", (model) => {
  //   mixer = new THREE.AnimationMixer(model.scene);
  model.scene.position.set(1, -1, 0);
  scene.add(model.scene);
  model.scene.traverse((node) => {
    if (node.isMesh) {
      node.receiveShadow = true;
    }
  });
  //   model.scene.rotation.set(0, Math.PI / -4, 0);
  //   document.addEventListener("click", () => {
  //     action = mixer.clipAction(model.animations[2]);
  //     action.play();
  //   });
  //   gsap.to(model.scene.rotation, { y: 36, duration: 36, ease: "none", repeat: -1 });
});
gltfLoader.load("/gob.gltf", (model) => {
  model.scene.position.set(0, -1, 0);
  scene.add(model.scene);
  model.scene.traverse((node) => {
    if (node.isMesh) {
      node.receiveShadow = true;
    }
  });
});
gltfLoader.load("/gob.gltf", (model) => {
  model.scene.position.set(-1, -1, 0);
  scene.add(model.scene);
  model.scene.traverse((node) => {
    if (node.isMesh) {
      node.receiveShadow = true;
    }
  });
  loading.value = false;
});

// const onMouseMove = (e) => {
//   pointer.x = (e.pagesX / containerRef.value.offsetWidth) * 2 - 1;
//   pointer.y = -(e.pagesY / containerRef.value.offsetHeight) * 2 + 1;
// };

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

  //   let delta = clock.getDelta();
  //   if (mixer) mixer.update(delta);

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

onMounted(() => {
  //   setTimeout(() => {
  //     gsap.to(light.position, {
  //       x: -1.5,
  //     });
  //   }, 2000);
  camera = new THREE.PerspectiveCamera(
    75,
    containerRef.value.offsetWidth / containerRef.value.offsetHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 4);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

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
