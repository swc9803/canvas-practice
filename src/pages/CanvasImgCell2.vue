<template>
  <div class="container">
    <div class="wrapper">
      <canvas ref="canvasRef" />
      <img ref="imgRef" src="/lotteria.webp" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const canvasRef = ref();
const imgRef = ref();
let ctx;

onMounted(() => {
  window.addEventListener("load", () => {
    ctx = canvasRef.value.getContext("2d");

    class Particle {
      constructor(effect, x, y, color) {
        this.effect = effect;
        this.x = this.originX = x;
        this.y = this.originY = y;
        this.size = 2;
        this.color = color;
        this.dx = 0;
        this.dy = 0;
        this.vx = 0;
        this.vy = 0;
        this.force = 0;
        this.angle = 0;
        this.distance = 0;
        this.friction = 0.98;
        this.ease = 0.2;
      }
      update() {
        this.dx = this.effect.mouse.x - this.x;
        this.dy = this.effect.mouse.y - this.y;
        this.distance = this.dx * this.dx + this.dy * this.dy;
        this.force = -this.effect.mouse.radius / this.distance;
        if (this.distance < this.effect.mouse.radius) {
          this.angle = Math.atan2(this.dy, this.dx);
          this.vx += this.force * Math.cos(this.angle);
          this.vy += this.force * Math.sin(this.angle);
        }
        this.x +=
          (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
        this.y +=
          (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
      }
    }

    class Effect {
      constructor(width, height) {
        this.width = width;
        this.height = height;
        this.image = imgRef.value;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.x = this.centerX - this.image.width / 2;
        this.y = this.centerY - this.image.height / 2;
        this.particles = [];
        this.gap = 2;
        this.mouse = {
          radius: 200,
          x: undefined,
          y: undefined,
        };
        window.addEventListener("mousemove", (e) => {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
        });

        window.addEventListener(
          "touchstart",
          (e) => {
            this.mouse.x = e.changedTouches[0].clientX;
            this.mouse.y = e.changedTouches[0].clientY;
          },
          false
        );

        window.addEventListener(
          "touchmove",
          (e) => {
            e.preventDefault();
            this.mouse.x = e.targetTouches[0].clientX;
            this.mouse.y = e.targetTouches[0].clientY;
          },
          false
        );

        window.addEventListener(
          "touchend",
          (e) => {
            e.preventDefault();
            this.mouse.x = 0;
            this.mouse.y = 0;
          },
          false
        );
        window.addEventListener("mouseleave", () => {
          this.mouse.x = undefined;
          this.mouse.y = undefined;
        });
      }
      init(context) {
        const aspectRatio = this.image.width / this.image.height;
        let newWidth = this.width;
        let newHeight = this.width / aspectRatio;

        if (newHeight > this.height) {
          newHeight = this.height;
          newWidth = this.height * aspectRatio;
        }

        this.x = (this.width - newWidth) / 2;
        this.y = (this.height - newHeight) / 2;

        context.drawImage(this.image, this.x, this.y, newWidth, newHeight);
        var pixels = context.getImageData(0, 0, this.width, this.height).data;
        var index;
        for (var y = 0; y < this.height; y += this.gap) {
          for (var x = 0; x < this.width; x += this.gap) {
            index = (y * this.width + x) * 4;
            const red = pixels[index];
            const green = pixels[index + 1];
            const blue = pixels[index + 2];
            const color = `rgb(${red}, ${green}, ${blue})`;

            const alpha = pixels[index + 3];
            if (alpha > 0) {
              this.particles.push(new Particle(this, x, y, color));
            }
          }
        }
        context.clearRect(0, 0, this.width, this.height);
      }
      update() {
        for (var i = 0; i < this.particles.length; i++) {
          this.particles[i].update();
        }
      }
      render(context) {
        context.clearRect(0, 0, this.width, this.height);
        for (var i = 0; i < this.particles.length; i++) {
          var p = this.particles[i];
          context.fillStyle = p.color;
          context.fillRect(p.x, p.y, p.size, p.size);
        }
      }
    }

    const effect = new Effect(canvasRef.value.width, canvasRef.value.height);
    effect.init(ctx);

    const animate = () => {
      effect.update();
      effect.render(ctx);
      requestAnimationFrame(animate);
    };
    animate();
  });
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .wrapper {
    position: relative;
    width: 400px;
    height: 225px;
    canvas {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    img {
      display: none;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
