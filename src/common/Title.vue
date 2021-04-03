<template>
  <div class="title">
    <div class="titleName">体育赛事管理系统</div>
    <div class="exit" @click="exit">退出</div>
    <div class="admin">管理员1</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'CommonTitle',
  setup() {
    const router = useRouter()
    function exit() {
      router.push('/')
    }
    return { exit }
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
