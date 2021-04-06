<template>
  <div>
    <div class="box">
      <div class="title">
        提示
        <span class="exit iconfont" @click="cancelDel">&#xe7a0;</span>
      </div>
      <div class="hint">
        <span class="exclamation iconfont">&#xe74f;</span>确定要删除该项目吗？
      </div>
      <button class="cancel" @click="cancelDel">取消</button>
      <button class="confirm" @click="confirmDel">确定</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'Delhint',
  setup(props, context) {
    const store = useStore()
    function cancelDel() {
      context.emit('cancelDel')
    }
    function confirmDel() {
      context.emit('del')
    }
    return { cancelDel, confirmDel }
  },
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.box {
  position: fixed;
  z-index: 2;
  top: 40%;
  left: 50%;
  width: 260px;
  height: 90px;
  padding-top: 12px;
  padding-left: 12px;
  background-color: #fff;
  transform: translateX(-50%);
  border: 1px solid #ccc;

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

  .hint {
    margin-top: 6px;
    color: #606266;

    .exclamation {
      color: #e6a23c;
    }
  }

  .cancel {
    float: right;
    button();
    width: 50px;
    height: 24px;
    margin-top: 16px;
    margin-right: 20px;
    border: 1px solid #dcdfe6;
    font-weight: 400;
    color: #606266;
    background-color: #fff;
    line-height: 16px;
    cursor: pointer;
  }

  .cancel:hover {
    border-color: #c6e2ff;
    color: #409eff;
    background-color: #ecf5ff;
  }

  .confirm {
    float: right;
    button();
    width: 50px;
    height: 24px;
    margin-top: 16px;
    line-height: 16px;
    cursor: pointer;
  }

  .confirm:hover {
    buttonHover();
  }
}
</style>
