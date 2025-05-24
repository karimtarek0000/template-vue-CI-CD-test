<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
    <!-- Blog Hero - Different critical CSS needs -->
    <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600">
      <div class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Performance Blog
          </h1>
          <p class="max-w-3xl mx-auto mt-6 text-xl text-blue-100">
            Latest insights on web performance optimization, critical CSS, and modern development.
            This Blog page has unique article card layouts requiring different critical CSS.
          </p>
        </div>
      </div>
      <!-- Blog decoration -->
      <div class="absolute top-0 left-0 pl-8 mt-8">
        <div class="text-white text-7xl opacity-10">📝</div>
      </div>
    </div>

    <!-- Featured Article - Critical above the fold -->
    <div class="py-12 bg-white">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div
          class="overflow-hidden shadow-2xl bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl"
        >
          <div class="lg:flex">
            <div class="flex flex-col justify-center p-8 lg:w-1/2 lg:p-12">
              <div
                class="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-blue-800 bg-blue-100 rounded-full w-fit"
              >
                Featured Article
              </div>
              <h2 class="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
                {{ featuredArticle.title }}
              </h2>
              <p class="mb-6 text-lg text-blue-100">
                {{ featuredArticle.excerpt }}
              </p>
              <div class="flex items-center mb-6 text-sm text-blue-200">
                <span>{{ featuredArticle.author }}</span>
                <span class="mx-2">•</span>
                <span>{{ featuredArticle.date }}</span>
                <span class="mx-2">•</span>
                <span>{{ featuredArticle.readTime }} min read</span>
              </div>
              <button
                class="px-6 py-3 font-semibold text-blue-600 transition-colors duration-200 bg-white rounded-lg hover:bg-blue-50 w-fit"
              >
                Read Full Article
              </button>
            </div>
            <div class="relative lg:w-1/2">
              <div
                class="flex items-center justify-center h-64 lg:h-full bg-gradient-to-br from-blue-400 to-cyan-400"
              >
                <div class="text-white text-8xl opacity-20">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Articles Grid - Critical layout -->
    <div class="py-16 bg-gray-50">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900">Recent Articles</h2>
          <div class="flex space-x-4">
            <button
              v-for="category in categories"
              :key="category.name"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
                selectedCategory === category.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100',
              ]"
              @click="selectedCategory = category.name"
            >
              {{ category.name }}
            </button>
          </div>
        </div>

        <div class="grid gap-8 lg:grid-cols-3">
          <article
            v-for="article in filteredArticles"
            :key="article.id"
            class="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-1"
          >
            <div
              class="relative flex items-center justify-center h-48 bg-gradient-to-br from-blue-400 to-cyan-400"
            >
              <div class="text-4xl text-white">{{ article.icon }}</div>
              <div class="absolute top-4 left-4">
                <span
                  class="px-3 py-1 text-xs font-semibold text-white bg-white rounded-full bg-opacity-20"
                >
                  {{ article.category }}
                </span>
              </div>
              <div class="absolute text-sm text-white top-4 right-4">
                {{ article.readTime }} min
              </div>
            </div>
            <div class="p-6">
              <h3 class="mb-2 text-xl font-bold text-gray-900 line-clamp-2">{{ article.title }}</h3>
              <p class="mb-4 text-gray-600 line-clamp-3">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between mb-4 text-sm text-gray-500">
                <span>{{ article.author }}</span>
                <span>{{ article.date }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fill-rule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ article.views }}
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ article.likes }}
                  </span>
                </div>
                <button
                  class="px-4 py-2 text-white transition-colors duration-200 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  Read More
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Newsletter Section -->
    <div class="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
      <div class="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <h2 class="mb-4 text-3xl font-extrabold text-white">Stay Updated</h2>
        <p class="mb-8 text-xl text-blue-100">
          Get the latest performance optimization tips delivered to your inbox.
        </p>
        <div class="flex flex-col max-w-md gap-4 mx-auto sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-3 border-0 rounded-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
          />
          <button
            class="px-6 py-3 font-semibold text-blue-600 transition-colors duration-200 bg-white rounded-lg hover:bg-gray-100"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';

  const selectedCategory = ref('All');

  const featuredArticle = ref({
    title: 'The Complete Guide to Critical CSS Optimization',
    excerpt:
      'Learn how to implement critical CSS extraction for faster page loads and better Core Web Vitals scores.',
    author: 'Performance Team',
    date: 'May 20, 2025',
    readTime: 12,
  });

  const categories = ref([
    { name: 'All' },
    { name: 'Critical CSS' },
    { name: 'Performance' },
    { name: 'Bundle Optimization' },
    { name: 'Best Practices' },
  ]);

  const articles = ref([
    {
      id: 1,
      title: 'Multi-Page Critical CSS: Dynamic Route Optimization',
      excerpt:
        'Automatically generate critical CSS for all your application routes without manual configuration.',
      author: 'Alex Chen',
      date: 'May 18, 2025',
      readTime: 8,
      category: 'Critical CSS',
      icon: '🎯',
      views: '2.1k',
      likes: '156',
    },
    {
      id: 2,
      title: 'Measuring Core Web Vitals in Production',
      excerpt:
        'Set up real user monitoring to track your performance metrics and optimize based on actual user data.',
      author: 'Sarah Johnson',
      date: 'May 15, 2025',
      readTime: 10,
      category: 'Performance',
      icon: '📊',
      views: '1.8k',
      likes: '142',
    },
    {
      id: 3,
      title: 'Advanced Bundle Splitting Strategies',
      excerpt:
        'Learn sophisticated code splitting techniques to minimize bundle sizes and improve loading performance.',
      author: 'Mike Rodriguez',
      date: 'May 12, 2025',
      readTime: 15,
      category: 'Bundle Optimization',
      icon: '📦',
      views: '3.2k',
      likes: '267',
    },
    {
      id: 4,
      title: 'Image Optimization for Modern Web Apps',
      excerpt:
        'Implement responsive images, WebP conversion, and lazy loading for optimal image performance.',
      author: 'Emma Wilson',
      date: 'May 10, 2025',
      readTime: 7,
      category: 'Best Practices',
      icon: '🖼️',
      views: '1.5k',
      likes: '98',
    },
    {
      id: 5,
      title: 'CSS-in-JS Performance Considerations',
      excerpt:
        'Understand the performance implications of CSS-in-JS libraries and how to optimize them.',
      author: 'David Kim',
      date: 'May 8, 2025',
      readTime: 12,
      category: 'Critical CSS',
      icon: '🎨',
      views: '2.7k',
      likes: '203',
    },
    {
      id: 6,
      title: 'Service Worker Caching Strategies',
      excerpt:
        'Implement effective caching strategies using service workers for offline-first applications.',
      author: 'Lisa Park',
      date: 'May 5, 2025',
      readTime: 14,
      category: 'Performance',
      icon: '⚡',
      views: '1.9k',
      likes: '176',
    },
  ]);

  const filteredArticles = computed(() => {
    if (selectedCategory.value === 'All') {
      return articles.value;
    }
    return articles.value.filter((article) => article.category === selectedCategory.value);
  });
</script>
