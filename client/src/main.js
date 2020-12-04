import {
  createApp
} from 'vue'
import App from './App.vue'
import './assets/style.css'
import router from './router/index'
import store from './store/index'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueApexCharts)
app.mount("#app")