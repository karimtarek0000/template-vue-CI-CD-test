import { createHead } from '@vueuse/head';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/style.css';
import router from './router';

// Create app and head instances
const app = createApp(App);
const head = createHead();

// Use plugins
app.use(router);
app.use(head);

// Initialize app
app.mount('#app');
