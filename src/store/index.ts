import { createStore } from 'vuex'

export default createStore({
  state: {
    username: '',
    headerMessage: 'お知らせ: システムメンテナンスのお知らせ'
  },
  mutations: {
    setUsername(state, username: string) {
      state.username = username
    }
  },
  actions: {
    login({ commit }, username: string) {
      commit('setUsername', username)
    }
  },
  getters: {
    username: (state) => state.username,
    headerMessage: (state) => state.headerMessage
  }
})
