<template>
  <img
    width="300"
    height="300"
    src="https://picsum.photos/300/300?random=1"
    alt=""
    class="skewElem"
  />
  <img
    width="300"
    height="300"
    src="https://picsum.photos/300/300?random=2"
    alt=""
    class="skewElem"
  />
  <img
    width="300"
    height="300"
    src="https://picsum.photos/300/300?random=3"
    alt=""
    class="skewElem"
  />
  <img
    width="300"
    height="300"
    src="https://picsum.photos/300/300?random=4"
    alt=""
    class="skewElem"
  />
  <img
    width="300"
    height="300"
    src="https://picsum.photos/300/300?random=1"
    alt=""
    class="skewElem"
  />
  <img
    width="300"
    height="300"
    src="https://picsum.photos/300/300?random=2"
    alt=""
    class="skewElem"
  />
  <img
    width="300"
    height="300"
    src="https://picsum.photos/300/300?random=3"
    alt=""
    class="skewElem"
  />
  <img
    width="300"
    height="300"
    src="https://picsum.photos/300/300?random=4"
    alt=""
    class="skewElem"
  />
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
    clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees.

  ScrollTrigger.create({
    onUpdate: (self) => {
      let skew = clamp(self.getVelocity() / -300);
      // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, {
          skew: 0,
          duration: 0.8,
          ease: "power3",
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew),
        });
      }
    },
  });

  // make the right edge "stick" to the scroll bar. force3D: true improves performance
  gsap.set(".skewElem", { transformOrigin: "right bottom", force3D: true });
});
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  height: 64px;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  .logo {
    margin-right: auto;
    width: 10%;
  }
  nav {
    display: flex;
    flex-wrap: wrap;
    width: 10%;
    .btn {
      width: 10%;
      border: 1px solid black;
      margin-right: 20px;
      margin-bottom: 10px;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    nav {
      flex-direction: column;
      .btn {
        width: 100%;
        margin-right: 0;
      }
    }
  }
}
</style>
