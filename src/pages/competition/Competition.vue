<template>
  <div class="container">
    <common-title></common-title>
    <div class="main">
      <common-options :index="index"></common-options>
      <div class="content">
        <competition-search @pop="pop"></competition-search>
        <competition-table
          :data="data"
          @showDel="showDel"
          @pop="pop"
        ></competition-table>
        <competition-pop
          v-if="isPop"
          @closePop="closePop"
          @changeData="changeData"
          :handlePop="handlePop"
          :type="type"
        ></competition-pop>
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
import CompetitionSearch from './components/Search'
import CompetitionTable from './components/Table'
import CompetitionPop from './components/Pop'
import { useStore } from 'vuex'
import axios from 'axios'
export default {
  name: 'Competition',
  components: {
    CommonTitle,
    CommonOptions,
    CommonMask,
    CommonDelhint,
    CompetitionSearch,
    CompetitionTable,
    CompetitionPop
  },
  setup() {
    const index = 1
    const { data, type, store } = base()
    const { isDel, showDel, closeDel, cancelDel } = delHintMethods()
    const { isPop, handlePop, pop, closePop, changeData, del } = popMethods(data, store, isDel)
    const { getTypeInfo, getCompetitionInfo } = axiosMethods(data, type)

    onMounted(() => {
      getTypeInfo()
      getCompetitionInfo()
    })
    return {
      index, data, type, isDel, showDel, closeDel, cancelDel,
      isPop, handlePop, pop, closePop, changeData, del
    }
  }
}
function base() {
  const data = reactive([])
  const type = reactive([])
  const store = useStore()
  return { data, type, store }
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
  const handlePop = ref({})
  const popData = reactive({})
  function pop(index) {
    isPop.value = true
    handlePop.value.index = index
    if (index > -1) {
      handlePop.value.data = data[index]
    } else {
      handlePop.value.data = {}
    }

  }
  function closePop() {
    isPop.value = false
  }
  // 添加/修改数据
  function changeData(arr) {
    let newData = arr[0]
    let index = arr[1]
    if (index < 0) {
      data.push(newData)
    } else if (index >= 0) {
      data[index] = newData
    }
  }
  // 删除数据
  function del() {
    let index = store.state.del.index
    data.splice(index, 1)
    isDel.value = false
  }
  return { isPop, handlePop, popData, pop, closePop, changeData, del }
}
function axiosMethods(data, type) {
  function getTypeInfo() {
    axios.get('/api/type.json').then(getTypeInfoSucc)
  }
  function getTypeInfoSucc(res) {
    res = res.data
    if (res.ret && res.data) {
      type.push(...res.data.data)
    }
  }
  function getCompetitionInfo() {
    axios.get('/api/competition.json').then(getCompetitionInfoSucc)
  }
  function getCompetitionInfoSucc(res) {
    res = res.data
    if (res.ret && res.data) {
      data.push(...res.data.data)
    }
  }
  return { getTypeInfo, getCompetitionInfo }
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

