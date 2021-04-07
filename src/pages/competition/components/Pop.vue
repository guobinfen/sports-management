<template>
  <div class="box">
    <div class="title">
      {{ holder.title }}
      <span class="exit iconfont" @click="close">&#xe7a0;</span>
    </div>
    <div class="name">
      <div class="wrapper">
        <span class="icon">*</span>
        名称:
      </div>
      <input
        type="text"
        :placeholder="holder.name"
        :class="{ warnHint: hint.name }"
        v-model.trim="ctx.name"
        @blur="nameBlur"
      />
    </div>
    <span class="hint" v-show="hint.name">输入名称不得为空</span>
    <div class="des">
      <div class="wrapper">
        <span class="icon">*</span>
        项目介绍:
      </div>
      <textarea
        :placeholder="holder.des"
        :class="{ warnHint: hint.des }"
        v-model.trim="ctx.des"
        @blur="desBlur"
      />
    </div>
    <span class="hint" v-show="hint.des">项目介绍不得为空</span>
    <button @click.prevent="submit">确认</button>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'TypePop',
  props: {
    handlePop: Number
  },
  setup(props, context) {
    const store = useStore()
    const { holder, hint, ctx } = base(store)
    const { nameBlur, desBlur } = hintMethods(ctx, hint)
    const { close, submit } = ctxMethods(props, context, ctx, nameBlur, desBlur)
    onMounted(() => {
      hint.name = false
      hint.des = false
    })
    return { holder, ctx, close, submit, nameBlur, hint, desBlur, onMounted }
  },
}
function base(store) {
  // pop的标题以及placeholder
  const holder = reactive({
    title: computed(() => store.state.typePop.title),
    name: computed(() => store.state.typePop.name),
    des: computed(() => store.state.typePop.des)
  })
  // 是否提示输入为空
  const hint = reactive({
    name: false,
    des: false
  })
  // input内容
  const ctx = reactive({
    name: '',
    des: ''
  })
  return { holder, hint, ctx }
}
function ctxMethods(props, context, ctx, nameBlur, desBlur) {
  function close() {
    context.emit('closePop')
    ctx.name = ''
    ctx.des = ''
  }
  function submit() {
    let newData
    nameBlur()
    desBlur()
    if (ctx.name && ctx.des) {
      newData = {
        id: '000',
        name: ctx.name,
        des: ctx.des
      }
      context.emit('changeData', newData, props.handlePop)
      close()
      ctx.name = ''
      ctx.des = ''
    }
  }
  return { close, submit }
}
// 操作提示输入为空
function hintMethods(ctx, hint) {
  function nameBlur() {
    if (!ctx.name) {
      hint.name = true
    } else {
      hint.name = false
    }
  }
  function desBlur() {
    if (!ctx.des) {
      hint.des = true
    } else {
      hint.des = false
    }
  }
  return { nameBlur, desBlur }
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



