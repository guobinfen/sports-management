<template>
  <div>
    <ul>
      <li
        v-for="(item, index) of data.options"
        :key="index"
        :class="{
          over: control.isOver == index,
          clicked: control.isClicked == index,
        }"
        @mouseover="handleOver(index)"
        @mouseleave="handleLeave"
        @click="handleClick(index)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'CommonOptions',
  setup() {
    const data = reactive({
      options: ['项目类型', '比赛项目', '参赛纪录', '运动员管理', '操作员管理'],
    })
    const control = reactive({
      isOver: 'null',
      isClicked: 0
    })
    function handleOver(index) {
      control.isOver = index
    }
    function handleLeave() {
      control.isOver = 'null'
    }
    function handleClick(index) {
      control.isClicked = index
    }
    return { data, control, handleOver, handleLeave, handleClick }
  }
}
</script>

<style lang="stylus" scoped>
ul {
  width: 140px;
  height: 100% !important;
  background-color: #ebeef5;

  li {
    height: 28px;
    padding-left: 12px;
    font-size: 12px;
    font-weight: 700;
    line-height: 28px;
    user-select: none;
  }

  .over {
    background-color: #ecf5ff;
    cursor: pointer;
  }

  .clicked {
    color: #409eff;
  }
}
</style>
