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

      <!-- List of Training Loads -->
      <div class="mt-10">
        <h1 class="text-indigo-700 mb-2">Latest Wellness Figures</h1>
        <p class="text-sm text-red-700" v-if="error">{{ error }}</p>
        <table class="w-full border-separate border border-green-800">
          <thead>
            <tr>
              <th class="border border-indigo-600">Date</th>
              <th class="border border-indigo-600">Week #</th>
              <th class="border border-indigo-600">Athlete</th>
              <th class="border border-indigo-600">Sleep</th>
              <th class="border border-indigo-600">Stress</th>
              <th class="border border-indigo-600">Fatigue</th>
              <th class="border border-indigo-600">Soreness</th>
              <th class="border border-indigo-600">Nutrition</th>
              <th class="border border-indigo-600">Average</th>
              <th class="border border-indigo-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="wellness in state.wellnessFigs" :key="wellness.id">
              <td class="border border-indigo-600 text-center text-xs">
                {{ correctDate(wellness.wellnessDate) }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ wellness.weekNumber }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ wellness.athleteName }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ wellness.sleep }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ wellness.stress }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ wellness.fatigue }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ wellness.soreness }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ wellness.nutrition }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ wellness.average }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                <div class="flex justify-evenly">
                  <button>
                    <i
                      class="fa fa-pencil text-orange-500"
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
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import LoadModal from "../components/LoadModal";
import UpdateLoadModal from "../components/UpdateLoadModal";
import WellnessService from "../services/WellnessService";
import AthleteService from "../services/AthleteService";

export default {
  components: { LoadModal, UpdateLoadModal },
  setup() {
    const state = reactive({
      wellnessFigs: [],
      athletes: {},
    });
    const error = ref("");
    const selectedAthlete = ref({});
    const selectedWellness = ref({});
    const modalIsOpen = ref(false);
    const updateModalIsOpen = ref(false);

    const correctDate = (date) => {
      const parts = date.split("/");
      return parts[2] + "/" + parts[1] + "/" + parts[0];
    };

    const reloadData = async () => {
      state.wellnessFigs = await WellnessService.getAll();
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
      state.wellnessFigs = await WellnessService.getAll();
    };

    onMounted(async () => {
      try {
        state.athletes = await AthleteService.getAll();
        state.wellnessFigs = await WellnessService.getAll();
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