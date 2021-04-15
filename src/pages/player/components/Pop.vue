<template>
  <div class="box">
    <div class="title">
      {{ holder.title }}
      <span class="exit iconfont" @click="close">&#xe7a0;</span>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="formName"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="number">
        <el-form-item label="运动员编号:" prop="number">
          <el-input
            v-model="ruleForm.number"
            placeholder="请输入编号"
          ></el-input>
        </el-form-item>
      </div>
      <div class="name">
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
      </div>
      <div class="sex">
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="birth">
        <el-form-item label="生日:" prop="birth">
          <el-form-item prop="birth">
            <el-date-picker
              type="date"
              placeholder="选择生日"
              v-model="ruleForm.birth"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
      </div>
      <div class="stuNumber">
        <el-form-item label="学号:" prop="stuNumber">
          <el-input
            v-model="ruleForm.stuNumber"
            placeholder="请输入学号"
          ></el-input>
        </el-form-item>
      </div>
      <div class="class">
        <el-form-item label="班级:" prop="class">
          <el-input
            v-model="ruleForm.class"
            placeholder="请输入班级"
          ></el-input>
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
import { reactive, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'PlayerPop',
  props: {
    handlePop: Object
  },
  setup(props, context) {
    const store = useStore()
    // pop的标题以及placeholder
    const holder = reactive({
      title: computed(() => store.state.title),
    })
    function close() {
      context.emit('closePop')
    }
    const { formName, ruleForm, rules, submitForm } = formValidation(props, context, close)
    onMounted(() => {
      if (props.handlePop.index > -1) {
        for (let item in ruleForm) {
          ruleForm[item] = props.handlePop.data[item]
        }
      }
    })
    return { holder, close, formName, ruleForm, rules, submitForm }
  }
}
function formValidation(props, context, close) {
  const formName = ref(null)
  const ruleForm = reactive({
    number: '',
    name: '',
    sex: '',
    birth: '',
    stuNumber: '',
    class: ''
  })
  const rules = reactive({
    number: [
      { required: true, message: '请输入运动员编号', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
    ],
    sex: [
      { required: true, message: '请选择性别', trigger: 'change' }
    ],
    birth: [
      { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
    ],
    stuNumber: [
      { required: true, message: '请输入学号', trigger: 'blur' }
    ],
    class: [
      { required: true, message: '请输入班级', trigger: 'blur' }
    ]
  })
  function submitForm() {
    formName.value.validate((valid) => {
      if (valid) {
        let arr = []
        arr.push(ruleForm)
        arr.push(props.handlePop.index)
        context.emit('changeData', arr)
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
  padding-bottom: 10px;
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

  .number, .name, .sex, .birth, .stuNumber, .class {
    width: 320px;
    height: 60px;
    line-height: 30px;
    zoom: 1;

    &:after {
      floatClear();
    }

    .warnHint {
      border-color: #f56c6c !important;
    }
  }

  .icon {
    color: #f56c6c;
  }
}
</style>



