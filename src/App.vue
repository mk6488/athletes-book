<template>
  <AppHeader />
  <div class="w-full flex">
    <router-view></router-view>
  </div>
  <teleport to="body">
    <LoginModal />
    <RegisterModal />
  </teleport>
</template>

<script>
import { onMounted } from "vue";
import firebase from "./utilities/firebase";
import { useStore } from "vuex";

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
    const store = useStore();

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

    return {};
  },
};
</script>

<style>
</style>
