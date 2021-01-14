<template>
  <div class="w-full my-10">
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
    <!-- Launches -->
    <div>
      <div class="text-center">Launch</div>
      <div class="flex w-1/2 mx-auto">
        <div class="w-1/2 bg-red-50 border text-center">
          <h1>Launch 1</h1>
          <select class="font-bold w-1/2 border" v-model="launch1.coach1">
            <option
              v-for="coach in coaches"
              :key="coach.name"
              :value="coach.name"
            >
              {{ coach.name }}
            </option>
          </select>
          <select class="font-bold w-1/2 border" v-model="launch1.coach2">
            <option
              v-for="coach in coaches"
              :key="coach.name"
              :value="coach.name"
            >
              {{ coach.name }}
            </option>
          </select>
        </div>
        <div class="w-1/2 bg-red-50 border text-center">
          <h1>Launch 2</h1>
          <select class="font-bold w-1/2 border" v-model="launch2.coach1">
            <option
              v-for="coach in coaches"
              :key="coach.name"
              :value="coach.name"
            >
              {{ coach.name }}
            </option>
          </select>
          <select class="font-bold w-1/2 border" v-model="launch2.coach2">
            <option
              v-for="coach in coaches"
              :key="coach.name"
              :value="coach.name"
            >
              {{ coach.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <!-- Crews -->
    <div>
      <div class="text-center">Crews</div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border text-center">Boat</div>
        <div class="w-1/6 border text-center">1</div>
        <div class="w-1/6 border text-center">2</div>
        <div class="w-1/6 border text-center">3</div>
        <div class="w-1/6 border text-center">4</div>
        <div class="w-1/6 border text-center">cox</div>
      </div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat1.name" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat1.rower1" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat1.rower2" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat1.rower3" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat1.rower4" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat1.cox" />
        </div>
      </div>
      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat2.name" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat2.rower1" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat2.rower2" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat2.rower3" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat2.rower4" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat2.cox" />
        </div>
      </div>
      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat3.name" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat3.rower1" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat3.rower2" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat3.rower3" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat3.rower4" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat3.cox" />
        </div>
      </div>
      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat4.name" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat4.rower1" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat4.rower2" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat4.rower3" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat4.rower4" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat4.cox" />
        </div>
      </div>
      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat5.name" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat5.rower1" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat5.rower2" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat5.rower3" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat5.rower4" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat5.cox" />
        </div>
      </div>
      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat6.name" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat6.rower1" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat6.rower2" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat6.rower3" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat6.rower4" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat6.cox" />
        </div>
      </div>
      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat7.name" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat7.rower1" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat7.rower2" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat7.rower3" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat7.rower4" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat7.cox" />
        </div>
      </div>
      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat8.name" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat8.rower1" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat8.rower2" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat8.rower3" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat8.rower4" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat8.cox" />
        </div>
      </div>
      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat9.name" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat9.rower1" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat9.rower2" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat9.rower3" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat9.rower4" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" v-model="boat9.cox" />
        </div>
      </div>
    </div>
    <!-- Outing Plan -->
    <div>
      <div class="text-center">Outing Plan</div>
      <div class="flex w-1/2 mx-auto bg-yellow-50">
        <textarea
          class="w-full border"
          rows="5"
          v-model="outingPlan"
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
    <!-- Next Outing -->
    <div>
      <div class="text-center">Next Outing Focuse</div>
      <div class="flex w-1/2 mx-auto bg-yellow-50">
        <textarea
          class="w-full border"
          rows="2"
          v-model="nextOuting"
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
import WaterSessionService from "../services/WaterSessionService";
import { coachesArray } from "../js/coaches.js";

export default {
  props: ["sessionDate"],
  setup(props) {
    const coaches = coachesArray;
    const cancelled = ref(false);
    const weather = reactive({
      time: "",
      wind: "",
      viz: "",
      perc: "",
      temps: "",
      qnh: "",
    });
    const launch1 = reactive({
      coach1: "",
      coach2: "",
    });
    const launch2 = reactive({
      coach1: "",
      coach2: "",
    });
    const boat1 = reactive({
      name: "",
      rower1: "",
      rower2: "",
      rower3: "",
      rower4: "",
      cox: "",
    });
    const boat2 = reactive({
      name: "",
      rower1: "",
      rower2: "",
      rower3: "",
      rower4: "",
      cox: "",
    });
    const boat3 = reactive({
      name: "",
      rower1: "",
      rower2: "",
      rower3: "",
      rower4: "",
      cox: "",
    });
    const boat4 = reactive({
      name: "",
      rower1: "",
      rower2: "",
      rower3: "",
      rower4: "",
      cox: "",
    });
    const boat5 = reactive({
      name: "",
      rower1: "",
      rower2: "",
      rower3: "",
      rower4: "",
      cox: "",
    });
    const boat6 = reactive({
      name: "",
      rower1: "",
      rower2: "",
      rower3: "",
      rower4: "",
      cox: "",
    });
    const boat7 = reactive({
      name: "",
      rower1: "",
      rower2: "",
      rower3: "",
      rower4: "",
      cox: "",
    });
    const boat8 = reactive({
      name: "",
      rower1: "",
      rower2: "",
      rower3: "",
      rower4: "",
      cox: "",
    });
    const boat9 = reactive({
      name: "",
      rower1: "",
      rower2: "",
      rower3: "",
      rower4: "",
      cox: "",
    });
    const outingPlan = ref("");
    const trainingResults = ref("");
    const nextOuting = ref("");
    const incident = ref("");

    const submit = async () => {
      // submit Water Session
      await WaterSessionService.createOne(
        props.sessionDate,
        cancelled.value,
        weather,
        launch1,
        launch2,
        boat1,
        boat2,
        boat3,
        boat4,
        boat5,
        boat6,
        boat7,
        boat8,
        boat9,
        outingPlan.value,
        trainingResults.value,
        nextOuting.value,
        incident.value
      );
    };

    return {
      coaches,
      cancelled,
      weather,
      launch1,
      launch2,
      boat1,
      boat2,
      boat3,
      boat4,
      boat5,
      boat6,
      boat7,
      boat8,
      boat9,
      outingPlan,
      trainingResults,
      nextOuting,
      incident,
      submit,
    };
  },
};
</script>

<style>
</style>