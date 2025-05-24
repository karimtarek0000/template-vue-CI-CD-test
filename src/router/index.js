import { createRouter, createWebHistory } from 'vue-router';

// Import route components - adjust paths as needed for your project
import Home from '../views/Home.vue';
const ContactUs = () => import('../views/ContactUs.vue');
const About = () => import('../views/About.vue');
const Services = () => import('../views/Services.vue');
const Blog = () => import('../views/Blog.vue');

// Define routes with meta properties to indicate prefetching priority
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      prefetch: true, // Mark this route for prefetching
      priority: 1, // Highest priority (lower number = higher priority)
    },
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs,
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
