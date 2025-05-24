<template>
  <div
    id="app"
    class="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100"
  >
    <!-- Header Navigation - Critical above the fold -->
    <header
      class="relative sticky top-0 z-50 border-b shadow-sm bg-white/80 backdrop-blur-lg border-gray-200/50"
    >
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-2xl font-bold text-gray-900">YourBrand</h1>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:block">
            <div class="flex items-baseline ml-10 space-x-4">
              <router-link
                to="/"
                class="px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100"
              >
                Home
              </router-link>
              <router-link
                to="/about"
                class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                About
              </router-link>
              <router-link
                to="/services"
                class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                Services
              </router-link>
              <router-link
                to="/blog"
                class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                Blog
              </router-link>
              <router-link
                to="/contact"
                class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                Contact
              </router-link>
            </div>
          </nav>

          <!-- CTA Button -->
          <div class="hidden md:block">
            <button
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Get Started
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              class="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              @click="mobileMenuOpen = !mobileMenuOpen"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <router-link
              to="/"
              class="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </router-link>
            <router-link
              to="/about"
              class="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Add router-view to display the pages -->
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const mobileMenuOpen = ref(false);
</script>

<style>
  /* Global styles for full height viewport setup */
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
