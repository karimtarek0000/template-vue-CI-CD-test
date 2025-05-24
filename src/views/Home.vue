<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section - Critical for above the fold -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div
          class="relative z-10 pb-8 bg-gradient-to-r from-blue-600 to-purple-600 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
        >
          <main
            class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
          >
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span class="block xl:inline">Welcome to our</span>
                <span class="block text-yellow-300 xl:inline">Amazing Homepage</span>
              </h1>
              <p
                class="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                This is the home page with a unique layout that will generate its own critical CSS.
                Different pages have different above-the-fold content.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link
                    to="/about"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    Learn More
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <router-link
                    to="/contact-us"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    Contact Us
                  </router-link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div
          class="h-56 w-full bg-gradient-to-br from-purple-400 to-pink-400 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center"
        >
          <div class="text-6xl text-white opacity-50">🏠</div>
        </div>
      </div>
    </div>

    <!-- Features Section - Below the fold -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p
            class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            Why Choose Our Solution
          </p>
        </div>

        <div class="mt-10">
          <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div v-for="feature in features" :key="feature.name" class="relative">
              <div
                class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white"
              >
                <span class="text-xl">{{ feature.icon }}</span>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ feature.name }}</p>
              <p class="mt-2 ml-16 text-base text-gray-500">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-gray-50 pt-12 sm:pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by developers worldwide
          </h2>
          <p class="mt-3 text-xl text-gray-500 sm:mt-4">
            Our solution is used by thousands of developers to optimize their applications.
          </p>
        </div>
      </div>
      <div class="mt-10 pb-12 bg-white sm:pb-16">
        <div class="relative">
          <div class="absolute inset-0 h-1/2 bg-gray-50"></div>
          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto">
              <div class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-4">
                <div
                  v-for="stat in stats"
                  :key="stat.label"
                  class="border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r"
                >
                  <p class="text-5xl font-extrabold text-blue-600">{{ stat.value }}</p>
                  <p class="mt-2 text-lg font-medium text-gray-500">{{ stat.label }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const features = ref([
    {
      name: 'Fast Performance',
      description: 'Optimized for speed with critical CSS and lazy loading.',
      icon: '⚡',
    },
    {
      name: 'Mobile First',
      description: 'Responsive design that works perfectly on all devices.',
      icon: '📱',
    },
    {
      name: 'SEO Optimized',
      description: 'Built with SEO best practices for better search rankings.',
      icon: '🔍',
    },
    {
      name: 'Developer Friendly',
      description: 'Easy to use APIs and comprehensive documentation.',
      icon: '👨‍💻',
    },
  ]);

  const stats = ref([
    { value: '50K+', label: 'Downloads' },
    { value: '99%', label: 'Uptime' },
    { value: '1M+', label: 'API Calls' },
    { value: '24/7', label: 'Support' },
  ]);
</script>
