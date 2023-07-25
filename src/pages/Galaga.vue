<template>
  <div class="container">
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const canvasRef = ref();
let canvas;
let ctx;

class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 100;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height;
    this.speed = 5;
  }
  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    if (this.game.keys.indexOf("ArrowLeft") > -1) this.x -= this.speed; // && a
    if (this.game.keys.indexOf("ArrowRight") > -1) this.x += this.speed; // && d

    // canvas 범위 이탈 방지
    // if (this.x < 0) this.x = 0;
    // else if (this.x > this.game.width - this.width) {
    //   this.x = this.game.width - this.width;
    // }
    if (this.x < -this.width * 0.5) this.x = -this.width * 0.5;
    else if (this.x > this.game.width - this.width * 0.5) {
      this.x = this.game.width - this.width * 0.5;
    }
  }
  shoot() {
    const projectile = this.game.getProjectile();
    if (projectile) {
      projectile.start(this.x + this.width * 0.5, this.y);
    }
  }
}

class Projectile {
  constructor() {
    this.width = 8;
    this.height = 40;
    this.x = 0;
    this.y = 0;
    this.speed = 10;
    this.free = true;
  }
  draw(context) {
    if (!this.free) {
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  update() {
    if (!this.free) {
      this.y -= this.speed;
      if (this.y < 0 - this.height) {
        this.reset();
      }
    }
  }
  start(x, y) {
    this.x = x - this.width + 0.5;
    this.y = y;
    this.free = false;
  }
  reset() {
    this.free = true;
  }
}

// class Enemy {}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = [];
    this.player = new Player(this);

    this.projectilesPool = [];
    this.numberOfProjectiles = 10;
    this.createProjectiles();

    window.addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
      if (e.key === "1") this.player.shoot();
    });
    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);
      if (index > -1) this.keys.splice(index, 1);
    });
  }
  render(context) {
    this.player.draw(context);
    this.player.update();
    this.projectilesPool.forEach((projectile) => {
      projectile.update();
      projectile.draw(context);
    });
  }
  createProjectiles() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilesPool.push(new Projectile());
    }
  }
  getProjectile() {
    for (let i = 0; i < this.projectilesPool.length; i++) {
      if (this.projectilesPool[i].free) {
        return this.projectilesPool[i];
      }
    }
  }
}

onMounted(() => {
  canvas = canvasRef.value;
  ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 800;

  const game = new Game(canvas);
  game.render(ctx);

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    requestAnimationFrame(animate);
  };
  animate();
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px black solid;
  }
}
</style>
