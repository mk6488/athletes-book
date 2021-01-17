<template>
  <div class="mt-10">
    <div class="flex justify-center items-start">
      <h1 class="text-3xl text-indigo-700">Sessions</h1>
      <router-link to="/new-session"
        ><i class="ml-2 far fa-calendar-plus text-indigo-700"></i
      ></router-link>
    </div>
    <section class="mt-5 flex justify-center">
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
    <!-- SESSION LISTS -->
    <section class="mb-10">
      <div class="flex justify-center" v-if="sessionType === 'water'">
        <WaterSessionList />
      </div>
      <div class="flex justify-center" v-else-if="sessionType === 'sc'">
        <SCSessionList />
      </div>
      <div class="flex justify-center" v-else-if="sessionType === 'erg'">
        <ErgSessionList />
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import WaterSessionList from "../components/WaterSessionList";
import SCSessionList from "../components/SCSessionList";
import ErgSessionList from "../components/ErgSessionList";
import { sessionTypesArray } from "../js/sessionTypes";

export default {
  components: { WaterSessionList, SCSessionList, ErgSessionList },
  setup() {
    const sessionTypes = sessionTypesArray;
    const sessionType = ref("water");

    return { sessionTypes, sessionType };
  },
};
</script>

<style>
</style>