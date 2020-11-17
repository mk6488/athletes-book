<template>
  <div
    @click="$emit('close-register-modal')"
    class="z-20 h-screen w-screen bg-gray-200 fixed top-0 opacity-50"
  ></div>
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-30 m-auto bg-white p-2 rounded shadow-2xl w-1/3">
        <div class="p-2 border">
          <h1 class="text-2xl text-center text-indigo-700">Login</h1>
          <form class="p-2 my-2" @submit.prevent="submit">
            <div class="my-4">
              <label>First Name</label>
              <input
                ref="focuseRef"
                v-model="firstName"
                class="rounded shadow p-2 w-full"
                type="text"
                placeholder="Enter Your First Name"
              />
            </div>
            <div class="my-4">
              <label>Last Name</label>
              <input
                v-model="lastName"
                class="rounded shadow p-2 w-full"
                type="text"
                placeholder="Enter Your Last Name"
              />
            </div>
            <div class="my-4">
              <label>Email</label>
              <input
                v-model="email"
                class="rounded shadow p-2 w-full"
                type="email"
                placeholder="Enter Your Email"
              />
            </div>
            <div class="my-4">
              <label>Password</label>
              <input
                v-model="password"
                class="rounded shadow p-2 w-full"
                type="password"
                placeholder="Create A Password"
              />
            </div>
            <div class="my-4">
              <button
                class="w-full rounded shadow bg-gradient-to-r from-indigo-800 to-indigo-600 text-white p-2"
                type="submit"
              >
                <span v-if="!isLoading">Register</span>
                <span v-else>⌛︎</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
// import firebase from "../utilities/firebase";

export default {
  setup(_, { emit }) {
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const isLoading = ref(false);

    const focuseRef = ref(null);

    const submit = () => {
      isLoading.value = true;
      // register user
    };

    onMounted(() => focuseRef.value.focus());

    const close = () => emit("close-register-modal");

    return {
      firstName,
      lastName,
      email,
      password,
      isLoading,
      focuseRef,
      submit,
      close,
    };
  },
};
</script>

<style scoped>
</style>