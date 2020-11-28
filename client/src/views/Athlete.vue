<template>
  <section class="flex flex-wrap w-full">
    <div class="m-auto">
      <h1 class="text-4xl my-5 text-center text-indigo-700">Athlete</h1>
      <!-- List of Training Loads -->
      <div>
        <div class="flex justify-between">
          <h1 class="text-indigo-700 mb-2 p-2">Latest Athletes</h1>
          <button
            @click="addPressed"
            class="text-indigo-700 mb-2 p-2 border rounded hover:bg-indigo-500 hover:text-white"
          >
            Add Athlete
          </button>
        </div>

        <p class="text-sm text-red-700" v-if="error">{{ error }}</p>
        <table class="w-full border-separate border border-green-800">
          <thead>
            <tr>
              <th class="border border-indigo-600">Name</th>
              <th class="border border-indigo-600">Squad</th>
              <th class="border border-indigo-600">Current</th>
              <th class="border border-indigo-600">Ref Load</th>
              <th class="border border-indigo-600">DofE</th>
              <th class="border border-indigo-600">D.O.B</th>
              <th class="border border-indigo-600">Age</th>
              <th class="border border-indigo-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="athlete in state.athletes" :key="athlete.id">
              <td
                class="border border-indigo-600 text-center text-xs px-2 py-1"
                :class="athlete.current === false ? 'text-red-700' : ''"
              >
                {{ athlete.firstName + " " + athlete.lastName }}
              </td>
              <td
                class="border border-indigo-600 text-center text-xs px-2 py-1"
                :class="athlete.current === false ? 'text-red-700' : ''"
              >
                {{ athlete.squad }}
              </td>
              <td
                class="border border-indigo-600 text-center text-xs px-2 py-1"
                :class="athlete.current === false ? 'text-red-700' : ''"
              >
                {{ athlete.current === true ? "✅ " : "⛔️" }}
              </td>
              <td
                class="border border-indigo-600 text-center text-xs px-2 py-1"
                :class="athlete.current === false ? 'text-red-700' : ''"
              >
                {{ athlete.refLoad }}
              </td>
              <td
                class="border border-indigo-600 text-center text-xs px-2 py-1"
                :class="athlete.current === false ? 'text-red-700' : ''"
              >
                {{ athlete.dofe }}
              </td>
              <td
                class="border border-indigo-600 text-center text-xs px-2 py-1"
                :class="athlete.current === false ? 'text-red-700' : ''"
              >
                {{ athlete.dob }}
              </td>
              <td
                class="border border-indigo-600 text-center text-xs px-2 py-1"
                :class="athlete.current === false ? 'text-red-700' : ''"
              >
                {{ age(athlete.dob) }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                <div class="flex justify-evenly">
                  <button>
                    <i
                      class="fa fa-pencil text-orange-500"
                      @click="updatePressed(athlete)"
                    ></i>
                  </button>
                  <button>
                    <i
                      class="fas fa-trash text-red-800"
                      @click="deletePressed(athlete._id)"
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
import { ref, reactive, onMounted } from "vue";
// import AthleteModal from "../components/AthleteModal";
// import UpdateAthleteModal from "../components/UpdateAthleteModal";
import AthleteService from "../services/AthleteService";

export default {
  // components: { AthleteModal, UpdateAthleteModal },
  setup() {
    const state = reactive({
      athletes: [],
    });
    const error = ref("");
    const selectedAthlete = ref({});
    const modalIsOpen = ref(false);
    const updateModalIsOpen = ref(false);

    const age = (dob) => {
      const parts = dob.split("/");
      const dobISO = new Date(parts[2], parts[1] - 1, parts[0]);
      return Math.floor((new Date() - dobISO) / 31557600000);
    };

    // Math.floor((new Date() - dob) / 365));

    const reloadData = async () => {
      state.athletes = await AthleteService.getAll();
    };

    const addPressed = () => {
      console.log("opening Modal");
      // modalIsOpen.value = true;
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
      age,
      reloadData,
      addPressed,
      updatePressed,
      deletePressed,
    };
  },
};
</script>

<style>
</style>