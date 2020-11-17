<template>
  <section class="flex flex-wrap w-full">
    <div class="m-auto">
      <h1 class="text-4xl my-5 text-center text-indigo-700">Training Load</h1>
      <div class="flex flex-wrap">
        <div
          class="w-1/5 h-12 p-1"
          v-for="athlete in athletes"
          :key="athlete.firstName"
        >
          <button
            @click="pressed(athlete.firstName)"
            class="w-full h-full bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
          >
            {{ athlete.firstName }}
          </button>
        </div>
      </div>
      <LoadModal
        v-if="modalIsOpen"
        @close="modalIsOpen = false"
        :athlete="selectedAthlete"
      />
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import LoadModal from "../components/LoadModal";

export default {
  components: { LoadModal },
  setup() {
    const athletes = [
      { firstName: "Andre", LastName: "Grady" },
      { firstName: "Bruno", LastName: "Kay" },
      { firstName: "Daniel", LastName: "Suart" },
      { firstName: "Finn", LastName: "Morrow" },
      { firstName: "Jakob", LastName: "Evans" },
      { firstName: "Jonathan", LastName: "Martini" },
      { firstName: "Kean", LastName: "Biggs" },
      { firstName: "Louis", LastName: "Benton" },
      { firstName: "Ned", LastName: "Simon" },
      { firstName: "Noah", LastName: "Hounsfield" },
      { firstName: "Oscar", LastName: "Benton" },
      { firstName: "Patrick", LastName: "Ainsley" },
      { firstName: "Rory", LastName: "Sinclair" },
      { firstName: "Rudy", LastName: "Down" },
      { firstName: "Sasha", LastName: "Tomlinson" },
    ];
    const selectedAthlete = ref("");
    const pressed = (name) => {
      modalIsOpen.value = true;
      selectedAthlete.value = name;
    };
    const modalIsOpen = ref(false);

    return {
      athletes,
      selectedAthlete,
      pressed,
      modalIsOpen,
    };
  },
};
</script>

<style>
</style>