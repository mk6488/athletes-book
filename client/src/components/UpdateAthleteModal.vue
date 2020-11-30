<template>
  <div>
    <section
      @click="close"
      class="z-20 h-screen w-screen bg-gray-500 fixed top-0 left-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-30 w-1/3 m-auto bg-white p-2 rounded-xl shadow-xl">
          <div class="p-2 border rounded">
            <!-- Something Here -->
            <h1>Something Here</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(_, { emit }) {
    const close = () => {
      emit("close");
      emit("fetch");
    };

    return { close };
  },
};
</script>

<style>
</style>