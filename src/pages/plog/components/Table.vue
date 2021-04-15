<template>
  <div>
    <table>
      <thead>
        <tr class="rowHead">
          <th class="order">序号</th>
          <th class="competition">比赛项目</th>
          <th class="date">比赛日期</th>
          <th class="name">运动员姓名</th>
          <th class="number">运动员编号</th>
          <th class="grade">成绩</th>
          <th class="admin">登记人</th>
          <th class="operate">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="rowBody"
          v-for="(item, index) of searchResult"
          :key="item.id"
        >
          <td class="order">{{ index + 1 }}</td>
          <td class="competition">{{ item.competition }}</td>
          <td class="date">{{ item.date }}</td>
          <td class="name">{{ item.name }}</td>
          <td class="number">{{ item.number }}</td>
          <td class="grade">无</td>
          <td class="admin">二狗</td>
          <td class="operate">
            <span class="modify" @click="mod(index)">登记成绩</span>
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
  name: "PlogTable",
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
    store.state.del.index = index
    context.emit('showDel', index)
  }
  // 点击修改键
  function mod(index) {
    context.emit('pop', index)
    store.state.title = '修改项目类型'
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

  .order {
    width: 80px;
  }

  .competition {
    width: 130px;
  }

  .date {
    width: 130px;
  }

  .name {
    width: 110px;
  }

  .number {
    width: 130px;
  }

  .grade {
    width: 90px;
  }

  .admin {
    width: 140px;
  }
}
</style>
