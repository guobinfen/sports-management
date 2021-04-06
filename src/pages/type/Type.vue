<template>
  <div class="container">
    <common-title></common-title>
    <div class="main">
      <common-options></common-options>
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
    const store = useStore()
    const data = reactive([])
    let isPop = ref(false)
    let isDel = ref(false)
    // 提示pop进行修改还是新增，负数表示新增，非负表示修改的索引号
    let handlePop = ref()
    function pop(index) {
      isPop.value = true
      handlePop.value = index
    }
    function showDel() {
      isDel.value = true
    }
    function del() {
      let index = store.state.del.index
      data.splice(index, 1)
      isDel.value = false
    }
    function closePop() {
      isPop.value = false
    }
    function closeDel() {
      isDel.value = false
    }
    function cancelDel() {
      isDel.value = false
    }
    function change(newData, handle) {
      if (handle < 0) {
        data.push(newData)
      } else if (handle >= 0) {
        data[handle] = newData
      }
    }
    function getTypeInfo() {
      axios.get('/api/type.json').then(getTypeInfoSucc)
    }
    function getTypeInfoSucc(res) {
      res = res.data
      if (res.ret && res.data) {
        data.push(...res.data.data)
      }
    }
    onMounted(() => {
      getTypeInfo()
    })
    return { data, isPop, isDel, handlePop, pop, showDel, del, closePop, closeDel, cancelDel, change }
  }
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
