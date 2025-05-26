import { createHead } from '@vueuse/head';
import { ViteSSG } from 'vite-ssg';
import { createApp as createVueApp } from 'vue';
import App from './App.vue';
import './assets/style.css';
import router, { routes } from './router';

// For SSG build, use ViteSSG; for dev, fall back to regular Vue app
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
  },
  ({ app, router, routes, isClient, initialState }) => {
    // Setup head management
    const head = createHead();
    app.use(head);

    // Client-side only logic
    if (isClient) {
      // Any client-specific initialization
    }
  },
);

// Fallback for development mode
if (import.meta.env.DEV && typeof window !== 'undefined') {
  const app = createVueApp(App);
  const head = createHead();

  app.use(router);
  app.use(head);
  app.mount('#app');
}
