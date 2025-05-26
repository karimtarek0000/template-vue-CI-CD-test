<template>
  <div class="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header Section -->
      <div class="mb-16 text-center">
        <h1 class="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">About Us</h1>
        <p class="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
          We're passionate about creating exceptional digital experiences that make a difference in
          people's lives.
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid items-center gap-12 mb-16 md:grid-cols-2">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Our Story</h2>
          <p class="leading-relaxed text-gray-600">
            Founded with a vision to bridge the gap between technology and human needs, we've been
            dedicated to crafting solutions that are both innovative and accessible.
          </p>
          <p class="leading-relaxed text-gray-600">
            Our team combines years of experience with fresh perspectives, ensuring that every
            project we undertake pushes boundaries while remaining grounded in practical value.
          </p>
        </div>
        <div class="relative">
          <div
            class="shadow-2xl aspect-square bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl"
          ></div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3">
        <div
          class="p-8 transition-shadow duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl"
        >
          <div class="flex items-center justify-center w-12 h-12 mb-6 bg-blue-100 rounded-lg">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-xl font-semibold text-gray-900">Innovation</h3>
          <p class="text-gray-600">Cutting-edge solutions that stay ahead of the curve.</p>
        </div>

        <div
          class="p-8 transition-shadow duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl"
        >
          <div class="flex items-center justify-center w-12 h-12 mb-6 bg-green-100 rounded-lg">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-xl font-semibold text-gray-900">Quality</h3>
          <p class="text-gray-600">Exceptional standards in every detail of our work.</p>
        </div>

        <div
          class="p-8 transition-shadow duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl sm:col-span-2 lg:col-span-1"
        >
          <div class="flex items-center justify-center w-12 h-12 mb-6 bg-purple-100 rounded-lg">
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-xl font-semibold text-gray-900">Community</h3>
          <p class="text-gray-600">Building connections that create lasting impact.</p>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="p-8 text-center bg-white shadow-xl rounded-2xl md:p-12">
        <h2 class="mb-6 text-3xl font-bold text-gray-900">Ready to Work Together?</h2>
        <p class="max-w-2xl mx-auto mb-8 text-gray-600">
          Let's create something amazing together. Reach out and let's start the conversation.
        </p>
        <button
          class="px-8 py-3 font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl"
        >
          Get In Touch
        </button>
      </div>
    </div>
  </div>
</template>
