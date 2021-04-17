<template>
  <div class="search">
    <span>快速查询:</span>
    <input type="text" :placeholder="value" v-model.lazy="key" />
    <button @click="searchKey">查询</button>
    <button class="add" @click="add">新增项目类型</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import bus from '@/bus/bus'
export default {
  name: 'TypeSearch',
  setup(props, context) {
    const store = useStore()
    const value = ref('请输入项目类型')
    const { key, searchKey } = searchMethods()
    // 新增数据
    function add() {
      context.emit('pop', -1)
      store.state.title = '新增项目类型'
    }

    return { value, key, add, searchKey }
  }
}
function searchMethods() {
  const key = ref('')
  // 查询
  function searchKey() {
    bus.emit('search', key.value)
  }
  return { key, searchKey }
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
    input();
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