<template>
  <div class="container">
    <common-title></common-title>
    <div class="main">
      <common-options :index="index"></common-options>
      <div class="content">
        <type-search @pop="pop"></type-search>
        <type-table :data="data" @showDel="showDel" @pop="pop"></type-table>
        <type-pop
          v-if="isPop"
          @closePop="closePop"
          @changeData="change"
          :handlePop="handlePop"
        ></type-pop>
      </div>
      <common-delhint
        v-show="isDel"
        @cancelDel="cancelDel"
        @del="del"
      ></common-delhint>
    </div>
    <common-mask v-show="isPop" @click="closePop"></common-mask>
    <common-mask v-show="isDel" @click="closeDel"></common-mask>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import CommonTitle from 'common/Title'
import CommonOptions from 'common/Options'
import CommonMask from 'common/Mask'
import CommonDelhint from 'common/Delhint'
import TypeSearch from './components/Search'
import TypeTable from './components/Table'
import TypePop from './components/Pop'
import { useStore } from 'vuex'
import axios from 'axios'
export default {
  name: 'Type',
  components: {
    CommonTitle,
    CommonOptions,
    CommonMask,
    CommonDelhint,
    TypeSearch,
    TypeTable,
    TypePop
  },
  setup() {
    const index = 0
    const { data, store } = base()
    const { isDel, showDel, closeDel, cancelDel } = delHintMethods()
    const { isPop, handlePop, pop, closePop, change, del } = popMethods(data, store, isDel)
    const { getTypeInfo } = axiosMethods(data)

    onMounted(() => {
      getTypeInfo()
    })
    return { index, data, isPop, isDel, handlePop, pop, showDel, del, closePop, closeDel, cancelDel, change }
  }
}
function base() {
  const data = reactive([])
  const store = useStore()
  return { data, store }
}
function delHintMethods() {
  const isDel = ref(false)
  function showDel() {
    isDel.value = true
  }
  function closeDel() {
    isDel.value = false
  }
  function cancelDel() {
    isDel.value = false
  }
  return { isDel, showDel, closeDel, cancelDel }
}
function popMethods(data, store, isDel) {
  const isPop = ref(false)
  // 提示pop进行修改还是新增，负数表示新增，非负表示修改的索引号
  const handlePop = ref()
  function pop(index) {
    isPop.value = true
    handlePop.value = index
  }
  function closePop() {
    isPop.value = false
  }
  // 添加/修改数据
  function change(newData, handle) {
    if (handle < 0) {
      data.push(newData)
    } else if (handle >= 0) {
      data[handle] = newData
    }
  }
  // 删除数据
  function del() {
    let index = store.state.del.index
    data.splice(index, 1)
    isDel.value = false
  }
  return { isPop, handlePop, pop, closePop, change, del }
}
function axiosMethods(data) {
  function getTypeInfo() {
    axios.get('/api/type.json').then(getTypeInfoSucc)
  }
  function getTypeInfoSucc(res) {
    res = res.data
    if (res.ret && res.data) {
      data.push(...res.data.data)
    }
  }
  return { getTypeInfo }
}
</script>

<style lang="stylus" scoped>
.main>>>.optionsContainer {
  height: 100vh !important;
}

.main {
  display: flex;

  .content {
    flex: 1;
    height: 100vh;
    background-color: #fafbfc;
  }
}
</style>
