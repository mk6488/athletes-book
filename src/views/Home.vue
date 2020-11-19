<template>
  <section class="flex flex-wrap w-full">
    <div class="m-auto">
      <h1 class="text-4xl my-5 text-center text-indigo-700">Home</h1>
      <h5>Hello {{ user }}</h5>
    </div>
  </section>
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