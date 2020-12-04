<template>
  <section class="flex w-full mt-10">
    <div class="m-auto">
      <!-- Athlete Buttons -->
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

      <!-- List of Wellness -->
      <div class="mt-20">
        <div class="flex justify-between mb-2">
          <h1 class="text-4xl text-indigo-700">Wellness</h1>
          <h1 class="text-white bg-indigo-400 rounded-full p-2">
            {{ wellnessCount }}
          </h1>
        </div>
        <p class="text-sm text-red-700" v-if="error">{{ error }}</p>
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                scope="col"
                class="px-6 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Week #
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Athlete
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sleep
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stress
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Fatigue
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Soreness
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nutrition
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Average
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="wellness in state.wellness" :key="wellness.id">
              <td class="px-6 py-4 whitespace-nowrap">
                {{ correctDate(wellness.wellnessDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ wellness.weekNumber }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ wellness.athleteName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ wellness.sleep }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ wellness.stress }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ wellness.fatigue }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ wellness.soreness }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ wellness.nutrition }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ wellness.average }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex justify-evenly">
                  <button>
                    <i
                      class="fa fa-pencil text-yellow-500"
                      @click="updatePressed(wellness)"
                    ></i>
                  </button>
                  <button>
                    <i
                      class="fas fa-trash text-red-800"
                      @click="deletePressed(wellness._id)"
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
      <WellnessModal
        v-if="modalIsOpen"
        @close="modalIsOpen = false"
        @fetch="reloadData"
        :athleteData="selectedAthlete"
      />
      <UpdateWellnessModal
        v-if="updateModalIsOpen"
        @close="updateModalIsOpen = false"
        @fetch="reloadData"
        :wellnessData="selectedWellness"
      />
    </teleport>
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import WellnessModal from "../components/WellnessModal";
import UpdateWellnessModal from "../components/UpdateWellnessModal";
import WellnessService from "../services/WellnessService";
import AthleteService from "../services/AthleteService";

export default {
  components: { WellnessModal, UpdateWellnessModal },
  setup() {
    const state = reactive({
      wellness: [],
      athletes: {},
    });
    const error = ref("");
    const selectedAthlete = ref({});
    const selectedWellness = ref({});
    const modalIsOpen = ref(false);
    const updateModalIsOpen = ref(false);

    const wellnessCount = computed({
      get: () => state.wellness.length,
    });

    const correctDate = (date) => {
      const parts = date.split("/");
      return parts[2] + "/" + parts[1] + "/" + parts[0];
    };

    const reloadData = async () => {
      state.wellness = await WellnessService.getAll();
    };

    const athletePressed = (name) => {
      modalIsOpen.value = true;
      selectedAthlete.value = name;
    };

    const updatePressed = (wellness) => {
      selectedWellness.value = wellness;
      updateModalIsOpen.value = true;
    };

    const deletePressed = async (id) => {
      await WellnessService.deleteOne(id);
      state.wellness = await WellnessService.getAll();
    };

    onMounted(async () => {
      try {
        state.athletes = await AthleteService.getAllActive();
        state.wellness = await WellnessService.getAll();
      } catch (err) {
        error.value = err.message;
      }
    });

    return {
      state,
      error,
      selectedAthlete,
      selectedWellness,
      modalIsOpen,
      updateModalIsOpen,
      wellnessCount,
      correctDate,
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