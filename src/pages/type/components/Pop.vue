<template>
  <div class="box">
    <div class="title">
      {{ data.title }}
      <span class="exit iconfont" @click="close">&#xe7a0;</span>
    </div>
    <div class="name">
      <div class="wrapper">
        <span class="icon">*</span>
        名称:
      </div>
      <input type="text" :placeholder="data.name" v-model="ctx.name" />
    </div>
    <div class="des">
      <div class="wrapper">
        <span class="icon">*</span>
        项目介绍:
      </div>
      <textarea :placeholder="data.des" v-model="ctx.des" />
    </div>
    <button @click.prevent="submit">确认</button>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'TypePop',
  props: {
    handlePop: Number
  },
  setup(props, context) {
    const store = useStore()
    const data = reactive({
      title: computed(() => store.state.typePop.title),
      name: computed(() => store.state.typePop.name),
      des: computed(() => store.state.typePop.des)
    })
    const ctx = reactive({
      name: '',
      des: ''
    })
    function close() {
      context.emit('closePop')
      ctx.name = ''
      ctx.des = ''
    }
    function submit() {
      let newData
      if (ctx.name && ctx.des) {
        newData = {
          id: '000',
          name: ctx.name,
          des: ctx.des
        }
        context.emit('changeData', newData, props.handlePop)
      }
      ctx.name = ''
      ctx.des = ''
      close()
    }
    return { data, ctx, close, submit }
  },
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
  height: 220px;
  padding-top: 16px;
  padding-left: 15px;
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
  }

  .name, .des {
    width: 340px;
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
  }

  .name, .des {
    margin-top: 12px;
  }

  .icon {
    color: #f56c6c;
  }

  button {
    button();
    margin-top: 18px;
    margin-left: 82px;
  }

  button:hover {
    buttonHover();
  }
}
</style>



