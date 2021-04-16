<template>
  <div class="container">
    <common-title></common-title>
    <div class="main">
      <common-options :index="index"></common-options>
      <div class="content">
        <plog-search @pop="pop"></plog-search>
        <plog-table
          @showDel="showDel"
          @register="register"
          :data="data"
        ></plog-table>
        <plog-pop
          v-if="isPop"
          @closePop="closePop"
          @add="add"
          :dataComp="dataComp"
          :dataPlayer="dataPlayer"
        ></plog-pop>
        <plog-register
          v-if="isRegister"
          @closeRegister="closeRegister"
          @modGrade="modGrade"
          :changeIndex="changeIndex"
          :dataGrade="dataGrade"
        ></plog-register>
      </div>
      <common-delhint
        v-show="isDel"
        @cancelDel="cancelDel"
        @del="del"
      ></common-delhint>
    </div>
    <common-mask v-show="isPop" @click="closePop"></common-mask>
    <common-mask v-show="isDel" @click="closeDel"></common-mask>
    <common-mask v-show="isRegister" @click="closeRegister"></common-mask>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import CommonTitle from 'common/Title'
import CommonOptions from 'common/Options'
import CommonMask from 'common/Mask'
import CommonDelhint from 'common/Delhint'
import PlogSearch from './components/Search'
import PlogTable from './components/Table'
import PlogPop from './components/Pop'
import PlogRegister from './components/Register'
import { useStore } from 'vuex'
import axios from 'axios'
export default {
  name: 'Plog',
  components: {
    CommonTitle,
    CommonOptions,
    CommonMask,
    CommonDelhint,
    PlogSearch,
    PlogTable,
    PlogPop,
    PlogRegister
  },
  setup() {
    const index = 2
    const { data, dataComp, dataPlayer, store } = base()
    const { isDel, showDel, closeDel, cancelDel } = delHintMethods()
    const { isPop, pop, closePop, add, del } = popMethods(data, store, isDel)
    const { isRegister, changeIndex, dataGrade, register, closeRegister, modGrade } = registerMethods(data)
    const { getCompetitonInfo, getPlayerInfo } = axiosMethods(dataComp, dataPlayer)

    onMounted(() => {
      getCompetitonInfo()
      getPlayerInfo()
    })
    return {
      index, data, dataComp, dataPlayer, isDel, showDel, closeDel, cancelDel,
      isPop, pop, closePop, add, del, isRegister, changeIndex, dataGrade, register, closeRegister, modGrade
    }
  }
}
function base() {
  const data = reactive([])
  const dataComp = reactive([])
  const dataPlayer = reactive([])
  const store = useStore()
  return { data, dataComp, dataPlayer, store }
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
  function pop() {
    isPop.value = true
  }
  function closePop() {
    isPop.value = false
  }
  // 添加/修改数据
  function add(object) {
    data.push(object)
  }
  // 删除数据
  function del() {
    let index = store.state.del.index
    data.splice(index, 1)
    isDel.value = false
  }
  return { isPop, pop, closePop, add, del }
}
function registerMethods(data) {
  const isRegister = ref(false)
  const changeIndex = ref()
  const dataGrade = reactive({})
  function register(index) {
    isRegister.value = true
    changeIndex.value = index
    dataGrade.value = data[index]
  }
  function closeRegister() {
    isRegister.value = false
  }
  function modGrade(arr) {
    let grade = arr[0].grade
    let index = arr[1]
    data[index].grade = grade
  }
  return { isRegister, changeIndex, dataGrade, register, closeRegister, modGrade }
}
function axiosMethods(dataComp, dataPlayer) {
  function getCompetitonInfo() {
    axios.get('/api/competition.json').then(getCompetitonInfoSucc)
  }
  function getCompetitonInfoSucc(res) {
    res = res.data
    if (res.ret && res.data) {
      dataComp.push(...res.data.data)
    }
  }
  function getPlayerInfo() {
    axios.get('/api/player.json').then(getPlayerInfoSucc)
  }
  function getPlayerInfoSucc(res) {
    res = res.data
    if (res.ret && res.data) {
      dataPlayer.push(...res.data.data)
    }
  }
  return { getCompetitonInfo, getPlayerInfo }
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

