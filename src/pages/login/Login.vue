<template>
  <div class="box">
    <div class="login">
      <div class="title">登录</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="formName"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="user">
          <el-form-item prop="user" label-width="0">
            <el-input v-model="ruleForm.user" placeholder="用户名"></el-input>
          </el-form-item>
        </div>
        <div class="password">
          <el-form-item prop="password" label-width="0">
            <el-input
              v-model="ruleForm.password"
              placeholder="密码"
              show-password
            ></el-input>
          </el-form-item>
        </div>
        <div class="submit">
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import CommonOptions from 'common/Options'
export default {
  name: 'Login',
  components: {
    CommonOptions
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const { formName, ruleForm, rules, submitForm } = formValidation(store, router)
    return { formName, ruleForm, rules, submitForm }
  }
}
function formValidation(store, router) {
  const formName = ref(null)
  const ruleForm = reactive({
    user: '',
    password: '',
  })
  const rules = reactive({
    user: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ]
  })
  function submitForm() {
    formName.value.validate((valid) => {
      if (valid) {
        // 当前用户名和密码是写死的，只有一项
        if (ruleForm.user == store.state.p1.user
          && ruleForm.password == store.state.p1.pwd) {
          store.state.user = ruleForm.user
          router.push('/type')
        } else {
          alert('用户名和密码不符')
        }
      } else {
        alert('请重新输入')
        return false;
      }
    })
  }
  return { formName, ruleForm, rules, submitForm }
}
</script>

<style lang="stylus" scoped>
.login>>>.el-form-item__error {
  padding-top: 0;
}

.login>>>.el-input__inner {
  height: 20px;
  line-height: 20px;
}

.submit>>>.el-button {
  height: 30px;
  min-height: 20px;
  width: 60px;
  padding: 0;
  margin-left: 10px;
  line-height: 30px;
}

.submit>>>.el-form-item__content {
  margin-left: 60px !important;
}

.box {
  width: 100vw;
  height: 100vh;
  padding-top: 2px;
  background: url('../img/login-bg.png') 100% no-repeat;

  .login {
    width: 200px;
    height: 200px;
    margin: 100px auto;

    .title {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 700;
      color: #55596a;
      text-align: center;
    }

    .user, .password {
      width: 188px;
      height: 30px;
      margin-top: 14px;
      padding: 0px 6px;
      line-height: 30px;
    }

    .submit {
      width: 200px;
      height: 30px;
      margin-top: 20px;
    }
  }
}
</style>
