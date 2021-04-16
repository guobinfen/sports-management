<template>
  <div class="box">
    <div class="title">
      {{ holder.title }}
      <span class="exit iconfont" @click="close">&#xe7a0;</span>
    </div>
    <div class="competition">
      <div class="wrapper">赛程:</div>
      <div class="content">{{ dataGrade.value.competition }}</div>
    </div>
    <div class="number">
      <div class="wrapper">运动员编号:</div>
      <div class="content">{{ dataGrade.value.number }}</div>
    </div>
    <div class="name">
      <div class="wrapper">运动员姓名:</div>
      <div class="content">{{ dataGrade.value.name }}</div>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="formName"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="grade">
        <el-form-item label="运动员成绩:" prop="grade">
          <el-input v-model="ruleForm.grade"></el-input>
        </el-form-item>
      </div>
      <div class="submit">
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'PlogRegister',
  props: {
    changeIndex: Number,
    dataGrade: Object
  },
  setup(props, context) {
    const store = useStore()
    const holder = reactive({
      title: computed(() => store.state.title)
    })
    function close() {
      context.emit('closeRegister')
    }
    const { formName, ruleForm, rules, submitForm } = formValidation(props, context, close)
    return { holder, close, formName, ruleForm, rules, submitForm }
  }
}
function formValidation(props, context, close) {
  const formName = ref(null)
  const ruleForm = reactive({
    grade: '',
  })
  const rules = reactive({
    grade: [
      { required: true, message: '请输入成绩', trigger: 'blur' }
    ]
  })
  function submitForm() {
    formName.value.validate((valid) => {
      if (valid) {
        let arr = []
        arr.push(ruleForm)
        arr.push(props.changeIndex)
        context.emit('modGrade', arr)
        close()
      } else {
        console.log('error submit!!')
        return false;
      }
    })
  }
  return { formName, ruleForm, rules, submitForm }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.box>>>.el-input__inner {
  height: 30px;
  line-height: 30px;
}

.box {
  position: fixed;
  z-index: 2;
  top: 10%;
  left: 50%;
  width: 420px;
  padding-top: 16px;
  padding-left: 15px;
  padding-bottom: 20px;
  background-color: #fff;
  transform: translateX(-50%);

  .title {
    font-weight: 700;

    .exit {
      float: right;
      margin-right: 20px;
      color: #979aa0;
      font-size: 12px;
      cursor: pointer;
    }

    .exit:hover {
      color: #51a7ff;
    }
  }

  .competition, .number, .name, .grade, .submit {
    width: 320px;
    height: 40px;
    line-height: 40px;
    color: #606266;
    zoom: 1;

    &:after {
      floatClear();
    }

    .wrapper {
      float: left;
      width: 92px;
      text-align: right;
    }

    .content {
      float: left;
      margin-left: 8px;
    }
  }

  .submit {
    margin-top: 20px;
  }
}
</style>