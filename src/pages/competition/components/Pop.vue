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
      <div class="type">
        <el-form-item label="所属项目" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择">
            <el-option
              v-for="item in type"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="name">
        <el-form-item label="名称:" prop="name">
          <el-input
            v-model.trim="ruleForm.name"
            :placeholder="holder.name"
          ></el-input>
        </el-form-item>
      </div>
      <div class="date">
        <el-form-item label="日期:" required>
          <el-form-item prop="date">
            <el-date-picker
              v-model="ruleForm.date"
              type="date"
              placeholder="选择日期"
              format="YYYY-MM-DD"
            >
            </el-date-picker>
          </el-form-item>
        </el-form-item>
      </div>
      <div class="time">
        <el-form-item label="开始时间:" required>
          <el-form-item prop="startTime">
            <el-time-select
              placeholder="起始时间"
              v-model="ruleForm.startTime"
              default-value="startDefault"
              start="08:30"
              step="00:15"
              end="18:30"
            ></el-time-select>
          </el-form-item>
        </el-form-item>
      </div>
      <div class="time">
        <el-form-item label="结束时间:" required>
          <el-form-item prop="endTime">
            <el-time-select
              placeholder="结束时间"
              v-model="ruleForm.endTime"
              start="08:30"
              step="00:15"
              end="18:30"
              :minTime="ruleForm.startTime"
            ></el-time-select>
          </el-form-item>
        </el-form-item>
      </div>
      <div class="des">
        <el-form-item label="赛程说明:" prop="des">
          <el-input
            type="textarea"
            :placeholder="holder.des"
            v-model.trim="ruleForm.des"
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
  name: 'CompetitionPop',
  props: {
    handlePop: Object,
    type: Array
  },
  setup(props, context) {
    const store = useStore()
    const startDefault = ref('')
    const { holder, ctx } = base(store)
    const { ruleForm, formName, rules, submitForm } = formValidation(props, context, close)
    function close() {
      context.emit('closePop')
    }
    onMounted(() => {
      if (props.handlePop.index > -1) {
        for (let item in ruleForm) {
          ruleForm[item] = props.handlePop.data[item]
        }
      }
    })
    return {
      holder, ctx, ruleForm, formName, rules, submitForm, close, onMounted, startDefault
    }
  },
}
function base(store) {
  // pop的标题以及placeholder
  const holder = reactive({
    title: computed(() => store.state.competitionPop.title)
  })
  // 组件内容
  const ctx = reactive({
    type: '',
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    des: ''
  })
  return { holder, ctx }
}
function formValidation(props, context, close) {
  const ruleForm = reactive({
    type: '',
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    des: ''
  })
  const formName = ref(null)
  const rules = reactive({
    type: [
      { required: true, message: '请选择项目类型', trigger: 'change' }
    ],
    name: [
      { required: true, message: '请输入项目名称', trigger: 'blur' },
    ],
    date: [
      { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
    ],
    startTime: [
      { required: true, message: '请选择开始时间', trigger: 'change' }
    ],
    endTime: [
      { required: true, message: '请选择结束时间', trigger: 'change' }
    ],
    des: [
      { required: true, message: '请填写项目介绍', trigger: 'blur' }
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
        console.log('error submit!!');
        return false;
      }
    })
  }
  return { ruleForm, formName, rules, submitForm }
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
  width: 400px;
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

  .type, .name, .date, .time {
    width: 340px;
    height: 60px;
    line-height: 30px;
    zoom: 1;

    &:after {
      floatClear();
    }
  }

  .des {
    width: 340px;
    margin-top: 4px;
    line-height: 30px;
    zoom: 1;
  }

  .submit {
    margin-top: 24px;
  }
}
</style>
