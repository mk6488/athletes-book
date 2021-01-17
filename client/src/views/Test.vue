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

      <!-- List of Tests -->
      <div class="mt-20">
        <div class="flex justify-between mb-2">
          <h1 class="text-3xl text-indigo-700">Tests</h1>
          <h1 class="text-white bg-indigo-400 rounded-full p-2">
            {{ testsCount }}
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
                Test
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Result
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="test in state.tests" :key="test.id">
              <td class="px-3 py-4 text-sm">
                {{ correct(test.testDate) }}
              </td>
              <td class="px-3 py-4 text-sm">
                {{ test.weekNumber }}
              </td>
              <td class="px-3 py-4 text-sm">
                {{ test.athleteName }}
              </td>
              <td class="px-3 py-4 text-sm">
                {{ test.test }}
              </td>
              <td class="px-3 py-4 text-sm">
                {{ test.result }}
              </td>
              <td class="px-3 py-4 text-sm">
                <div class="flex justify-evenly">
                  <button>
                    <i
                      class="fa fa-pencil text-indigo-900"
                      @click="updatePressed(test)"
                    ></i>
                  </button>
                  <button>
                    <i
                      class="fas fa-trash text-red-900"
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
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { correct } from "../js/helpers";
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