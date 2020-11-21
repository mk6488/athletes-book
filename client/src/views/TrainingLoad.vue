<template>
  <section class="flex flex-wrap w-full">
    <div class="m-auto">
      <h1 class="text-4xl my-5 text-center text-indigo-700">Training Load</h1>
      <div class="flex flex-wrap">
        <div
          class="w-1/5 h-12 p-1"
          v-for="athlete in athletes"
          :key="athlete.firstName"
        >
          <button
            @click="pressed(athlete)"
            class="w-full h-full bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
          >
            {{ athlete.firstName }}
          </button>
        </div>
      </div>
      <LoadModal
        v-if="modalIsOpen"
        @close="modalIsOpen = false"
        :athlete="selectedAthlete"
      />
      <div class="mt-10">
        <h1 class="text-indigo-700 mb-2">Latest Training Loads</h1>
        <p class="text-sm text-red-700" v-if="error">{{ error }}</p>
        <table class="w-full border-separate border border-green-800">
          <thead>
            <tr>
              <th class="border border-indigo-600">Date</th>
              <th class="border border-indigo-600">Athlete</th>
              <th class="border border-indigo-600">Type</th>
              <th class="border border-indigo-600">Duration</th>
              <th class="border border-indigo-600">RPE</th>
              <th class="border border-indigo-600">Load</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="load in trainingLoads" :key="load.id">
              <td class="border border-indigo-600 text-center text-xs">
                {{
                  `${load.createdAt.getDate()}/${load.createdAt.getMonth()}/${load.createdAt.getFullYear()}`
                }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ load.athlete }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ load.type }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ `${load.duration} minutes` }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ `${load.rpe} of 10` }}
              </td>
              <td class="border border-indigo-600 text-center text-xs">
                {{ load.load }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import LoadModal from "../components/LoadModal";
import TrainingLoadService from "../services/TrainingLoadService";

export default {
  components: { LoadModal },
  setup() {
    const trainingLoads = ref([]);
    const error = ref("");
    const athletes = [
      { firstName: "Andre", LastName: "Grady" },
      { firstName: "Bruno", LastName: "Kay" },
      { firstName: "Daniel", LastName: "Suart" },
      { firstName: "Finn", LastName: "Morrow" },
      { firstName: "Jakob", LastName: "Evans" },
      { firstName: "Jonathan", LastName: "Martini" },
      { firstName: "Kean", LastName: "Biggs" },
      { firstName: "Louis", LastName: "Benton" },
      { firstName: "Ned", LastName: "Simon" },
      { firstName: "Noah", LastName: "Hounsfield" },
      { firstName: "Oscar", LastName: "Benton" },
      { firstName: "Patrick", LastName: "Ainsley" },
      { firstName: "Rory", LastName: "Sinclair" },
      { firstName: "Rudy", LastName: "Down" },
      { firstName: "Sasha", LastName: "Tomlinson" },
    ];
    const selectedAthlete = ref("");
    const pressed = (name) => {
      modalIsOpen.value = true;
      selectedAthlete.value = name;
    };
    const modalIsOpen = ref(false);

    onMounted(async () => {
      try {
        trainingLoads.value = await TrainingLoadService.getAll();
      } catch (err) {
        error.value = err.message;
      }
    });

    return {
      trainingLoads,
      error,
      athletes,
      selectedAthlete,
      pressed,
      modalIsOpen,
    };
  },
};
</script>

<style>
</style>