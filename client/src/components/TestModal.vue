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
            <!-- Athlete Name -->
            <div class="text-5xl font-light text-indigo-700 text-center">
              {{ athleteName }}
            </div>

            <!-- Date -->
            <div class="flex justify-start my-8">
              <div class="border-b-2 border-indigo-500">
                <label class="mr-4">Date:</label>
                <input class="font-bold" type="date" v-model="testDate" />
              </div>
            </div>

            <!-- Test -->
            <div class="my-14">
              <div class="flex">
                <label class="text-gray-400 w-1/4">Test:</label>
                <select
                  class="w-1/4 border-b-2 border-indigo-400"
                  v-model="test"
                >
                  <option
                    v-for="tst in tests"
                    :key="tst.text"
                    :value="tst.value"
                  >
                    {{ tst.text }}
                  </option>
                </select>
                <label class="text-gray-400 w-1/4 text-center">Result:</label>
                <input
                  class="w-1/4 border-b-2 border-indigo-400"
                  type="text"
                  v-model="result"
                />
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import TestService from "../services/TestService";
import { testsArray } from "../js/tests";
import { now, getWeekNumber } from "../js/helpers";

export default {
  props: ["athleteData"],
  setup(props, { emit }) {
    const tests = testsArray;
    const athleteName = computed(
      () => `${props.athleteData.firstName} ${props.athleteData.lastName}`
    );
    const testDate = ref(now.value);
    const test = ref("");
    const result = ref();

    const close = () => {
      emit("close");
      emit("fetch");
    };

    const submit = async () => {
      await TestService.createOne(
        props.athleteData._id,
        testDate.value,
        getWeekNumber(testDate.value),
        athleteName.value,
        test.value,
        result.value
      );
      close();
    };

    return {
      tests,
      athleteName,
      testDate,
      test,
      result,
      submit,
    };
  },
};
</script>