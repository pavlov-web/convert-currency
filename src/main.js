import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
Chart.defaults.set({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
});

createApp(App).use(store).mount("#app");
