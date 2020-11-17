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
      <button class="mx-2" @click="$emit('open-login-modal')">Login</button>
      <button class="mx-2" @click="$emit('open-register-modal')">
        Register
      </button>
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import firebase from "../utilities/firebase";

export default {
  setup() {
    const list = [
      { title: "Home", to: "/" },
      { title: "Training Load", to: "/training-load" },
    ];

    const store = useStore();
    const isLoggedIn = computed(() => store.state.isLoggedIn);

    const logout = () => firebase.auth().signOut();

    return { list, isLoggedIn, logout };
  },
};
</script>

<style>
</style>