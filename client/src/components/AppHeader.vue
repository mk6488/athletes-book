<template>
  <nav
    class="w-full bg-gradient-to-r from-indigo-800 to-indigo-600 text-bold text-white p-6 rounded-t-xl shadow-lg"
  >
    <router-link
      v-for="item in list"
      :key="item.to"
      class="mx-3 text-xl"
      :to="item.to"
      ><i v-if="item.icon" :class="item.icon"></i> {{ item.title }}</router-link
    >
    <button v-if="isLoggedIn" class="mx-3 float-right" @click="logout">
      Logout
    </button>
    <div v-else class="float-right">
      <button class="mx-3" @click="openLogin">Login</button>
      <button class="mx-3" @click="openRegister">Register</button>
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
      { title: "", to: "/", icon: "fas fa-home" },
      { title: "", to: "/dashboard", icon: "fas fa-tachometer-alt" },
      { title: "", to: "/athlete", icon: "fas fa-users" },
      { title: "", to: "/comment", icon: "fas fa-comment" },
      { title: "", to: "/test", icon: "fas fa-vial" },
      { title: "", to: "/training-load", icon: "fas fa-sort-amount-up" },
      { title: "", to: "/wellness", icon: "fas fa-spa" },
      { title: "", to: "/session", icon: "far fa-calendar-alt" },
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