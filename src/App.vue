<template>
  <AppHeader
    :isLoggedIn="isLoggedIn"
    @open-login-modal="loginIsOpen = true"
    @open-register-modal="registerIsOpen = true"
  />
  <div class="w-full flex">
    <router-view></router-view>
  </div>
  <teleport to="body">
    <LoginModal v-if="loginIsOpen" @close-login-modal="loginIsOpen = false" />
    <RegisterModal
      v-if="registerIsOpen"
      @close-register-modal="registerIsOpen = false"
    />
  </teleport>
</template>

<script>
import { ref, onMounted } from "vue";
import firebase from "./utilities/firebase";
import store from "./store/index";

import AppHeader from "./components/AppHeader";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

export default {
  components: {
    AppHeader,
    LoginModal,
    RegisterModal,
  },

  setup() {
    const loginIsOpen = ref(false);
    const registerIsOpen = ref(false);
    const isLoggedIn = ref(false);
    const authUser = ref({});

    onMounted(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          store.commit("setIsLoggedIn", true);
          store.commit("setAuthUser", user);
        } else {
          store.commit("setIsLoggedIn", false);
          store.commit("setAuthUser", {});
        }
      });
    });

    return { loginIsOpen, registerIsOpen, isLoggedIn, authUser };
  },
};
</script>

<style>
</style>
