<template>
  <div class="container">
    <common-title></common-title>
    <div class="main">
      <common-options :index="index"></common-options>
      <div class="content">
        <admin-search @pop="pop"></admin-search>
        <admin-table :data="data" @showDel="showDel" @pop="pop"></admin-table>
        <admin-pop
          v-if="isPop"
          @closePop="closePop"
          @changeData="changeData"
          :handlePop="handlePop"
        ></admin-pop>
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
import AdminSearch from './components/Search'
import AdminTable from './components/Table'
import AdminPop from './components/Pop'
import { useStore } from 'vuex'
import axios from 'axios'
export default {
  name: 'Admin',
  components: {
    CommonTitle,
    CommonOptions,
    CommonMask,
    CommonDelhint,
    AdminSearch,
    AdminTable,
    AdminPop
  },
  setup() {
    const index = 4
    const { data, store } = base()
    const { isDel, showDel, closeDel, cancelDel } = delHintMethods()
    const { isPop, handlePop, pop, closePop, changeData, del } = popMethods(data, store, isDel)
    const { getAdminInfo } = axiosMethods(data)

    onMounted(() => {
      getAdminInfo()
    })
    return { index, data, isPop, isDel, handlePop, pop, showDel, del, closePop, closeDel, cancelDel, changeData }
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
  const handlePop = reactive({
    index: -1,
    data: {}
  })
  function pop(index) {
    isPop.value = true
    handlePop.index = index
    if (index > -1) {
      handlePop.data = data[index]
    } else {
      handlePop.data = {}
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
  return { isPop, handlePop, pop, closePop, changeData, del }
}
function axiosMethods(data) {
  function getAdminInfo() {
    axios.get('/api/admin.json').then(getAdminInfoSucc)
  }
  function getAdminInfoSucc(res) {
    res = res.data
    if (res.ret && res.data) {
      data.push(...res.data.admin)
    }
  }
  return { getAdminInfo }
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
