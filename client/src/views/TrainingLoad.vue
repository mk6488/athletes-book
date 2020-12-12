<template>
  <div class="mt-10">
    <div class="flex flex-wrap justify-center">
      <!-- Athlete Buttons -->
      <section>
        <div class="flex flex-wrap w-2/3 m-auto">
          <div
            class="w-1/5 h-12 p-1"
            v-for="athlete in state.athletes"
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
      </section>

      <!-- List of Training Loads -->
      <div class="mt-20">
        <div class="flex justify-between mb-2">
          <h1 class="text-3xl text-indigo-700">Training Loads</h1>
          <h1 class="text-white bg-indigo-400 rounded-full p-2">
            {{ trainingLoadsCount }}
          </h1>
        </div>
        <p class="text-sm text-red-700" v-if="error">{{ error }}</p>
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Week #
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Athlete
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Duration
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                RPE
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Load
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="load in state.trainingLoads" :key="load.id">
              <td class="px-3 py-4 text-sm">
                {{ correct(load.trainingDate) }}
              </td>
              <td class="px-3 py-4 text-sm">
                {{ load.weekNumber }}
              </td>
              <td class="px-3 py-4 text-sm">
                {{ load.athleteName }}
              </td>
              <td class="px-3 py-4 text-sm">
                {{ load.type }}
              </td>
              <td class="px-3 py-4 text-sm">
                {{ `${load.duration} minutes` }}
              </td>
              <td class="px-3 py-4 text-sm">
                {{ `${load.rpe} of 10` }}
              </td>
              <td class="px-3 py-4 text-sm">
                {{ load.load }}
              </td>
              <td class="px-3 py-4 text-sm">
                <div class="flex justify-evenly">
                  <button>
                    <i
                      class="fa fa-pencil text-indigo-900"
                      @click="updatePressed(load)"
                    ></i>
                  </button>
                  <button>
                    <i
                      class="fas fa-trash text-red-900"
                      @click="deletePressed(load._id)"
                    ></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <teleport to="body">
      <LoadModal
        v-if="modalIsOpen"
        @close="modalIsOpen = false"
        @fetch="reloadData"
        :athleteData="selectedAthlete"
      />
      <UpdateLoadModal
        v-if="updateModalIsOpen"
        @close="updateModalIsOpen = false"
        @fetch="reloadData"
        :loadData="selectedLoad"
      />
    </teleport>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import LoadModal from "../components/LoadModal";
import UpdateLoadModal from "../components/UpdateLoadModal";
import TrainingLoadService from "../services/TrainingLoadService";
import AthleteService from "../services/AthleteService";

export default {
  components: { LoadModal, UpdateLoadModal },
  setup() {
    const state = reactive({
      trainingLoads: [],
      athletes: {},
    });
    const error = ref("");
    const selectedAthlete = ref({});
    const selectedLoad = ref({});
    const modalIsOpen = ref(false);
    const updateModalIsOpen = ref(false);

    const trainingLoadsCount = computed({
      get: () => state.trainingLoads.length,
    });

    const correct = (date) => {
      const part = date.split("-");
      return `${part[2]}/${part[1]}/${part[0]}`;
    };

    const reloadData = async () => {
      state.trainingLoads = await TrainingLoadService.getAll();
    };

    const athletePressed = (name) => {
      modalIsOpen.value = true;
      selectedAthlete.value = name;
    };

    const updatePressed = (load) => {
      selectedLoad.value = load;
      updateModalIsOpen.value = true;
    };

    const deletePressed = async (id) => {
      await TrainingLoadService.deleteOne(id);
      state.trainingLoads = await TrainingLoadService.getAll();
    };

    onMounted(async () => {
      try {
        state.athletes = await AthleteService.getAllActive();
        state.trainingLoads = await TrainingLoadService.getAll();
      } catch (err) {
        error.value = err.message;
      }
    });

    return {
      state,
      error,
      selectedAthlete,
      selectedLoad,
      modalIsOpen,
      updateModalIsOpen,
      trainingLoadsCount,
      correct,
      reloadData,
      athletePressed,
      updatePressed,
      deletePressed,
    };
  },
};
</script>

<style>
</style>