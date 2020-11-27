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
            <div><input type="text" v-model="trainingDate" /></div>
            <!-- Type -->
            <div>
              <div class="mx-auto py-1 flex justify-between flex-wrap">
                <div
                  v-for="type in types"
                  :key="type.text"
                  class="w-1/6 rounded m-1 p-2 cursor-pointer"
                  :class="[
                    `${type.color}`,
                    activeType === type.text ? 'border-2 border-black' : '',
                  ]"
                  @click="updateType(type.text)"
                >
                  <p class="text-center text-xs text-white">
                    {{ type.text }}
                  </p>
                </div>
              </div>
              <div class="h-5">
                <p v-if="!type" class="text-xs text-red-600 font-bold">
                  ** select a training type **
                </p>
              </div>
            </div>

            <!-- Duration -->
            <div>
              <div class="value">
                <span>Time </span
                ><span class="float-right">{{ duration }}</span>
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
            <div>
              <div class="value">
                <span>RPE</span>
                <span class="float-right">{{ rpe }}</span>
              </div>
              <input v-model="rpe" type="range" min="0" max="10" step="1" />
              <div
                class="my-5 text-lg w-full h-5 text-right font-semibold"
                :class="`${rpeText[rpe].color}`"
              >
                {{ rpeText[rpe].title }}
              </div>
            </div>

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
import TrainingLoadService from "../services/TrainingLoadService";

export default {
  props: ["loadData"],
  setup(props, { emit }) {
    const types = [
      {
        text: "Water",
        color: "bg-blue-400",
        hover: "bg-blue-500",
      },
      {
        text: "Erg",
        color: "bg-orange-400",
        hover: "bg-orange-500",
      },
      {
        text: "S&C",
        color: "bg-yellow-400",
        hover: "bg-yellow-500",
      },
      {
        text: "XT",
        color: "bg-green-400",
        hover: "bg-green-500",
      },
      {
        text: "Test",
        color: "bg-red-400",
        hover: "bg-red-500",
      },
    ];
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
    const trainingDate = ref("");
    const weekNumber = ref(1);
    const type = ref("");
    const duration = ref(60);
    const rpe = ref(3);
    const activeType = ref("");
    const athleteName = ref("Athlete Name");
    const load = computed(() => duration.value * rpe.value);

    onMounted(() => {
      trainingDate.value = reverseDate(props.loadData.trainingDate);
      athleteName.value = props.loadData.athleteName;
      type.value = props.loadData.type;
      duration.value = props.loadData.duration;
      rpe.value = props.loadData.rpe;
      activeType.value = props.loadData.type;
    });

    const reverseDate = (date) => {
      const parts = date.split("/");
      return parts[2] + "/" + parts[1] + "/" + parts[0];
    };

    const getWeekNumber = () => {
      const trainingDateToIsoDate = trainingDate.value;
      const parts = trainingDateToIsoDate.split("/");
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
    const updateType = (name) => {
      type.value = name;
      activeType.value = name;
    };
    const submit = async () => {
      getWeekNumber();
      await TrainingLoadService.updateOne(
        props.loadData._id,
        reverseDate(trainingDate.value),
        weekNumber.value,
        type.value,
        duration.value,
        rpe.value,
        load.value
      );
      close();
    };

    return {
      trainingDate,
      types,
      type,
      duration,
      rpe,
      rpeText,
      load,
      athleteName,
      activeType,
      close,
      updateType,
      submit,
    };
  },
};
</script>

<style scoped>
.value {
  color: #4c51bf;
  font-size: 1.4em;
  width: 400px;
  margin: 15px auto;
  letter-spacing: -0.03em;
}
input[type="range"] {
  display: block;
  -webkit-appearance: none;
  background-color: #bdc3c7;
  width: 400px;
  height: 3px;
  border-radius: 5px;
  margin: 0 auto;
  outline: 0;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: #4c51bf;
  width: 21px;
  height: 21px;
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
  transform: scale(1.3);
}
</style>