<template>
  <div class="title">
    <div class="titleName">体育赛事管理系统</div>
    <div class="exit" @click="exit">退出</div>
    <div class="admin">{{ user }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CommonTitle',
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = ref('')
    user.value = store.state.user
    function exit() {
      router.push('/')
    }
    return { user, exit }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.title {
  height: 40px;
  line-height: 40px;

  .titleName {
    float: left;
    margin-left: 10px;
    font-weight: 700;
    color: #2f54c9;
    font-size: 16px;
  }

  .admin {
    float: right;
    margin-right: 12px;
    color: #2c3e50;
    font-size: 14px;
  }

  .exit {
    float: right;
    margin-right: 60px;
    color: #2c3e50;
    font-size: 14px;
  }

  .exit:hover {
    fontHover();
  }
}
</style>
