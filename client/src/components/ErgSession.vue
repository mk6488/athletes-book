<template>
  <div class="w-full my-10">
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
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
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

    return { attendees };
  },
};
</script>

<style>
</style>