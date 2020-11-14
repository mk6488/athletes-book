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
    <button v-else class="mx-2 float-right" @click="$emit('open-login-modal')">
      Login
    </button>
  </nav>
</template>

<script>
import firebase from "../utilities/firebase";

export default {
  props: ["isLoggedIn"],
  setup() {
    const list = [
      { title: "Home", to: "/" },
      { title: "Training Load", to: "/training-load" },
    ];

    const logout = () => firebase.auth().signOut();

    return { list, logout };
  },
};
</script>

<style>
</style>