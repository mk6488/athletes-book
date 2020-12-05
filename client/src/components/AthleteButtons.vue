<template>
  <div class="flex flex-wrap w-2/3 m-auto">
    <div
      class="w-1/5 h-12 p-1"
      v-for="athlete in props.athletes"
      :key="athlete.firstName"
    >
      <button
        @click="athletePressed(athlete)"
        class="shadow w-full h-full bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
      >
        {{ athlete.firstName }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["athletes"],
  setup() {
    const athletePressed = (athlete) => {
      console.log(athlete);
    };

    return { athletePressed };
  },
};
</script>