<template>
  <section class="full m-auto">
    <div>
      <h1 class="text-4xl my-5 text-center text-indigo-700">Dashboard</h1>
    </div>
    <div>
      <apexcharts
        width="1000"
        height="200"
        type="line"
        :options="chartOptions"
        :series="series"
      ></apexcharts>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import WellnessService from "../services/WellnessService";
import VueApexCharts from "vue3-apexcharts";

export default {
  components: { apexcharts: VueApexCharts },
  setup() {
    const dates = ref([]);
    const average = ref([]);

    const series = ref([]);
    const chartOptions = ref({});

    onMounted(() => {
      makeChart();
    });

    const makeChart = async (athleteId) => {
      const data = await WellnessService.getFor(athleteId);

      data.forEach((d) => {
        dates.value.push(correctDate(d.wellnessDate));
        average.value.push(d.average);
      });

      series.value = [{ name: "avg", data: average.value }];
      chartOptions.value = {
        stroke: { curve: "smooth" },
        chart: { id: "sleep" },
        xaxis: { categories: dates.value, tickAmount: 20 },
        yaxis: { min: 0, max: 5, tickAmount: 5, decimalsInFloat: 0 },
        colors: ["#9C27B0"],
      };
    };

    const correctDate = (date) => {
      const parts = date.split("/");
      return parts[2] + "/" + parts[1];
    };

    return {
      dates,
      average,
      makeChart,
      correctDate,
      series,
      chartOptions,
    };
  },
};
</script>

<style>
</style>