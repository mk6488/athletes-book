<template>
  <div v-if="loginIsOpen">
    <section
      @click="close"
      class="z-20 h-screen w-screen bg-gray-200 fixed top-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-30 m-auto bg-white p-2 rounded shadow-2xl w-1/3">
          <div class="p-2 border">
            <h1 class="text-2xl text-center text-indigo-700">Login</h1>
            <form class="p-2 my-2" @submit.prevent="submit">
              <div class="my-4">
                <label
                  >Email
                  <input
                    ref="focuseRef"
                    v-model="email"
                    class="rounded shadow p-2 w-full"
                    type="text"
                  />
                </label>
              </div>
              <div class="my-4">
                <label
                  >Password
                  <input
                    v-model="password"
                    class="rounded shadow p-2 w-full"
                    type="password"
                  />
                </label>
              </div>
              <div class="my-4">
                <button
                  class="w-full rounded shadow bg-gradient-to-r from-indigo-800 to-indigo-600 text-white p-2"
                  type="submit"
                >
                  <span v-if="!isLoading">Login</span>
                  <span v-else>⌛︎</span>
                </button>
              </div>
              <div>
                <p>
                  Don't have an account?
                  <a href="#" class="text-indigo-700" @click="switchModal"
                    >Register here</a
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import firebase from "../utilities/firebase";
import store from "../store/index";

export default {
  setup() {
    const email = ref("mk3819@gmail.com");
    const password = ref("Mk@136041");
    const isLoading = ref(false);

    // const focuseRef = ref(null);

    const loginIsOpen = computed(() => store.state.loginIsOpen);

    const submit = () => {
      isLoading.value = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(() => {
          email.value = "";
          password.value = "";
          isLoading.value = false;
          close();
        });
    };

    // onMounted(() => focuseRef.value.focus());

    const close = () => store.commit("setLoginModal", false);
    const switchModal = () => {
      store.commit("setLoginModal", false);
      store.commit("setRegisterModal", true);
    };

    return {
      email,
      password,
      isLoading,
      loginIsOpen,
      submit,
      close,
      switchModal,
    };
  },
};
</script>

<style scoped>
</style>