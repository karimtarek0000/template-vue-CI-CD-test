<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
    <!-- Services Hero - Critical CSS will be different -->
    <div class="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600">
      <div class="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Services
          </h1>
          <p class="max-w-3xl mx-auto mt-6 text-xl text-purple-100">
            Comprehensive web performance optimization services tailored to your needs. This
            Services page has unique critical CSS requirements for service cards.
          </p>
        </div>
      </div>
      <!-- Services decoration -->
      <div class="absolute top-0 right-0 pr-8 mt-8">
        <div class="text-white text-7xl opacity-10">⚙️</div>
      </div>
    </div>

    <!-- Services Grid - Critical above the fold -->
    <div class="py-16 bg-white">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-3">
          <div
            v-for="service in services"
            :key="service.id"
            class="overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-xl"
          >
            <div
              class="relative flex items-center justify-center h-48 bg-gradient-to-br from-purple-400 to-indigo-500"
            >
              <div class="text-6xl text-white">{{ service.icon }}</div>
              <div class="absolute top-4 right-4">
                <span
                  class="px-3 py-1 text-xs font-semibold text-white bg-white rounded-full bg-opacity-20"
                >
                  {{ service.category }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="mb-2 text-xl font-bold text-gray-900">{{ service.title }}</h3>
              <p class="mb-4 text-gray-600">{{ service.description }}</p>
              <div class="mb-6 space-y-2">
                <div
                  v-for="feature in service.features"
                  :key="feature"
                  class="flex items-center text-sm text-gray-700"
                >
                  <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ feature }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="text-2xl font-bold text-purple-600">{{ service.price }}</div>
                <button
                  class="px-4 py-2 text-white transition-colors duration-200 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Process Section -->
    <div class="py-16 bg-gray-50">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Process</h2>
          <p class="mt-4 text-xl text-gray-500">How we optimize your website's performance</p>
        </div>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="(step, index) in process" :key="step.title" class="text-center">
            <div class="relative">
              <div
                class="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold text-white rounded-full bg-gradient-to-br from-purple-500 to-indigo-500"
              >
                {{ index + 1 }}
              </div>
              <div
                v-if="index < process.length - 1"
                class="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2"
              ></div>
            </div>
            <h3 class="mb-2 text-lg font-semibold text-gray-900">{{ step.title }}</h3>
            <p class="text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const services = ref([
    {
      id: 1,
      title: 'Critical CSS Optimization',
      description: 'Extract and inline critical CSS for faster initial page rendering.',
      icon: '🚀',
      category: 'Performance',
      price: '$299',
      features: [
        'Above-the-fold CSS extraction',
        'Automated inlining',
        'Multi-page optimization',
        'Performance monitoring',
      ],
    },
    {
      id: 2,
      title: 'Bundle Optimization',
      description: 'Optimize your JavaScript and CSS bundles for maximum performance.',
      icon: '📦',
      category: 'Build',
      price: '$199',
      features: ['Code splitting', 'Tree shaking', 'Minification', 'Compression analysis'],
    },
    {
      id: 3,
      title: 'Image Optimization',
      description: 'Compress and optimize images for faster loading times.',
      icon: '🖼️',
      category: 'Assets',
      price: '$149',
      features: ['WebP conversion', 'Lazy loading setup', 'Responsive images', 'CDN integration'],
    },
    {
      id: 4,
      title: 'Performance Audit',
      description: "Comprehensive analysis of your website's performance metrics.",
      icon: '📊',
      category: 'Analysis',
      price: '$99',
      features: [
        'Core Web Vitals',
        'Lighthouse scoring',
        'Performance recommendations',
        'Detailed report',
      ],
    },
    {
      id: 5,
      title: 'Cache Strategy',
      description: 'Implement advanced caching strategies for better performance.',
      icon: '⚡',
      category: 'Infrastructure',
      price: '$249',
      features: [
        'Browser caching',
        'Service worker setup',
        'CDN configuration',
        'Cache invalidation',
      ],
    },
    {
      id: 6,
      title: 'Full Optimization Suite',
      description: 'Complete performance optimization package for enterprise sites.',
      icon: '🏆',
      category: 'Enterprise',
      price: '$999',
      features: [
        'All optimization services',
        'Custom implementation',
        'Ongoing monitoring',
        'Priority support',
      ],
    },
  ]);

  const process = ref([
    {
      title: 'Analysis',
      description: 'We analyze your current performance metrics and identify bottlenecks.',
    },
    {
      title: 'Strategy',
      description: 'Create a customized optimization strategy based on your specific needs.',
    },
    {
      title: 'Implementation',
      description: 'Execute the optimization plan with minimal disruption to your workflow.',
    },
    {
      title: 'Monitoring',
      description: 'Continuous monitoring and adjustments to maintain peak performance.',
    },
  ]);
</script>
