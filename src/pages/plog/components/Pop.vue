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
      <div class="competition">
        <el-form-item label="赛程" prop="competition">
          <el-select v-model="ruleForm.competition" placeholder="请选择">
            <el-option
              v-for="(item, index) in dataComp"
              :key="item.id"
              :label="item.name"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="player">
        <el-form-item label="运动员" prop="player">
          <el-select v-model="ruleForm.player" placeholder="请选择">
            <el-option
              v-for="(item, index) in dataPlayer"
              :key="item.id"
              :label="item.name"
              :value="index"
            ></el-option>
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
  name: 'PlogPop',
  props: {
    dataComp: Array,
    dataPlayer: Array
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
    return { holder, close, formName, ruleForm, rules, submitForm }
  }
}
function formValidation(props, context, close) {
  const formName = ref(null)
  const ruleForm = reactive({
    competition: '',
    player: ''
  })
  const rules = reactive({
    competition: [
      { required: true, message: '请选择赛程', trigger: 'change' }
    ],
    player: [
      { required: true, message: '请选择运动员', trigger: 'change' }
    ]
  })
  function submitForm() {
    formName.value.validate((valid) => {
      if (valid) {
        let newData = {
          competition: '',
          date: '',
          name: '',
          number: ''
        }
        let comp = props.dataComp[ruleForm.competition]
        newData.competition = comp.name
        newData.date = comp.date
        let player = props.dataPlayer[ruleForm.player]
        newData.name = player.name
        newData.number = player.number
        context.emit('add', newData)
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

  .competition, .player {
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



