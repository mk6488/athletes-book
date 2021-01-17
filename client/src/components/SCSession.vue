<template>
  <div class="w-full my-10">
    <!-- Cancelled -->
    <div>
      <div class="flex w-1/2 mx-auto">
        <label class="flex items-center cursor-pointer">
          <div class="px-2">Cancelled</div>
          <div class="relative">
            <input type="checkbox" class="hidden" v-model="cancelled" />
            <div
              class="toggle-path bg-gray-200 w-9 h-5 rounded-full shadow-inner"
            ></div>
            <div
              class="toggle-circle absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0"
            ></div>
          </div>
        </label>
      </div>
    </div>
    <!-- Weather -->
    <div>
      <div class="text-center">Weather</div>
      <div class="flex w-1/2 mx-auto bg-blue-50">
        <div class="w-1/6 border text-center">Time</div>
        <div class="w-1/6 border text-center">Wind</div>
        <div class="w-1/6 border text-center">Viz</div>
        <div class="w-1/6 border text-center">Perc</div>
        <div class="w-1/6 border text-center">Temps</div>
        <div class="w-1/6 border text-center">QNH</div>
      </div>
      <div class="flex w-1/2 mx-auto bg-blue-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="weather.time" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="weather.wind" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="weather.viz" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="weather.perc" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="weather.temps" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="weather.qnh" />
        </div>
      </div>
    </div>
    <!-- Attendees -->
    <div>
      <div class="text-center">Athlete Names</div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete1" />
        </div>
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete2" />
        </div>
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete3" />
        </div>
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete4" />
        </div>
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete5" />
        </div>
      </div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete6" />
        </div>
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete7" />
        </div>
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete8" />
        </div>
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete9" />
        </div>
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete10" />
        </div>
      </div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete11" />
        </div>
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete12" />
        </div>
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete13" />
        </div>
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete14" />
        </div>
        <div class="w-1/5 border px-2">
          <input type="text" class="w-full" v-model="attendees.athlete15" />
        </div>
      </div>
    </div>
    <!-- Training Plan -->
    <div>
      <div class="text-center">Training Plan</div>
      <div class="flex w-1/2 mx-auto bg-yellow-50">
        <textarea
          class="w-full border"
          rows="5"
          v-model="trainingPlan"
        ></textarea>
      </div>
    </div>
    <!-- Training Results -->
    <div>
      <div class="text-center">Training Results</div>
      <div class="flex w-1/2 mx-auto bg-yellow-50">
        <textarea
          class="w-full border"
          rows="5"
          v-model="trainingResults"
        ></textarea>
      </div>
    </div>
    <!-- Incident -->
    <div>
      <div class="text-center text-red-500">Incident</div>
      <div class="flex w-1/2 mx-auto bg-yellow-50">
        <textarea
          class="w-full border border-red-500"
          rows="2"
          v-model="incident"
        ></textarea>
      </div>
    </div>
    <!-- Submit -->
    <div class="m-auto w-1/2 my-2">
      <button
        @click="submit"
        class="p-2 w-full bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import SCSessionService from "../services/SCSessionService";
import { getWeekNumber } from "../js/helpers";

export default {
  props: ["sessionDate"],
  setup(props) {
    const cancelled = ref(false);
    const weather = reactive({
      time: "",
      wind: "",
      viz: "",
      perc: "",
      temps: "",
      qnh: "",
    });
    const attendees = reactive({
      athlete1: "",
      athlete2: "",
      athlete3: "",
      athlete4: "",
      athlete5: "",
      athlete6: "",
      athlete7: "",
      athlete8: "",
      athlete9: "",
      athlete10: "",
      athlete11: "",
      athlete12: "",
      athlete13: "",
      athlete14: "",
      athlete15: "",
    });
    const trainingPlan = ref("");
    const trainingResults = ref("");
    const incident = ref("");

    const submit = async () => {
      await SCSessionService.createOne(
        props.sessionDate,
        getWeekNumber(props.sessionDate),
        cancelled.value,
        weather,
        attendees,
        trainingPlan.value,
        trainingResults.value,
        incident.value
      );
      // goTo("/session");
    };

    return {
      cancelled,
      weather,
      attendees,
      trainingPlan,
      trainingResults,
      incident,
      submit,
    };
  },
};
</script>

<style>
</style>