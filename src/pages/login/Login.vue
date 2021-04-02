<template>
  <div>
    <form action="" class="login">
      <div class="title">登录</div>
      <input type="text" id="user" name="user" v-model="user" />
      <input type="password" id="pwd" name="user" v-model="pwd" />
      <button @click.prevent="checkLogin">登录</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import CommonOptions from 'common/Options'
export default {
  name: 'Login',
  components: {
    CommonOptions
  },
  setup() {
    let user = ref('admin')
    let pwd = ref('123')
    const store = useStore()
    function checkLogin() {
      if (user.value == store.state.p1.user
        && pwd.value == store.state.p1.pwd) {
        console.log(true)
        console.log(pwd.value)
      }
    }
    return { user, pwd, checkLogin }
  }

}
</script>

<style lang="stylus" scoped>
.login {
  width: 200px;
  height: 160px;
  margin: 100px auto;
  border: 3px solid red;
  background-color: #f4f4f2;

  .title {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 700;
    color: #55596a;
    text-align: center;
  }

  input {
    display: block;
    width: 108px;
    height: 14px;
    margin: 10px auto;
    padding: 2px 6px;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    color: #606266;
  }

  button {
    display: block;
    width: 40px;
    height: 20px;
    margin: 10px auto;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    border-radius: 2px;
  }
}
</style>
