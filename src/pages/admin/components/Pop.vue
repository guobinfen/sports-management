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
      <div class="adName">
        <el-form-item label="姓名:" prop="adName">
          <el-input
            v-model="ruleForm.adName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
      </div>
      <div class="user">
        <el-form-item label="用户名:" prop="user">
          <el-input
            v-model="ruleForm.user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
      </div>
      <div class="password">
        <el-form-item label="密码:" prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
      </div>
      <div class="adSex">
        <el-form-item label="性别:" prop="adSex">
          <el-select v-model="ruleForm.adSex" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="adType">
        <el-form-item label="身份类型:" prop="adType">
          <el-select v-model="ruleForm.adType" placeholder="请选择">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="操作员" value="操作员"></el-option>
          </el-select>
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
  name: 'AdminPop',
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
    adName: '',
    user: '',
    password: '',
    adSex: '',
    adType: '',
  })
  const rules = reactive({
    adName: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
    ],
    user: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    adSex: [
      { required: true, message: '请选择性别', trigger: 'change' }
    ],
    adType: [
      { required: true, message: '请选择身份类型', trigger: 'change' }
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

  .adName, .user, .password, .adSex, .adType {
    width: 320px;
    height: 60px;
    line-height: 30px;
    zoom: 1;

    &:after {
      floatClear();
    }
  }
}
</style>



