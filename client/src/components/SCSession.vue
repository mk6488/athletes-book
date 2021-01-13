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

    return { weather, attendees };
  },
};
</script>

<style>
</style>