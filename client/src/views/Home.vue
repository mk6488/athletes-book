<template>
  <div class="mt-10">
    <div>
      <h1 class="text-3xl my-5 text-center text-indigo-700">Home</h1>
      <h5 class="text-center">Hello {{ user }}</h5>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import store from "../store/index";

export default {
  setup() {
    const user = computed(() => store.state.authUser.email);

    return { user };
  },
};
</script>

<style>
</style>