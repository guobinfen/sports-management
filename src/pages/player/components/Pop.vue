<template>
  <div class="box">
    <div class="title">
      {{ holder.title }}
      <span class="exit iconfont" @click="close">&#xe7a0;</span>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'PlayerPop',
  props: {
    handlePop: Number
  },
  setup(props, context) {
    const store = useStore()
    // pop的标题以及placeholder
    const holder = reactive({
      title: computed(() => store.state.playerPop.title),
    })
    function close() {
      context.emit('closePop')
    }
    return { holder, close }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.box {
  position: fixed;
  z-index: 2;
  top: 15%;
  left: 50%;
  width: 350px;
  padding-top: 16px;
  padding-left: 15px;
  padding-bottom: 16px;
  background-color: #fff;
  transform: translateX(-50%);

  .title {
    font-weight: 700;

    .exit {
      float: right;
      margin-right: 20px;
      color: #979aa0;
      font-size: 12px;
      cursor: pointer;
    }

    .exit:hover {
      color: #51a7ff;
    }
  }

  .name, .des {
    width: 340px;
    margin-top: 10px;
    line-height: 24px;
    zoom: 1;

    .wrapper {
      float: left;
      width: 80px;
      text-align: right;
    }

    &:after {
      floatClear();
    }

    input {
      float: left;
      height: 24px;
      margin-left: 4px;
      input();
    }

    input:focus {
      border-color: #409eff;
    }

    input::-webkit-input-placeholder {
      color: #c4c4cc;
    }

    textarea::-webkit-input-placeholder {
      color: #c4c4cc;
    }

    textarea {
      width: 160px;
      height: 80px;
      margin-left: 4px;
      input();
    }

    .warnHint {
      border-color: #f56c6c !important;
    }
  }

  .hint {
    margin-left: 90px;
    font-size: 12px;
    color: #f56c6c;
  }

  .icon {
    color: #f56c6c;
  }

  button {
    display: block;
    button();
    margin-top: 12px;
    margin-left: 82px;
  }

  button:hover {
    buttonHover();
  }
}
</style>



