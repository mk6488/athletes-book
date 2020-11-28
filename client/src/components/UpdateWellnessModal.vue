<template>
  <div>
    <section
      @click="close"
      class="z-20 h-screen w-screen bg-gray-500 fixed top-0 left-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-30 m-auto bg-white p-2 rounded-xl shadow-xl">
          <div class="p-2 border rounded">
            <div class="text-5xl font-light text-indigo-700 text-center mb-2">
              {{ athleteName }}
            </div>
            <div><input type="text" v-model="wellnessDate" /></div>

            <h1>Buttons go here</h1>

            <!-- Submit -->
            <div class="m-auto w-1/2">
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
import { ref, computed, onMounted } from "vue";
import WellnessService from "../services/WellnessService";

export default {
  props: ["wellnessData"],
  setup(props, { emit }) {
    const athleteName = ref("Athlete Name");
    const wellnessDate = ref("");
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

    onMounted(() => {
      wellnessDate.value = reverseDate(props.wellnessData.wellnessDate);
      athleteName.value = props.wellnessData.athleteName;
      sleep.value = props.wellnessData.sleep;
      stress.value = props.wellnessData.stress;
      fatigue.value = props.wellnessData.fatigue;
      soreness.value = props.wellnessData.soreness;
      nutrition.value = props.wellnessData.nutrition;
      activeSleep.value = props.wellnessData.sleep;
      activeStress.value = props.wellnessData.stress;
      activeFatigue.value = props.wellnessData.fatigue;
      activeSoreness.value = props.wellnessData.soreness;
      activeNutrition.value = props.wellnessData.nutrition;
    });

    const reverseDate = (date) => {
      const parts = date.split("/");
      return parts[2] + "/" + parts[1] + "/" + parts[0];
    };

    const getWeekNumber = () => {
      const wellnessDateToIsoDate = wellnessDate.value;
      const parts = wellnessDateToIsoDate.split("/");
      const mydate = new Date(parts[2], parts[1] - 1, parts[0]);

      weekNumber.value = new Date(mydate).getWeek();
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
      await WellnessService.updateOne(
        props.wellnessData._id,
        reverseDate(wellnessDate.value),
        weekNumber.value,
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
      wellnessDate,
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