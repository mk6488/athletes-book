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
    <section class="mt-10">
      <!-- Date -->
      <div class="flex justify-center">
        <label>
          Date
          <input type="date" v-model="sessionDate" />
        </label>
      </div>
      <div class="flex justify-center">
        <label>
          Session type
          <select v-model="sessionType">
            <option value="water">Water</option>
            <option value="sc">S&C</option>
            <option value="erg">Erg</option>
          </select>
        </label>
      </div>

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
import { ref, computed } from "vue";
import WaterSession from "../components/WaterSession";
import SCSession from "../components/SCSession";
import ErgSession from "../components/ErgSession";

export default {
  components: { WaterSession, SCSession, ErgSession },
  setup() {
    const sessionType = ref("water");
    const now = computed(() => {
      const parts = new Date().toLocaleString().split(",")[0].split("/");
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    });
    const sessionDate = ref(now.value);

    return { sessionType, sessionDate };
  },
};
</script>

<style>
</style>