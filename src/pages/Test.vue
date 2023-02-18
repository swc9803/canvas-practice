<template>
  <div class="container">
    <div class="sun"></div>
    <div class="moon"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 128px);
  overflow: hidden;
  .sun {
    position: absolute;
    width: 20vh;
    height: 20vh;
    background: orange;
    border-radius: 100px;
  }
  .moon {
    position: absolute;
    width: 20vh;
    height: 20vh;
    border-radius: 50%;
    box-shadow: inset 20px -20px #eccc68;
  }
}
</style>
