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
            <!-- Athlete Name -->
            <div class="text-5xl font-light text-indigo-700 text-center">
              {{ athleteName }}
            </div>

            <!-- Date -->
            <div class="flex justify-start my-4">
              <div class="border-b-2 border-indigo-500">
                <label class="mr-4">Date:</label>
                <input class="font-bold" type="text" v-model="wellnessDate" />
              </div>
            </div>

            <!-- Sleep -->
            <div class="mt-2">
              <p class="font-bold text-sm">Sleep</p>
              <div class="mx-auto py-1 flex justify-between flex-wrap">
                <div
                  v-for="number in numbers"
                  :key="number.text"
                  class="w-1/6 rounded-full m-1 p-2 cursor-pointer"
                  :class="[
                    `${number.color}`,
                    activeSleep === number.value
                      ? 'border-2 border-black'
                      : 'border-2 border-white',
                  ]"
                  @click="updateActiveSleep(number.value)"
                >
                  <p class="text-center text-xs text-white">
                    {{ number.text }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Stress -->
            <div class="mt-2">
              <p class="font-bold text-sm">Stress</p>
              <div class="mx-auto py-1 flex justify-between flex-wrap">
                <div
                  v-for="number in numbers"
                  :key="number.text"
                  class="w-1/6 rounded-full m-1 p-2 cursor-pointer"
                  :class="[
                    `${number.color}`,
                    activeStress === number.value
                      ? 'border-2 border-black'
                      : 'border-2 border-white',
                  ]"
                  @click="updateActiveStress(number.value)"
                >
                  <p class="text-center text-xs text-white">
                    {{ number.text }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Fatigue -->
            <div class="mt-2">
              <p class="font-bold text-sm">Fatigue</p>
              <div class="mx-auto py-1 flex justify-between flex-wrap">
                <div
                  v-for="number in numbers"
                  :key="number.text"
                  class="w-1/6 rounded-full m-1 p-2 cursor-pointer"
                  :class="[
                    `${number.color}`,
                    activeFatigue === number.value
                      ? 'border-2 border-black'
                      : 'border-2 border-white',
                  ]"
                  @click="updateActiveFatigue(number.value)"
                >
                  <p class="text-center text-xs text-white">
                    {{ number.text }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Soreness -->
            <div class="mt-2">
              <p class="font-bold text-sm">Soreness</p>
              <div class="mx-auto py-1 flex justify-between flex-wrap">
                <div
                  v-for="number in numbers"
                  :key="number.text"
                  class="w-1/6 rounded-full m-1 p-2 cursor-pointer"
                  :class="[
                    `${number.color}`,
                    activeSoreness === number.value
                      ? 'border-2 border-black'
                      : 'border-2 border-white',
                  ]"
                  @click="updateActiveSoreness(number.value)"
                >
                  <p class="text-center text-xs text-white">
                    {{ number.text }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Nutrition -->
            <div class="mt-2">
              <p class="font-bold text-sm">Nutrition</p>
              <div class="mx-auto py-1 flex justify-between flex-wrap">
                <div
                  v-for="number in numbers"
                  :key="number.text"
                  class="w-1/6 rounded-full m-1 p-2 cursor-pointer"
                  :class="[
                    `${number.color}`,
                    activeNutrition === number.value
                      ? 'border-2 border-black'
                      : 'border-2 border-white',
                  ]"
                  @click="updateActiveNutrition(number.value)"
                >
                  <p class="text-center text-xs text-white">
                    {{ number.text }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Submit -->
            <div class="m-auto w-1/2 my-2">
              <button
                @click="submit"
                class="p-2 w-full bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import WellnessService from "../services/WellnessService";

export default {
  props: ["athleteData"],
  setup(props, { emit }) {
    const numbers = [
      { text: "1", value: 1, color: "bg-blue-300" },
      { text: "2", value: 2, color: "bg-green-500" },
      { text: "3", value: 3, color: "bg-yellow-400" },
      { text: "4", value: 4, color: "bg-orange-600" },
      { text: "5", value: 5, color: "bg-red-600" },
    ];
    const athleteName = computed(
      () => `${props.athleteData.firstName} ${props.athleteData.lastName}`
    );
    const wellnessDate = ref(new Date().toLocaleString().split(",")[0]);
    const weekNumber = ref(1);
    const sleep = ref(1);
    const stress = ref(1);
    const fatigue = ref(1);
    const soreness = ref(1);
    const nutrition = ref(1);
    const activeSleep = ref(1);
    const activeStress = ref(1);
    const activeFatigue = ref(1);
    const activeSoreness = ref(1);
    const activeNutrition = ref(1);
    const average = computed(
      () =>
        (sleep.value +
          stress.value +
          fatigue.value +
          soreness.value +
          nutrition.value) /
        5
    );

    const week = computed(() => {
      const wellnessDateToIsoDate = wellnessDate.value;
      const parts = wellnessDateToIsoDate.split("/");
      const mydate = new Date(parts[2], parts[1] - 1, parts[0]);
      return new Date(mydate).getWeek();
    });

    const getWeekNumber = () => {
      const wellnessDateToIsoDate = wellnessDate.value;
      const parts = wellnessDateToIsoDate.split("/");
      const mydate = new Date(parts[2], parts[1] - 1, parts[0]);

      weekNumber.value = new Date(mydate).getWeek();
    };

    const reverseDate = (date) => {
      const parts = date.split("/");
      return parts[2] + "/" + parts[1] + "/" + parts[0];
    };

    Date.prototype.getWeek = function () {
      var seasonStart = new Date(this.getFullYear(), 8, 7);
      return Math.ceil(
        ((this - seasonStart) / 86400000 + seasonStart.getDay() + 1) / 7
      );
    };

    const close = () => {
      emit("close");
      emit("fetch");
    };
    const updateActiveSleep = (num) => {
      sleep.value = num;
      activeSleep.value = num;
    };
    const updateActiveStress = (num) => {
      stress.value = num;
      activeStress.value = num;
    };
    const updateActiveFatigue = (num) => {
      fatigue.value = num;
      activeFatigue.value = num;
    };
    const updateActiveSoreness = (num) => {
      soreness.value = num;
      activeSoreness.value = num;
    };
    const updateActiveNutrition = (num) => {
      nutrition.value = num;
      activeNutrition.value = num;
    };
    const submit = async () => {
      getWeekNumber();
      await WellnessService.createOne(
        props.athleteData._id,
        reverseDate(wellnessDate.value),
        weekNumber.value,
        athleteName.value,
        sleep.value,
        stress.value,
        fatigue.value,
        soreness.value,
        nutrition.value,
        average.value
      );
      close();
    };

    return {
      numbers,
      wellnessDate,
      week,
      athleteName,
      sleep,
      stress,
      fatigue,
      soreness,
      nutrition,
      average,
      activeSleep,
      activeStress,
      activeFatigue,
      activeSoreness,
      activeNutrition,
      close,
      updateActiveSleep,
      updateActiveStress,
      updateActiveFatigue,
      updateActiveSoreness,
      updateActiveNutrition,
      submit,
    };
  },
};
</script>

<style scoped>
</style>