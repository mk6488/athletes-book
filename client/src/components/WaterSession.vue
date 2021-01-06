<template>
  <div class="w-full flex justify-center">
    <div class="w-1/4">
      <div class="w-full border p-2">Launch 1</div>
      <div class="flex">
        <div class="w-1/2 border">
          <select class="font-bold w-full" v-model="launchOne.coachOne">
            <option
              v-for="coach in coaches"
              :key="coach.name"
              :value="coach.name"
            >
              {{ coach.name }}
            </option>
          </select>
        </div>
        <div class="w-1/2 border">
          <select class="font-bold w-full" v-model="launchOne.coachTwo">
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
    <div class="w-1/4">
      <div class="w-full border p-2">Launch 2</div>
      <div class="flex">
        <div class="w-1/2 border">
          <select class="font-bold w-full" v-model="launchTwo.coachOne">
            <option
              v-for="coach in coaches"
              :key="coach.name"
              :value="coach.name"
            >
              {{ coach.name }}
            </option>
          </select>
        </div>
        <div class="w-1/2 border">
          <select class="font-bold w-full" v-model="launchTwo.coachTwo">
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

    return { coaches, launchOne, launchTwo };
  },
};
</script>

<style>
</style>