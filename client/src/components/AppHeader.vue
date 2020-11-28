<template>
  <nav
    class="w-full bg-gradient-to-r from-indigo-800 to-indigo-600 text-bold text-white p-4"
  >
    <router-link
      v-for="item in list"
      :key="item.to"
      class="mx-2"
      :to="item.to"
      >{{ item.title }}</router-link
    >
    <button v-if="isLoggedIn" class="mx-2 float-right" @click="logout">
      Logout
    </button>
    <div v-else class="float-right">
      <button class="mx-2" @click="openLogin">Login</button>
      <button class="mx-2" @click="openRegister">Register</button>
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import firebase from "../utilities/firebase";
import store from "../store/index";

export default {
  setup() {
    const list = [
      { title: "Home", to: "/" },
      { title: "Athlete", to: "/athlete" },
      { title: "Training Load", to: "/training-load" },
      { title: "Wellness", to: "/wellness" },
    ];

    const isLoggedIn = computed(() => store.state.isLoggedIn);

    const openLogin = () => store.commit("setLoginModal", true);
    const openRegister = () => store.commit("setRegisterModal", true);
    const logout = () => firebase.auth().signOut();

    return { list, isLoggedIn, openLogin, openRegister, logout };
  },
};
</script>

<style>
</style>