<template>
  <div class="optionsContainer">
    <ul>
      <li
        v-for="(item, index) of data.options"
        :key="index"
        :class="{
          over: control.isOver == index,
          clicked: control.isClicked == index,
        }"
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
      isClicked: 0
    })
    function handleClick(index) {
      control.isClicked = index
    }
    return { data, control, handleClick }
  }
}
</script>

<style lang="stylus" scoped>
.optionsContainer {
  float: left;
  height: 100%;

  ul {
    width: 180px;
    height: 100%;
    background-color: #ebeef5;

    li {
      height: 36px;
      padding-left: 16px;
      font-size: 16px;
      font-weight: 700;
      line-height: 36px;
      user-select: none;
    }

    li:hover {
      background-color: #ecf5ff;
      cursor: pointer;
    }

    .clicked {
      color: #409eff;
    }
  }
}
</style>
