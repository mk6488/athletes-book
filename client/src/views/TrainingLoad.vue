<template>
  <section class="flex flex-wrap w-full">
    <div class="m-auto">
      <h1 class="text-4xl my-5 text-center text-indigo-700">Training Load</h1>

      <!-- Athlete Buttons -->
      <div class="flex flex-wrap">
        <div
          class="w-1/5 h-12 p-1"
          v-for="athlete in state.athletes"
          :key="athlete.firstName"
        >
          <button
            @click="pressed(athlete)"
            class="w-full h-full bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
          >
            {{ athlete.firstName }}
          </button>
        </div>
      </div>
      <LoadModal
        v-if="modalIsOpen"
        @close="modalIsOpen = false"
        @fetch="reloadData"
        :athlete="selectedAthlete"
      />

      <!-- List of Training Loads -->
      <div class="mt-10">
        <h1 class="text-indigo-700 mb-2">Latest Training Loads</h1>
        <p class="text-sm text-red-700" v-if="error">{{ error }}</p>
        <table class="w-full border-separate border border-green-800">
          <thead>
            <tr>
              <th class="border border-indigo-600">Date</th>
              <th class="border border-indigo-600">Athlete</th>
              <th class="border border-indigo-600">Type</th>
              <th class="border border-indigo-600">Duration</th>
              <th class="border border-indigo-600">RPE</th>
              <th class="border border-indigo-600">Load</th>
              <th class="border border-indigo-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="load in state.trainingLoads" :key="load.id">
              <td class="border border-indigo-600 text-center text-xs">
                {{
                  `${load.createdAt.getDate()}/${load.createdAt.getMonth()}/${load.createdAt.getFullYear()}`
                }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ load.athlete }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ load.type }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ `${load.duration} minutes` }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ `${load.rpe} of 10` }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ load.load }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                <div class="flex justify-evenly">
                  <Button><i class="fa fa-pencil text-orange-500"></i></Button>
                  <Button
                    ><i
                      class="fas fa-trash text-red-800"
                      @click="deleteTrainingLoad(load._id)"
                    ></i
                  ></Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div
          class="mx-auto flex flex-wrap my-6 justify-center items-center pt-6"
        >
          <ul class="flex items-center justify-center">
            <li
              class="mr-3 p-1 cursor-pointer rounded-full border-solid border-2 border-gray-400 hover:bg-indigo-100"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#818CF8"
                class="transform transition-transform duration-500 ease-in-out"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                ></path>
              </svg>
            </li>
            <li
              class="p-1 mr-3 rounded-full bg-indigo-500 h-8 w-8 text-white flex items-center justify-center cursor-pointer hover:bg-indigo-700"
            >
              1
            </li>
            <li
              class="p-1 mr-3 rounded-full cursor-pointer h-8 w-8 border-solid border-2 flex items-center justify-center border-gray-400 hover:bg-indigo-100"
            >
              2
            </li>
            <li
              class="p-1 mr-3 rounded-full cursor-pointer h-8 w-8 border-solid border-2 flex items-center justify-center border-gray-400 hover:bg-indigo-100"
            >
              3
            </li>
            <li
              class="p-1 mr-3 rounded-full cursor-pointer h-8 w-8 border-solid border-2 flex items-center justify-center border-gray-400 hover:bg-indigo-100"
            >
              4
            </li>
            <li
              class="p-1 mr-3 rounded-full cursor-pointer h-8 w-8 border-solid border-2 flex items-center justify-center border-gray-400 hover:bg-indigo-100"
            >
              5
            </li>
            <li
              class="p-1 mr-3 rounded-full cursor-pointer border-solid border-2 border-gray-400 hover:bg-indigo-100"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#818CF8"
                class="transform transition-transform duration-500 ease-in-out"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                ></path>
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import LoadModal from "../components/LoadModal";
import TrainingLoadService from "../services/TrainingLoadService";
import AthleteService from "../services/AthleteService";

export default {
  components: { LoadModal },
  setup() {
    const state = reactive({
      trainingLoads: [],
      athletes: {},
    });
    const error = ref("");
    const selectedAthlete = ref("");
    const modalIsOpen = ref(false);

    const pressed = (name) => {
      modalIsOpen.value = true;
      selectedAthlete.value = name;
    };

    const reloadData = async () => {
      state.trainingLoads = await TrainingLoadService.getAll();
    };

    const deleteTrainingLoad = async (id) => {
      await TrainingLoadService.deleteOne(id);
      state.trainingLoads = await TrainingLoadService.getAll();
    };

    onMounted(async () => {
      try {
        state.athletes = await AthleteService.getAll();
        state.trainingLoads = await TrainingLoadService.getAll();
      } catch (err) {
        error.value = err.message;
      }
    });

    return {
      state,
      error,
      selectedAthlete,
      pressed,
      reloadData,
      deleteTrainingLoad,
      modalIsOpen,
    };
  },
};
</script>

<style>
</style>