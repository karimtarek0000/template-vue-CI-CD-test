<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
    <!-- Contact Hero - Unique critical CSS layout -->
    <div class="relative overflow-hidden bg-gradient-to-r from-orange-600 to-pink-600">
      <div class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Get In Touch
          </h1>
          <p class="max-w-2xl mx-auto mt-6 text-xl text-orange-100">
            Ready to optimize your website's performance? We'd love to hear from you. This contact
            page has its own distinct critical CSS optimizations.
          </p>
        </div>
      </div>
      <!-- Contact decoration -->
      <div class="absolute top-0 left-0 pl-4 mt-4">
        <div class="text-white text-8xl opacity-10">📧</div>
      </div>
    </div>

    <!-- Contact Form Section - Critical above the fold -->
    <div class="py-16 bg-white">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <div class="overflow-hidden bg-white rounded-lg shadow-2xl">
            <div class="px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500">
              <h2 class="text-2xl font-bold text-white">Send us a message</h2>
              <p class="mt-1 text-orange-100">We'll get back to you within 24 hours</p>
            </div>

            <form class="px-6 py-8 space-y-6" @submit.prevent="submitForm">
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  id="subject"
                  v-model="form.subject"
                  class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="performance">Performance Optimization</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Tell us about your project and how we can help..."
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  class="flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition-all duration-200 border border-transparent rounded-md shadow-sm bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  :disabled="isSubmitting"
                >
                  <span v-if="!isSubmitting">Send Message</span>
                  <span v-else class="flex items-center">
                    <svg
                      class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Info - Below the fold -->
    <div class="py-16 bg-gray-50">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Other Ways to Reach Us</h2>
          <p class="mt-4 text-lg text-gray-500">Choose the method that works best for you</p>
        </div>

        <div class="grid gap-8 mt-12 lg:grid-cols-3">
          <div
            v-for="contact in contactMethods"
            :key="contact.type"
            class="p-6 text-center bg-white rounded-lg shadow-md"
          >
            <div
              class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-orange-400 to-pink-400"
            >
              <span class="text-2xl text-white">{{ contact.icon }}</span>
            </div>
            <h3 class="mb-2 text-lg font-medium text-gray-900">{{ contact.type }}</h3>
            <p class="mb-4 text-gray-500">{{ contact.description }}</p>
            <p class="font-medium text-orange-600">{{ contact.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue';

  const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const isSubmitting = ref(false);

  const contactMethods = ref([
    {
      type: 'Email',
      description: 'Send us an email anytime',
      value: 'hello@example.com',
      icon: '✉️',
    },
    {
      type: 'Phone',
      description: 'Call us during business hours',
      value: '+1 (555) 123-4567',
      icon: '📞',
    },
    {
      type: 'Live Chat',
      description: 'Chat with our support team',
      value: 'Available 9AM-5PM PST',
      icon: '💬',
    },
  ]);

  const submitForm = async () => {
    isSubmitting.value = true;

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    Object.keys(form).forEach((key) => {
      form[key] = '';
    });

    isSubmitting.value = false;
    alert('Thank you! Your message has been sent.');
  };
</script>

<style scoped>
  .contact-us {
    /* Add any specific styles for the contact us page here */
  }
</style>
