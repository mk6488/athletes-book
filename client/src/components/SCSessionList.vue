<template>
  <div class="mt-10">
    <div class="flex flex-wrap justify-center">
      <!-- List of S&C Sessions -->
      <section>
        <div>
          <div class="flex justify-between mb-2">
            <h1 class="text-3xl text-indigo-700">S&C Sessions</h1>
            <h1 class="text-white bg-indigo-400 rounded-full p-2">
              {{ sessionCount }}
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
                  Incident
                </th>
                <th
                  class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cancelled
                </th>
                <th
                  class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="session in state.sessions" :key="session.id">
                <td class="px-3 py-4 text-sm">
                  {{ correct(session.sessionDate) }}
                </td>
                <td class="px-3 py-4 text-sm">
                  {{ session.weekNumber }}
                </td>
                <td class="px-3 py-4 text-sm">
                  <img
                    v-if="session.incident"
                    src="../assets/images/incident.jpg"
                    alt="cancelled"
                    class="h-5"
                  />
                </td>
                <td class="px-3 py-4 text-sm">
                  <img
                    v-if="session.cancelled"
                    src="../assets/images/cancelled.png"
                    alt="cancelled"
                    class="w-20"
                  />
                </td>
                <td class="px-3 py-4 text-sm">
                  <div class="flex justify-evenly">
                    <button>
                      <i
                        class="fa fa-eye text-indigo-900"
                        @click="updatePressed(session)"
                      ></i>
                    </button>
                    <button>
                      <i
                        class="fas fa-trash text-red-900"
                        @click="deletePressed(session._id)"
                      ></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    <!-- <teleport to="body">
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
    </teleport> -->
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import SCSessionService from "../services/SCSessionService";

export default {
  setup() {
    const state = reactive({
      sessions: [],
    });
    const error = ref("");
    const selectedSession = ref({});
    const viewSessionModalIsOpen = ref(false);
    const sessionCount = computed({
      get: () => state.sessions.length,
    });

    const correct = (date) => {
      const part = date.split("-");
      return `${part[2]}/${part[1]}/${part[0]}`;
    };

    const reloadData = async () => {
      state.sessions = await SCSessionService.getAll();
    };

    const updatePressed = (session) => {
      selectedSession.value = session;
      viewSessionModalIsOpen.value = true;
    };

    const deletePressed = async (id) => {
      await SCSessionService.deleteOne(id);
      state.wellness = await SCSessionService.getAll();
    };

    onMounted(async () => {
      try {
        state.sessions = await SCSessionService.getAll();
      } catch (err) {
        error.value = err.message;
      }
    });

    return {
      state,
      error,
      selectedSession,
      viewSessionModalIsOpen,
      sessionCount,
      correct,
      reloadData,
      updatePressed,
      deletePressed,
    };
  },
};
</script>

<style>
</style>