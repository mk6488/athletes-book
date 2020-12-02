<template>
  <section class="flex flex-wrap w-full">
    <div class="m-auto">
      <h1 class="text-4xl my-5 text-center text-indigo-700">Tests</h1>
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

      <!-- List of Tests -->
      <div class="mt-10">
        <div class="flex justify-between mb-2">
          <h1 class="text-indigo-700 p-2">Latest Test Data</h1>
          <h2 class="text-white bg-indigo-400 rounded-full p-2">
            {{ testsCount }}
          </h2>
        </div>
        <p class="text-sm text-red-700" v-if="error">{{ error }}</p>
        <table class="w-full border-separate border border-green-800">
          <thead>
            <tr>
              <th class="border border-indigo-600 px-2">Date</th>
              <th class="border border-indigo-600 px-2">Week #</th>
              <th class="border border-indigo-600 px-2">Athlete</th>
              <th class="border border-indigo-600 px-2">Test</th>
              <th class="border border-indigo-600 px-2">Result</th>
              <th class="border border-indigo-600 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="test in state.tests" :key="test.id">
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ correctDate(test.testDate) }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ test.weekNumber }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ test.athleteName }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ test.test }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ test.result }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                <div class="flex justify-evenly">
                  <button>
                    <i
                      class="fa fa-pencil text-yellow-500"
                      @click="updatePressed(test)"
                    ></i>
                  </button>
                  <button>
                    <i
                      class="fas fa-trash text-red-800"
                      @click="deletePressed(test._id)"
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
      <TestModal
        v-if="modalIsOpen"
        @close="modalIsOpen = false"
        @fetch="reloadData"
        :athleteData="selectedAthlete"
      />
      <UpdateTestModal
        v-if="updateModalIsOpen"
        @close="updateModalIsOpen = false"
        @fetch="reloadData"
        :testData="selectedTest"
      />
    </teleport>
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import TestModal from "../components/TestModal";
import UpdateTestModal from "../components/UpdateTestModal";
import TestService from "../services/TestService";
import AthleteService from "../services/AthleteService";

export default {
  components: { TestModal, UpdateTestModal },
  setup() {
    const state = reactive({
      tests: [],
      athletes: {},
    });
    const error = ref("");
    const selectedAthlete = ref({});
    const selectedTest = ref({});
    const modalIsOpen = ref(false);
    const updateModalIsOpen = ref(false);

    const testsCount = computed({
      get: () => state.tests.length,
    });

    const correctDate = (date) => {
      const parts = date.split("/");
      return parts[2] + "/" + parts[1] + "/" + parts[0];
    };

    const reloadData = async () => {
      state.tests = await TestService.getAll();
    };

    const athletePressed = (name) => {
      modalIsOpen.value = true;
      selectedAthlete.value = name;
    };

    const updatePressed = (test) => {
      selectedTest.value = test;
      updateModalIsOpen.value = true;
    };

    const deletePressed = async (id) => {
      await TestService.deleteOne(id);
      state.tests = await TestService.getAll();
    };

    onMounted(async () => {
      try {
        state.athletes = await AthleteService.getAllActive();
        state.tests = await TestService.getAll();
      } catch (err) {
        error.value = err.message;
      }
    });

    return {
      state,
      error,
      selectedAthlete,
      selectedTest,
      modalIsOpen,
      updateModalIsOpen,
      testsCount,
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