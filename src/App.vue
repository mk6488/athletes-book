<template>
  <AppHeader :isLoggedIn="isLoggedIn" @open-login-modal="loginIsOpen = true" />
  <div class="w-full flex">
    <router-view></router-view>
  </div>
  <teleport to="body">
    <LoginModal v-if="loginIsOpen" @close-login="loginIsOpen = false" />
  </teleport>
</template>

<script>
import { ref, onMounted } from "vue";
import AppHeader from "./components/AppHeader";
import LoginModal from "./components/LoginModal";
import firebase from "./utilities/firebase";

export default {
  components: {
    AppHeader,
    LoginModal,
  },

  setup() {
    const loginIsOpen = ref(false);
    const isLoggedIn = ref(false);
    const authUser = ref({});

    onMounted(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.isLoggedIn = true;
          this.authUser = user;
        } else {
          this.isLoggedIn = false;
          this.authUser = {};
        }
      });
    });

    return { loginIsOpen, isLoggedIn, authUser };
  },
};
</script>

<style>
</style>
