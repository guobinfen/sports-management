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
            <span class="modify" @click="mod(index, item.name, item.des)"
              >修改</span
            >
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
export default {
  name: "TypeTable",
  props: {
    data: Array
  },
  setup(props, context) {
    const store = useStore()
    let getData = props.data
    const searchResult = reactive([])
    function del(index) {
      context.emit('del', index)
    }
    function mod(index, name, des) {
      context.emit('pop', index)
      store.state.typePop.title = '修改项目类型'
      store.state.typePop.name = name
      store.state.typePop.des = des
    }
    watch(() => store.state.typeKey, () => {
      searchResult.splice(0)
      getData.forEach(val => {
        if (val.name.indexOf(store.state.typeKey) > -1) {
          let arr = val
          searchResult.push(arr)
        }
      })
    })
    watch(props.data, () => {
      getData = props.data
      searchResult.splice(0)
      searchResult.splice(0, 0, ...props.data)
    })
    onMounted(
      () => {
        searchResult.splice(0, 0, ...props.data)
      }
    )
    return {
      del, mod, searchResult
    }
  }
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
