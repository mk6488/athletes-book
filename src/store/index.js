import {
  createStore
} from 'vuex'

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      authUther: {}
    }
  },
  mutations: {
    setIsLoggedIn(state, payload) {
      state.isLoggedIn = payload
    },
    setAuthUser(state, payload) {
      state.authUther = payload
    }
  }
})

export default store