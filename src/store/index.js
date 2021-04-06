import { createStore } from 'vuex'

export default createStore({
  state: {
    p1: {
      user: 'admin',
      pwd: '123'
    },
    typePop: {
      title: '',
      name: '',
      des: ''
    },
    typeKey: '',
    del: {
      confirm: false,
      index: -1
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
