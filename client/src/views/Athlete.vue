<template>
  <section class="flex flex-wrap w-full">
    <div class="m-auto">
      <h1 class="text-4xl my-5 text-center text-indigo-700">Athlete</h1>
      <!-- List of Training Loads -->
      <div>
        <div class="flex justify-around">
          <button
            @click="addPressed"
            class="text-indigo-700 border rounded hover:bg-indigo-500 hover:text-white p-2"
          >
            Add Athlete
          </button>
        </div>

        <div class="flex justify-between mb-2">
          <h1 class="text-indigo-700 p-2">Latest Athletes</h1>
          <h1 class="text-white bg-indigo-400 rounded-full p-2">
            {{ athleteCount }}
          </h1>
        </div>

        <p class="text-sm text-red-700" v-if="error">{{ error }}</p>
        <table class="w-full border-separate border border-green-800">
          <thead>
            <tr>
              <th class="border border-indigo-600 px-2">Name</th>
              <th class="border border-indigo-600 px-2">Squad</th>
              <th class="border border-indigo-600 px-2">Current</th>
              <th class="border border-indigo-600 px-2">Ref Load</th>
              <th class="border border-indigo-600 px-2">DofE</th>
              <th class="border border-indigo-600 px-2">D.O.B</th>
              <th class="border border-indigo-600 px-2">Age</th>
              <th class="border border-indigo-600 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="athlete in state.athletes" :key="athlete.id">
              <td
                class="border border-indigo-600 text-center text-xs px-2"
                :class="athlete.current === false ? 'text-red-700' : ''"
              >
                {{ athlete.firstName + " " + athlete.lastName }}
              </td>
              <td
                class="border border-indigo-600 text-center text-xs px-2"
                :class="athlete.current === false ? 'text-red-700' : ''"
              >
                {{ athlete.squad }}
              </td>
              <td
                class="border border-indigo-600 text-center text-xs px-2 cursor-pointer"
                :class="athlete.current === false ? 'text-red-700' : ''"
                @click="toggleCurrent(athlete._id, athlete.current)"
              >
                {{ athlete.current === true ? "✅ " : "⛔️" }}
              </td>
              <td
                class="border border-indigo-600 text-center text-xs px-2"
                :class="athlete.current === false ? 'text-red-700' : ''"
              >
                {{ athlete.refLoad }}
              </td>
              <td
                class="border border-indigo-600 text-center text-xs px-2"
                :class="athlete.current === false ? 'text-red-700' : ''"
              >
                {{ athlete.dofe }}
              </td>
              <td
                class="border border-indigo-600 text-center text-xs px-2"
                :class="athlete.current === false ? 'text-red-700' : ''"
              >
                {{ athlete.dob }}
              </td>
              <td
                class="border border-indigo-600 text-center text-xs px-2"
                :class="athlete.current === false ? 'text-red-700' : ''"
              >
                {{ age(athlete.dob) }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
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
                          : 'text-yellow-500'
                      "
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
  </section>
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
      console.log("opening Update Modal");
      // updateModalIsOpen.value = true;
    };

    const deletePressed = async (id) => {
      console.log(
        `changing the athlete with the id of ${id} to current = false`
      );
      // TODO: implement soft delete
      // await AthleteService.deleteOne(id);
      // state.trainingLoads = await AthleteService.getAll();
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
      deletePressed,
    };
  },
};
</script>

<style>
</style>