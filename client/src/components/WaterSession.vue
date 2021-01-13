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
          <select class="font-bold w-1/2 border" v-model="launchOne.coachOne">
            <option
              v-for="coach in coaches"
              :key="coach.name"
              :value="coach.name"
            >
              {{ coach.name }}
            </option>
          </select>
          <select class="font-bold w-1/2 border" v-model="launchOne.coachTwo">
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
          <select class="font-bold w-1/2 border" v-model="launchTwo.coachOne">
            <option
              v-for="coach in coaches"
              :key="coach.name"
              :value="coach.name"
            >
              {{ coach.name }}
            </option>
          </select>
          <select class="font-bold w-1/2 border" v-model="launchTwo.coachTwo">
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
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
      </div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
      </div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
      </div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
      </div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
      </div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
      </div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
      </div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
      </div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
      </div>

      <div class="flex w-1/2 mx-auto bg-green-50">
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
        <div class="w-1/6 border px-2">
          <input type="text" class="w-full" />
        </div>
      </div>
    </div>
    <!-- Outing Plan -->
    <div>
      <div class="text-center">Outing Plan</div>
      <div class="flex w-1/2 mx-auto bg-yellow-50">
        <textarea class="w-full border" rows="5"></textarea>
      </div>
    </div>
    <!-- Training Results -->
    <div>
      <div class="text-center">Training Results</div>
      <div class="flex w-1/2 mx-auto bg-yellow-50">
        <textarea class="w-full border" rows="5"></textarea>
      </div>
    </div>
    <!-- Next Outing -->
    <div>
      <div class="text-center">Next Outing Focuse</div>
      <div class="flex w-1/2 mx-auto bg-yellow-50">
        <textarea class="w-full border" rows="2"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { coachesArray } from "../js/coaches.js";

export default {
  setup() {
    const coaches = coachesArray;
    const launchOne = reactive({
      coachOne: "",
      coachTwo: "",
    });
    const launchTwo = reactive({
      coachOne: "",
      coachTwo: "",
    });
    const weather = reactive({
      time: "",
      wind: "",
      viz: "",
      perc: "",
      temps: "",
      qnh: "",
    });

    return { coaches, launchOne, launchTwo, weather };
  },
};
</script>

<style>
</style>