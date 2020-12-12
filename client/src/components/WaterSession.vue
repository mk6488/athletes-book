<template>
  <div>
    <div>
      <label>
        Launch 1
        <input type="text" v-model="launchOne.coachOne" />
        <input type="text" v-model="launchOne.coachTwo" />
      </label>
    </div>
    <div>
      <label>
        Launch 2
        <input type="text" v-model="launchTwo.coachOne" />
        <input type="text" v-model="launchTwo.coachTwo" />
      </label>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const launchOne = reactive({
      coachOne: "",
      coachTwo: "",
    });
    const launchTwo = reactive({
      coachOne: "",
      coachTwo: "",
    });

    return { launchOne, launchTwo };
  },
};
</script>

<style>
</style>