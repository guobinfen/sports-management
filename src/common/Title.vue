<template>
  <div class="title">
    <div class="titleName">体育赛事管理系统</div>
    <div class="exit">退出</div>
    <div class="admin">管理员1</div>
  </div>
</template>

<script>
export default {
  name: 'CommonTitle'
}
</script>

<style lang="stylus" scoped>
.title {
  height: 26px;
  line-height: 26px;

  .titleName {
    float: left;
    margin-left: 8px;
    font-weight: 700;
    color: #2f54c9;
    font-size: 14px;
  }

  .admin {
    float: right;
    margin-right: 8px;
    color: #2c3e50;
    font-size: 14px;
  }

  .exit {
    float: right;
    margin-right: 30px;
    color: #2c3e50;
    font-size: 12px;
  }
}
</style>
