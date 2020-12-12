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
            <div class="flex justify-start my-4">
              <div class="border-b-2 border-indigo-500">
                <label class="mr-4">Date:</label>
                <input class="font-bold" type="date" v-model="commentDate" />
              </div>
            </div>

            <!-- Type -->
            <div class="mt-2">
              <div class="mx-auto py-1 flex justify-between flex-wrap">
                <div
                  v-for="type in commentTypes"
                  :key="type.text"
                  class="w-1/5 rounded-full m-1 p-2 cursor-pointer"
                  :class="[
                    `${type.color}`,
                    activeType === type.text
                      ? 'border-2 border-black'
                      : 'border-2 border-white',
                  ]"
                  @click="updateType(type.text)"
                >
                  <p class="text-center text-xs text-white">
                    {{ type.text }}
                  </p>
                </div>
              </div>
              <div class="h-5">
                <p v-if="!commentType" class="text-xs text-red-600 font-bold">
                  ** select a comment type **
                </p>
              </div>
            </div>

            <!-- Comment -->
            <div class="mt-2">
              <textarea
                v-model="comment"
                class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows="4"
              ></textarea>
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
import CommentService from "../services/CommentService";

export default {
  props: ["athleteData"],
  setup(props, { emit }) {
    const commentTypes = [
      { text: "General", color: "bg-green-200" },
      { text: "Training", color: "bg-indigo-300" },
      { text: "Medical", color: "bg-yellow-200" },
      { text: "Incident", color: "bg-red-200" },
    ];
    const commentDate = ref("");
    const weekNumber = ref();
    const commentType = ref("");
    const comment = ref("");
    const activeType = ref("");
    const athleteName = computed(
      () => `${props.athleteData.firstName} ${props.athleteData.lastName}`
    );

    const getWeekNumber = () => {
      const commentDateToIsoDate = commentDate.value;
      const parts = commentDateToIsoDate.split("-");
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

    const updateType = (name) => {
      commentType.value = name;
      activeType.value = name;
    };

    const submit = async () => {
      if (commentType.value && comment.value) {
        getWeekNumber();
        await CommentService.createOne(
          props.athleteData._id,
          commentDate.value,
          weekNumber.value,
          athleteName.value,
          commentType.value,
          comment.value
        );
        close();
      } else {
        alert("no type selected or no comment written!");
      }
    };

    return {
      commentDate,
      activeType,
      commentTypes,
      commentType,
      comment,
      athleteName,
      close,
      updateType,
      submit,
    };
  },
};
</script>

<style scoped>
</style>