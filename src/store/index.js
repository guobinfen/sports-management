import { createStore } from 'vuex'

export default createStore({
  state: {
    p1: {
      user: 'admin',
      pwd: '123'
    },
    typePop: {
      name: '',
      des: ''
    },
    del: {
      confirm: false,
      index: -1
    },
    title: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
