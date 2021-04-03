<template>
  <div class="box">
    <div class="title">
      新增项目类型
      <span class="exit iconfont">&#xe7a0;</span>
    </div>
    <div class="name">
      <div class="wrapper">
        <span class="icon">*</span>
        name:
      </div>
      <input type="text" placeholder="田赛" />
    </div>
    <div class="des">
      <div class="wrapper">
        <span class="icon">*</span>
        des:
      </div>
      <textarea placeholder="田赛" />
    </div>
    <button>确认</button>
  </div>
</template>

<script>
export default {
  name: 'TypePop',
  setup() {

  },
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.box {
  width: 350px;
  height: 220px;
  padding-top: 16px;
  padding-left: 15px;
  background-color: pink;

  .title {
    font-weight: 700;

    .exit {
      float: right;
      margin-right: 20px;
      color: #979aa0;
      font-size: 12px;
    }
  }

  .name, .des {
    width: 340px;
    line-height: 24px;
    zoom: 1;

    .wrapper {
      float: left;
      width: 80px;
      text-align: right;
    }

    &:after {
      floatClear();
    }

    input {
      float: left;
      height: 24px;
      margin-left: 4px;
      input();
    }

    input::-webkit-input-placeholder {
      color: #c4c4cc;
    }

    textarea::-webkit-input-placeholder {
      color: #c4c4cc;
    }

    textarea {
      width: 160px;
      height: 80px;
      margin-left: 4px;
      input();
    }
  }

  .name, .des {
    margin-top: 12px;
  }

  .icon {
    color: #f56c6c;
  }

  button {
    button();
    margin-top: 18px;
    margin-left: 82px;
  }

  button:hover {
    buttonHover();
  }
}
</style>



