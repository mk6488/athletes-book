<template>
  <div>
    <section
      @click="close"
      class="z-20 h-screen w-screen bg-gray-500 fixed top-0 left-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-30 w-1/3 m-auto bg-white p-2 rounded-xl shadow-xl">
          <div class="p-2 border rounded">
            <!-- Title -->
            <div class="text-5xl font-light text-indigo-700 text-center">
              New Athlete
            </div>

            <form class="px-2" @submit.prevent="submit">
              <!-- First Name -->
              <div class="my-6">
                <div class="flex items-center">
                  <label class="text-gray-400 w-1/4">First Name:</label>
                  <input
                    class="w-3/4 border-b-2 border-indigo-400"
                    type="text"
                    v-model="firstName"
                  />
                </div>
              </div>
              <!-- Last Name -->
              <div class="my-6">
                <div class="flex items-center">
                  <label class="text-gray-400 w-1/4">Last Name:</label>
                  <input
                    class="w-3/4 border-b-2 border-indigo-400"
                    type="text"
                    v-model="lastName"
                  />
                </div>
              </div>
              <!-- Squad -->
              <div class="my-6">
                <div class="flex items-center">
                  <label class="text-gray-400 w-1/4">Squad:</label>
                  <select
                    class="w-1/4 border-b-2 border-indigo-400"
                    v-model="squad"
                  >
                    <option
                      v-for="squad in squads"
                      :key="squad.text"
                      :value="squad.value"
                    >
                      {{ squad.text }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- Weight -->
              <div class="my-6">
                <div class="flex items-center">
                  <label class="text-gray-400 w-1/4">Weight:</label>
                  <input
                    class="w-1/4 border-b-2 border-indigo-400"
                    type="text"
                    v-model="weight"
                  />
                  <span class="text-gray-400 w-1/4">Kg</span>
                </div>
              </div>
              <!-- DofE -->
              <div class="my-6">
                <div class="flex items-center">
                  <label class="text-gray-400 w-1/4">DofE:</label>
                  <input
                    placeholder="number"
                    class="w-1/4 border-b-2 border-indigo-400"
                    type="text"
                    v-model="dofeNumber"
                  />
                  <label class="text-gray-400 w-1/4 text-center">Level:</label>
                  <select
                    class="w-1/4 border-b-2 border-indigo-400"
                    v-model="dofeLevel"
                  >
                    <option
                      v-for="lvl in dofeLevels"
                      :key="lvl.text"
                      :value="lvl.value"
                    >
                      {{ lvl.text }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- D.O.B -->
              <div class="my-6">
                <div class="flex items-center">
                  <label class="text-gray-400 w-1/4">D.O.B:</label>
                  <input
                    class="w-1/2 border-b-2 border-indigo-400"
                    type="date"
                    v-model="dob"
                  />
                </div>
              </div>
              <!-- Submit -->
              <div class="my-6">
                <input
                  class="p-2 w-full bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import AthleteService from "../services/AthleteService";

export default {
  setup(_, { emit }) {
    const squads = [
      { value: "", text: "" },
      { value: "J15", text: "J15" },
      { value: "J16", text: "J16" },
      { value: "J17", text: "J17" },
      { value: "J18", text: "J18" },
    ];
    const dofeLevels = [
      { value: "", text: "" },
      { value: "B", text: "Bronze" },
      { value: "S", text: "Silver" },
      { value: "G", text: "Gold" },
    ];
    const firstName = ref("");
    const lastName = ref("");
    const squad = ref("");
    const weight = ref();
    const current = ref(true);
    const refLoad = ref();
    const dofeNumber = ref("");
    const dofeLevel = ref("");
    const dob = ref("");

    const dofe = computed(() => `${dofeNumber.value} ${dofeLevel.value}`);

    const close = () => {
      emit("close");
      emit("fetch");
    };

    const submit = async () => {
      if (firstName.value && lastName.value) {
        refLoad.value = 1000;
        await AthleteService.createOne(
          firstName.value,
          lastName.value,
          squad.value,
          weight.value,
          current.value,
          refLoad.value,
          dofe.value,
          dob.value
        );
        close();
      } else {
        alert("First Name and Last Name are required fields.");
      }
    };

    return {
      squads,
      dofeLevels,
      firstName,
      lastName,
      squad,
      weight,
      dofeNumber,
      dofeLevel,
      dob,
      close,
      submit,
    };
  },
};
</script>

<style>
</style>