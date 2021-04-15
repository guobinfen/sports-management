<template>
  <div>
    <table>
      <thead>
        <tr class="rowHead">
          <th class="number">运动员编号</th>
          <th class="name">姓名</th>
          <th class="sex">性别</th>
          <th class="birth">生日</th>
          <th class="stuNumber">学号</th>
          <th class="class">班级</th>
          <th class="operate">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="rowBody"
          v-for="(item, index) of searchResult"
          :key="item.id"
        >
          <td class="number">001</td>
          <td class="name">赵一</td>
          <td class="sex">男</td>
          <td class="birth">2019-3-8</td>
          <td class="stuNumber">17011</td>
          <td class="class">001</td>
          <td class="operate">
            <span class="modify" @click="mod(index)">修改</span>
            <span class="del" @click="del(index)">删除</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import bus from '@/bus/bus'
export default {
  name: "PlayerTable",
  props: {
    data: Array
  },
  setup(props, context) {
    const store = useStore()
    // 存放传入的data
    let getData = props.data
    const searchResult = reactive([])
    const { del, mod } = tabelMethods(context, store)
    // 当数据改变重新渲染
    watch(props.data, () => {
      getData = props.data
      searchResult.splice(0)
      searchResult.splice(0, 0, ...props.data)
    })
    onMounted(
      () => {
        searchResult.splice(0, 0, ...props.data)
      },
      bus.on('search', (key) => {
        searchResult.splice(0)
        getData.forEach(val => {
          if (val.name.indexOf(key) > -1) {
            let arr = val
            searchResult.push(arr)
          }
        })
      })
    )
    return {
      del, mod, searchResult
    }
  }
}
function tabelMethods(context, store) {
  // 点击删除键
  function del(index) {
    context.emit('showDel')
    store.state.del.index = index
  }
  // 点击修改键
  function mod(index, name, des) {
    context.emit('pop', index)
    store.state.playerPop.title = '修改项目类型'
  }
  return { del, mod }
}
</script>

<style lang="stylus" scoped>
table {
  margin: 15px auto;
  background-color: #fff;
  border-collapse: collapse;

  .rowHead, .rowBody {
    display: block;
    width: 1050px;
  }

  .rowHead {
    height: 30px;
    color: #909399;
    line-height: 30px;
  }

  .rowBody {
    height: 50px;
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    line-height: 50px;
    color: #606266;
    font-size: 14px;

    .del, .modify {
      color: #66b8fe;
      cursor: pointer;
    }

    .del {
      margin-left: 14px;
    }
  }

  .rowBody:hover {
    background-color: #f5f7fa;
  }

  th, td {
    padding-left: 6px;
  }

  .number {
    width: 150px;
  }

  .name {
    width: 130px;
  }

  .sex {
    width: 100px;
  }

  .birth {
    width: 160px;
  }

  .stuNumber {
    width: 160px;
  }

  .class {
    width: 140px;
  }
}
</style>
