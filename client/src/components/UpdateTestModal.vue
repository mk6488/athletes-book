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
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TestService from "../services/TestService";
import { testsArray } from "../js/tests";

export default {
  props: ["testData"],
  setup(props, { emit }) {
    const tests = testsArray;
    const testDate = ref("");
    const athleteName = ref("");
    const weekNumber = ref("");
    const test = ref("");
    const result = ref();

    onMounted(() => {
      testDate.value = props.testData.testDate;
      athleteName.value = props.testData.athleteName;
      test.value = props.testData.test;
      result.value = props.testData.result;
    });

    const getWeekNumber = () => {
      const testDateToIsoDate = testDate.value;
      const parts = testDateToIsoDate.split("-");
      const mydate = new Date(parts[0], parts[1] - 1, parts[2]);

      weekNumber.value = new Date(mydate).getWeek();
    };

    Date.prototype.getWeek = function () {
      var seasonStart = new Date(this.getFullYear(), 8, 7);
      return Math.ceil(
        ((this - seasonStart) / 86400000 + seasonStart.getDay() - 1) / 7
      );
    };

    const close = () => {
      emit("close");
      emit("fetch");
    };

    const submit = async () => {
      getWeekNumber();
      await TestService.updateOne(
        props.testData._id,
        testDate.value,
        weekNumber.value,
        test.value,
        result.value
      );
      close();
    };

    return {
      tests,
      athleteName,
      testDate,
      weekNumber,
      test,
      result,
      close,
      submit,
    };
  },
};
</script>