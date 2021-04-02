<template>
  <div class="search">
    <span>快速查询:</span>
    <input type="text" :placeholder="value" />
    <button>查询</button>
    <button class="add">新增项目类型</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'TypeSearch',
  setup() {
    const value = ref('请输入项目名称')
    return { value }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.search {
  margin-top: 15px;
  margin-left: 20px;

  span {
    color: #2c3e50;
    font-size: 16px;
    font-weight: 700;
  }

  input {
    margin-left: 8px;
    padding-left: 8px;
    border: 1px solid #c0c4cc;
    border-radius: 4px;
  }

  input:focus {
    border-color: #409eff;
  }

  input::-webkit-input-placeholder {
    color: #c4c4cc;
    font-weight: 700;
  }

  button {
    button();
  }

  button:hover {
    buttonHover();
  }

  .add {
    position: absolute;
    right: 40px;
    margin-right: 20px;
  }
}
</style>