<template>
  <section class="myt-5 text-center">
    <button
      @click="loginWithGoogle"
      class="font-bold text-sm text-blue-500 hover:text-blue-800"
    >
      Login with Google
    </button>
  </section>
</template>

<script>
import firebase from "../../utilities/firebase";

export default {
  methods: {
    loginWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => this.$emit("close-login-from-google"));
    },
  },
};
</script>

<style>
</style>