<template>
  <div class="mask" @click="close"></div>
</template>

<script>
export default {
  name: 'CommonMask',
  setup(props, context) {
    function close() {
      context.emit('closePop')
    }
    return { close }
  },
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
