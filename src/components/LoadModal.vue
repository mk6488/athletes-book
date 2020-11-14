<template>
  <section
    @click="close"
    class="z-20 h-screen w-screen bg-gray-500 fixed top-0 left-0 opacity-50"
  ></section>
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-30 m-auto bg-white p-2 rounded-xl shadow-xl">
        <div class="p-2 border rounded">
          <div class="text-5xl font-light text-indigo-700 text-center">
            {{ athlete }}
          </div>
          <!-- Duration -->
          <div class="my-10">
            <div class="value">
              <span>Time </span><span class="float-right">{{ duration }}</span>
            </div>
            <input
              v-model="duration"
              type="range"
              min="0"
              max="180"
              step="15"
            />
          </div>
          <!-- RPE -->
          <div class="my-10">
            <div class="value">
              <span>RPE</span>
              <span class="float-right">{{ rpe }}</span>
            </div>
            <input v-model="rpe" type="range" min="0" max="10" step="1" />
            <div
              class="my-5 text-lg w-full h-5 text-right"
              :class="`${rpeText[rpe].color}`"
            >
              {{ rpeText[rpe].title }}
            </div>
          </div>
          <!-- Calculation -->
          <div class="m-auto w-1/2">
            <button
              @click="pressed(athlete.firstName)"
              class="p-2 w-full bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: ["athlete"],
  setup(props, { emit }) {
    const rpeText = [
      { number: 0, title: "", color: "" },
      { number: 1, title: "Rest", color: "text-blue-400" },
      { number: 2, title: "Really Easy", color: "text-blue-400" },
      { number: 3, title: "Easy", color: "text-green-500" },
      { number: 4, title: "Moderate", color: "text-green-500" },
      { number: 5, title: "Challenging", color: "text-yellow-500" },
      { number: 6, title: "Quite Hard", color: "text-yellow-500" },
      { number: 7, title: "Hard", color: "text-yellow-500" },
      { number: 8, title: "Really Hard", color: "text-orange-500" },
      { number: 9, title: "Really Really Hard", color: "text-orange-500" },
      { number: 10, title: "Maximal", color: "text-red-700" },
    ];
    const duration = ref(60);
    const rpe = ref(3);
    const date = new Date().toLocaleString().split(",")[0];
    const load = computed(
      () => `${date} ${props.athlete} ${duration.value * rpe.value}`
    );

    const close = () => emit("close");

    return { duration, rpe, rpeText, load, close };
  },
};
</script>

<style scoped>
.value {
  color: #4c51bf;
  font-size: 2em;
  width: 400px;
  margin: 30px auto;
  letter-spacing: -0.03em;
}
input[type="range"] {
  display: block;
  -webkit-appearance: none;
  background-color: #bdc3c7;
  width: 400px;
  height: 5px;
  border-radius: 5px;
  margin: 0 auto;
  outline: 0;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: #4c51bf;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
input[type="range"]::-webkit-slider-thumb:hover {
  background-color: white;
  border: 2px solid #4c51bf;
}
input[type="range"]::-webkit-slider-thumb:active {
  transform: scale(1.6);
}
</style>