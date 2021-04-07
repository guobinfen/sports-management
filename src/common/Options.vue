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
import { useRouter } from 'vue-router';
export default {
  name: 'CommonOptions',
  props: {
    index: Number
  },
  setup(props) {
    const router = useRouter()
    const data = reactive({
      options: ['项目类型', '比赛项目', '参赛纪录', '运动员管理', '操作员管理'],
    })
    const control = reactive({
      isClicked: props.index
    })
    function handleClick(index) {
      switch (index) {
        case 0:
          router.push('/type')
          break
        case 1:
          router.push('/competition')
          break
        case 2:
          router.push('/plog')
          break
        case 3:
          router.push('/player')
          break
        case 4:
          router.push('/admin')
          break
      }
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
