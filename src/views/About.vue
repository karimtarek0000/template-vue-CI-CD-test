<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
    <!-- About Hero - Critical CSS will be different from Home -->
    <div class="relative bg-gradient-to-r from-green-600 to-blue-600 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Our Company
          </h1>
          <p class="mt-6 max-w-3xl mx-auto text-xl text-green-100">
            We're passionate about creating amazing web experiences with cutting-edge performance
            optimization. This About page has its own unique critical CSS requirements.
          </p>
          <div class="mt-8">
            <div class="inline-flex rounded-md shadow">
              <router-link
                to="/contact-us"
                class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Get in Touch
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- Decorative background -->
      <div class="absolute top-0 right-0 -mt-4 pr-4">
        <div class="text-9xl text-white opacity-10">📖</div>
      </div>
    </div>

    <!-- Mission Section -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Mission</h2>
            <p class="mt-3 max-w-3xl text-lg text-gray-500">
              We believe in the power of performance. Every millisecond matters when it comes to
              user experience, and we're dedicated to helping developers create lightning-fast web
              applications.
            </p>
            <div class="mt-8 space-y-6">
              <div v-for="value in values" :key="value.title" class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white"
                  >
                    <span class="text-xl">{{ value.icon }}</span>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">{{ value.title }}</h3>
                  <p class="mt-2 text-base text-gray-500">{{ value.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8 lg:mt-0">
            <div class="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg p-8 text-center">
              <div class="text-6xl text-white mb-4">🚀</div>
              <h3 class="text-2xl font-bold text-white mb-2">Performance First</h3>
              <p class="text-green-100">
                Our solutions help websites load 3x faster with critical CSS optimization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Team</h2>
          <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Meet the passionate developers behind our performance optimization tools.
          </p>
        </div>
        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="member in team"
            :key="member.name"
            class="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div
              class="bg-gradient-to-br from-indigo-400 to-purple-500 h-32 flex items-center justify-center"
            >
              <span class="text-4xl text-white">{{ member.avatar }}</span>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900">{{ member.name }}</h3>
              <p class="text-green-600 font-medium">{{ member.role }}</p>
              <p class="mt-2 text-gray-500">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const values = ref([
    {
      title: 'Performance Excellence',
      description:
        'We optimize every byte to ensure your users get the fastest possible experience.',
      icon: '⚡',
    },
    {
      title: 'Developer Experience',
      description: 'Our tools are built by developers, for developers, with simplicity in mind.',
      icon: '💻',
    },
    {
      title: 'Innovation',
      description: 'We stay ahead of the curve with the latest web performance techniques.',
      icon: '🔬',
    },
  ]);

  const team = ref([
    {
      name: 'Alex Chen',
      role: 'Performance Engineer',
      bio: 'Specialized in critical CSS optimization and web performance.',
      avatar: '👨‍💻',
    },
    {
      name: 'Sarah Johnson',
      role: 'Frontend Architect',
      bio: 'Expert in modern JavaScript frameworks and build optimization.',
      avatar: '👩‍💻',
    },
    {
      name: 'Mike Rodriguez',
      role: 'DevOps Engineer',
      bio: 'Focuses on deployment optimization and performance monitoring.',
      avatar: '👨‍🔧',
    },
  ]);
</script>
