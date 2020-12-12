<template>
  <div class="bg-blue-100 w-screen h-screen px-8 py-8">
    <div class="w-full h-full rounded-xl bg-white overflow-y-scroll">
      <AppHeader class="sticky top-0" />
      <div class="w-full h-full">
        <router-view></router-view>
      </div>
      <teleport to="body">
        <LoginModal />
        <RegisterModal />
      </teleport>
    </div>
  </div>
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
input:focus,
textarea:focus,
button:focus {
  outline: none;
}
</style>
