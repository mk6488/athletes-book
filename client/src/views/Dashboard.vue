<template>
  <div class="mt-10">
    <div>
      <h1 class="text-4xl my-5 text-center text-indigo-700">Dashboard</h1>
    </div>
    <section>
      <div class="flex justify-center">
        <apexcharts
          width="1000"
          height="300"
          type="line"
          :options="chartOptions"
          :series="series"
        ></apexcharts>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import WellnessService from "../services/WellnessService";
import TrainingLoadService from "../services/TrainingLoadService";
import VueApexCharts from "vue3-apexcharts";

export default {
  components: { apexcharts: VueApexCharts },
  setup() {
    const series = ref([]);
    const chartOptions = ref({});
    const chart = reactive({
      dates: [],
      sleep: [],
      stress: [],
      fatigue: [],
      soreness: [],
      nutrition: [],
      average: [],
      load: [],
      sleepLoad: [],
    });

    onMounted(() => {
      makeChart();
      const sortedArray = chart.sleepLoad.sort((a, b) => {
        return a.date - b.date;
      });
      console.log(sortedArray);
    });

    const makeChart = async () => {
      const wellnessData = await WellnessService.getFor(
        "5fba2a3efd7460810fd6dc4d"
      );

      wellnessData.forEach((d) => {
        chart.dates.push(correct(d.wellnessDate));
        chart.sleep.push(d.sleep);
        chart.stress.push(d.stress);
        chart.fatigue.push(d.fatigue);
        chart.soreness.push(d.soreness);
        chart.nutrition.push(d.nutrition);
        chart.average.push(d.average);
      });

      const loadData = await TrainingLoadService.getFor(
        "5fba2a3efd7460810fd6dc4d"
      );
      loadData.forEach((d) => {
        chart.load.push({ date: d.trainingDate, load: d.load });
      });

      series.value = [
        { name: "avg", data: chart.average },
        { name: "sleep", data: chart.sleep },
        { name: "stress", data: chart.stress },
        { name: "fatigue", data: chart.fatigue },
        { name: "soreness", data: chart.soreness },
        { name: "nutrition", data: chart.nutrition },
      ];
      chartOptions.value = {
        title: {
          text: "Wellness",
          style: {
            fontSize: "24px",
            fontFamily: "Arial",
            fontWeight: "normal",
          },
        },
        stroke: {
          width: [6, 1, 1, 1, 1, 1],
          dashArray: [0, 5, 5, 5, 5, 5],
          colors: undefined,
          curve: "smooth",
        },
        tooltip: { enabled: true },
        chart: { id: "sleep" },
        xaxis: { categories: chart.dates, tickAmount: 20 },
        yaxis: { min: 0, max: 5, tickAmount: 5, decimalsInFloat: 0 },
      };
    };

    const correct = (date) => {
      const parts = date.split("-");
      return parts[2] + "/" + parts[1];
    };

    return {
      series,
      chartOptions,
      chart,
      makeChart,
      correct,
    };
  },
};
</script>

<style>
</style>