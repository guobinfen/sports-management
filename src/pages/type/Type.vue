<template>
  <div class="container">
    <common-title></common-title>
    <div class="main">
      <common-options></common-options>
      <div class="content">
        <type-search @pop="pop"></type-search>
        <type-table :data="data" @del="del" @pop="pop"></type-table>
        <type-pop
          v-show="isPop"
          @closePop="closePop"
          @changeData="change"
          :handlePop="handlePop"
        ></type-pop>
      </div>
    </div>
    <common-mask v-show="isPop" @closePop="closePop"></common-mask>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import CommonTitle from 'common/Title'
import CommonOptions from 'common/Options'
import CommonMask from 'common/Mask'
import TypeSearch from './components/Search'
import TypeTable from './components/Table'
import TypePop from './components/Pop'
export default {
  name: 'Type',
  components: {
    CommonTitle,
    CommonOptions,
    CommonMask,
    TypeSearch,
    TypeTable,
    TypePop
  },
  setup() {
    const data = reactive([{
      id: '1',
      name: '田赛',
      des: '田赛说明'
    }, {
      id: '2',
      name: '径赛',
      des: '径赛说明'
    }, {
      id: '3',
      name: '团体赛',
      des: '团体说明'
    }, {
      id: '4',
      name: '表演赛',
      des: '表演赛说明'
    }])
    let isPop = ref(false)
    // 提示pop进行修改还是新增，负数表示新增，非负表示修改的索引号
    let handlePop = ref()
    function pop(index) {
      isPop.value = true
      handlePop.value = index
    }
    function del(index) {
      data.splice(index, 1)
    }
    function closePop() {
      isPop.value = false
    }
    function change(newData, handle) {
      if (handle < 0) {
        data.push(newData)
      } else if (handle >= 0) {
        data[handle] = newData
      }
    }
    return { data, isPop, handlePop, pop, del, closePop, change }
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
