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
              <th class="border border-indigo-600">Week #</th>
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
                {{ load.trainingDate }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ load.weekNumber }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ load.athleteName }}
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
                  <button><i class="fa fa-pencil text-orange-500"></i></button>
                  <button>
                    <i
                      class="fas fa-trash text-red-800"
                      @click="deleteTrainingLoad(load._id)"
                    ></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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