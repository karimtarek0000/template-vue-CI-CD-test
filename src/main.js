import { createHead } from "@vueuse/head";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupPrefetching } from "./utils/prefetch";

// Create app and head instances
const app = createApp(App);
const head = createHead();

// Use plugins
app.use(router);
app.use(head);

// Setup route prefetching
setupPrefetching(router, {
  delay: 2000,
  priorityThreshold: 3,
});

// Initialize app
app.mount("#app");
