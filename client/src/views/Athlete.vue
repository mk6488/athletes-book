<template>
  <div class="flex flex-wrap w-full mt-10">
    <div class="m-auto">
      <!-- List of Training Loads -->
      <div>
        <div class="flex justify-between mb-2">
          <h1 class="text-3xl text-indigo-700">Athletes</h1>
          <button
            @click="addPressed"
            class="text-indigo-700 border rounded hover:bg-indigo-500 hover:text-white p-2 h-1/2"
          >
            Add Athlete
          </button>
          <h1 class="text-white bg-indigo-400 rounded-full p-2">
            {{ athleteCount }}
          </h1>
        </div>

        <p class="text-sm text-red-900" v-if="error">{{ error }}</p>
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Squad
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Current
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Weight
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                DofE
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                D.O.B
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Age
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="athlete in state.athletes" :key="athlete.id">
              <td
                class="px-3 py-4 text-sm"
                :class="athlete.current === false ? 'text-red-900' : ''"
              >
                {{ athlete.firstName + " " + athlete.lastName }}
              </td>
              <td
                class="px-3 py-4 text-sm"
                :class="athlete.current === false ? 'text-red-900' : ''"
              >
                {{ athlete.squad }}
              </td>
              <td
                class="px-3 py-4 cursor-pointer"
                :class="athlete.current === false ? 'text-red-900' : ''"
                @click="toggleCurrent(athlete._id, athlete.current)"
              >
                <i
                  v-if="athlete.current === false"
                  class="fas fa-ban text-red-900"
                ></i>
                <i v-else class="fas fa-check-circle text-green-400"></i>
              </td>
              <td
                class="px-3 py-4 text-sm"
                :class="athlete.current === false ? 'text-red-900' : ''"
              >
                {{ athlete.weight ? `${athlete.weight} kg` : "" }}
              </td>
              <td
                class="px-3 py-4 text-sm"
                :class="athlete.current === false ? 'text-red-900' : ''"
              >
                {{ athlete.dofe }}
              </td>
              <td
                class="px-3 py-4 text-sm"
                :class="athlete.current === false ? 'text-red-900' : ''"
              >
                {{ athlete.dob }}
              </td>
              <td
                class="px-3 py-4 text-sm"
                :class="athlete.current === false ? 'text-red-900' : ''"
              >
                {{ age(athlete.dob) }}
              </td>
              <td class="px-3 py-4 text-sm">
                <div class="flex justify-evenly">
                  <button
                    @click="updatePressed(athlete)"
                    :disabled="athlete.current === false"
                  >
                    <i
                      class="fa fa-pencil"
                      :class="
                        athlete.current === false
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-indigo-900'
                      "
                    >
                    </i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <teleport to="body">
      <AthleteModal
        v-if="modalIsOpen"
        @close="modalIsOpen = false"
        @fetch="reloadData"
      />
      <UpdateAthleteModal
        v-if="updateModalIsOpen"
        @close="updateModalIsOpen = false"
        @fetch="reloadData"
        :athleteData="selectedAthlete"
      />
    </teleport>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import AthleteModal from "../components/AthleteModal";
import UpdateAthleteModal from "../components/UpdateAthleteModal";
import AthleteService from "../services/AthleteService";

export default {
  components: { AthleteModal, UpdateAthleteModal },
  setup() {
    const state = reactive({
      athletes: [],
    });
    const error = ref("");
    const selectedAthlete = ref({});
    const modalIsOpen = ref(false);
    const updateModalIsOpen = ref(false);

    const athleteCount = computed({
      get: () => state.athletes.length,
    });

    const age = (dob) => {
      const parts = dob.split("/");
      const dobISO = new Date(parts[2], parts[1] - 1, parts[0]);
      return Math.floor((new Date() - dobISO) / 31557600000);
    };

    const reloadData = async () => {
      state.athletes = await AthleteService.getAll();
    };

    const addPressed = () => {
      modalIsOpen.value = true;
    };

    const toggleCurrent = async (id, current) => {
      if (current) {
        await AthleteService.toggleCurrent(id, false);
        reloadData();
      } else if (!current) {
        await AthleteService.toggleCurrent(id, true);
        reloadData();
      }
    };

    const updatePressed = (athlete) => {
      selectedAthlete.value = athlete;
      updateModalIsOpen.value = true;
    };

    onMounted(async () => {
      try {
        state.athletes = await AthleteService.getAll();
      } catch (err) {
        error.value = err.message;
      }
    });

    return {
      state,
      error,
      selectedAthlete,
      modalIsOpen,
      updateModalIsOpen,
      athleteCount,
      age,
      reloadData,
      addPressed,
      toggleCurrent,
      updatePressed,
    };
  },
};
</script>

<style>
</style>