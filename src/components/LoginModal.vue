<template>
  <div>
    <section
      @click="closeLoginModel"
      class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-30 m-auto bg-white p-2 rounded-xl shadow-xl w-1/3">
          <div class="p-2 border rounded">
            <h1 class="text-2xl text-center mb-2">Login</h1>
            <GoogleLogin @close-login-from-google="closeLoginModal" />
            <p class="my-3 text-center">Or</p>
            <form @submit.prevent="submit">
              <div class="px-2 mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  v-model="email"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Email"
                  ref="emailRef"
                />
              </div>
              <div class="px-2 mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  v-model="password"
                  class="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div class="px-2 flex items-center justify-between">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
                <div
                  v-if="isLoading"
                  class="inline-block align-baseline loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"
                ></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import firebase from "../utilities/firebase";
import GoogleLogin from "../components/login/GoogleLogin";

export default {
  components: { GoogleLogin },
  setup(_, { emit }) {
    const email = ref("");
    const password = ref("");
    const isLoading = ref(false);

    onMounted(() => this.$refs.emailRef.focus());

    const submit = () => {
      this.isLoading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.email = "";
          this.password = "";
          this.isLoading = false;
          this.closeLoginModal();
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.message);
        });
    };

    const closeLoginModal = () => emit("close-login");

    return { email, password, isLoading, submit, closeLoginModal };
  },
};
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>