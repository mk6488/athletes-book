<template>
  <section class="flex flex-wrap w-full">
    <div class="m-auto">
      <h1 class="text-4xl my-5 text-center text-indigo-700">Wellness</h1>
      <!-- Athlete Buttons -->
      <div class="flex flex-wrap">
        <div
          class="w-1/5 h-12 p-1"
          v-for="athlete in state.athletes"
          :key="athlete.firstName"
        >
          <button
            @click="athletePressed(athlete)"
            class="w-full h-full bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
          >
            {{ athlete.firstName }}
          </button>
        </div>
      </div>

      <!-- List of Wellness -->
      <div class="mt-10">
        <div class="flex justify-between mb-2">
          <h1 class="text-indigo-700 p-2">Latest Wellness Data</h1>
          <h2 class="text-white bg-indigo-400 rounded-full p-2">
            {{ wellnessCount }}
          </h2>
        </div>
        <p class="text-sm text-red-700" v-if="error">{{ error }}</p>
        <table class="w-full border-separate border border-green-800">
          <thead>
            <tr>
              <th class="border border-indigo-600 px-2">Date</th>
              <th class="border border-indigo-600 px-2">Week #</th>
              <th class="border border-indigo-600 px-2">Athlete</th>
              <th class="border border-indigo-600 px-2">Sleep</th>
              <th class="border border-indigo-600 px-2">Stress</th>
              <th class="border border-indigo-600 px-2">Fatigue</th>
              <th class="border border-indigo-600 px-2">Soreness</th>
              <th class="border border-indigo-600 px-2">Nutrition</th>
              <th class="border border-indigo-600 px-2">Average</th>
              <th class="border border-indigo-600 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="wellness in state.wellness" :key="wellness.id">
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ correctDate(wellness.wellnessDate) }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ wellness.weekNumber }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ wellness.athleteName }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ wellness.sleep }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ wellness.stress }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ wellness.fatigue }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ wellness.soreness }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ wellness.nutrition }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ wellness.average }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
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