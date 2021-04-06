<template>
  <div class="mask"></div>
</template>

<script>
export default {
  name: 'CommonMask',
  setup() {
  }
}
</script>

<style lang="stylus" scoped>
.mask {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: #171717;
  opacity: 0.5;
}
</style>
