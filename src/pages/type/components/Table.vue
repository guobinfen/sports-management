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
        <tr class="rowBody" v-for="(item, index) of data" :key="item.id">
          <td class="name">{{ item.name }}</td>
          <td class="des">{{ item.des }}</td>
          <td class="operate">
            <span class="modify">修改</span>
            <span class="del" @click="del(index)">删除</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: "TypeTable",
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
    }
    ])
    function del(index) {
      data.splice(index, 1)
    }
    return {
      data, del
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
