<template>
  <div>
    <table>
      <thead>
        <tr class="rowHead">
          <th class="name">名称</th>
          <th class="des">说明</th>
          <th class="operate">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="rowBody"
          v-for="(item, index) of searchResult"
          :key="item.id"
        >
          <td class="name">{{ item.name }}</td>
          <td class="des">{{ item.des }}</td>
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
  name: "TypeTable",
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

  .name {
    width: 300px;
  }

  .des {
    width: 460px;
  }
}
</style>
