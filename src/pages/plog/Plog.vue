<template>
  <div class="block">
    <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      ref="date"
    >
    </el-date-picker>
    <button @click="click">确认</button>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
export default {
  name: 'Plog',
  setup() {
    const shortcuts = reactive([{
      text: '最近一周',
      value: (() => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      })(),
    }, {
      text: '最近一个月',
      value: (() => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        return [start, end]
      })(),
    }, {
      text: '最近三个月',
      value: (() => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        return [start, end]
      })(),
    }])
    const value1 = ref('')
    const value2 = ref('')
    const date = ref(null)
    function click() {
      console.log(date.value)
    }
    return { shortcuts, value1, value2, date, click }
  }
}
</script>

<style>
</style>


<style lang="stylus" scoped></style>
