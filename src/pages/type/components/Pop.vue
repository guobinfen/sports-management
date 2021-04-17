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
      <div class="name">
        <el-form-item label="项目类型:" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入项目类型"
          ></el-input>
        </el-form-item>
      </div>
      <div class="des">
        <el-form-item label="项目介绍" prop="des">
          <el-input
            type="textarea"
            v-model="ruleForm.des"
            placeholder="请输入项目介绍"
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
    name: '',
    des: '',
  })
  const rules = reactive({
    name: [
      { required: true, message: '请输入项目类型', trigger: 'blur' }
    ],
    des: [
      { required: true, message: '请输入项目介绍', trigger: 'blur' },
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
  padding-bottom: 8px;
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

  .name, .des, .submit {
    width: 320px;
    height: 60px;
    line-height: 30px;
    zoom: 1;

    &:after {
      floatClear();
    }
  }

  .submit {
    margin-top: 20px;
  }
}
</style>
