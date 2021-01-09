<template>
  <div class="mt-10">
    <div class="flex justify-center items-center">
      <router-link to="/session"
        ><i class="fas fa-chevron-left text-indigo-700 mr-5">
          back</i
        ></router-link
      >
      <h1 class="text-3xl text-indigo-700">New Session</h1>
    </div>

    <section class="mt-5 flex justify-center">
      <!-- Date -->
      <div class="p-2 w-1/4">
        <div class="">
          <label class="mr-4">Date:</label>
          <input class="font-bold" type="date" v-model="sessionDate" />
        </div>
      </div>
      <!-- Session Type -->
      <div class="p-2 w-1/4">
        <div class="">
          <label class="mr-4">Session Type:</label>
          <select class="font-bold" v-model="sessionType">
            <option
              v-for="type in sessionTypes"
              :key="type.text"
              :value="type.value"
            >
              {{ type.text }}
            </option>
          </select>
        </div>
      </div>
    </section>
    <!-- SESSIONS -->
    <section class="mb-10">
      <div class="flex justify-center" v-if="sessionType === 'water'">
        <WaterSession />
      </div>
      <div class="flex justify-center" v-else-if="sessionType === 'sc'">
        <SCSession />
      </div>
      <div class="flex justify-center" v-else-if="sessionType === 'erg'">
        <ErgSession />
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import WaterSession from "../components/WaterSession";
import SCSession from "../components/SCSession";
import ErgSession from "../components/ErgSession";
import { sessionTypesArray } from "../js/sessionTypes";
import { now } from "../js/helpers";

export default {
  components: { WaterSession, SCSession, ErgSession },
  setup() {
    const sessionTypes = sessionTypesArray;
    const sessionType = ref("water");
    const sessionDate = ref(now.value);

    return { sessionTypes, sessionType, sessionDate };
  },
};
</script>

<style>
</style>