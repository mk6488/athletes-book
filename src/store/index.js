import {
  createStore
} from 'vuex'

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      authUser: {},
      loginIsOpen: false,
      registerIsOpen: false
    }
  },
  mutations: {
    setIsLoggedIn(state, payload) {
      state.isLoggedIn = payload
    },
    setAuthUser(state, payload) {
      state.authUser = payload
    },
    setLoginModal(state, payload) {
      state.loginIsOpen = payload
    },
    setRegisterModal(state, payload) {
      state.registerIsOpen = payload
    }
  }
})

export default store