/**
 * Critical CSS Configuration
 * Customize these settings based on your project needs
 */

export default {
  // Build directories
  distDir: './dist',
  criticalCssFile: './dist/critical.css',

  // Routes to process for Critical CSS extraction
  routes: ['/', '/about'],

  // Optimized viewport configurations (reduced for better performance)
  viewports: [
    { width: 375, height: 667, name: 'mobile' },
    { width: 1440, height: 900, name: 'desktop' },
  ],

  // Critical CSS extraction options
  critical: {
    // Don't inline CSS, we'll inject it manually
    inline: false,

    // Extract and remove critical CSS from main stylesheet
    extract: false,

    // More aggressive ignore rules to reduce size
    ignore: {
      atrule: ['@font-face', '@import', '@keyframes'],
      rule: [
        /\.sr-only/,
        /\.hidden/,
        /\.lg:/,
        /\.xl:/,
        /\.2xl:/,
        /\.sm:only/,
        /\.md:only/,
        /hover:/, // Remove hover states from critical CSS
        /focus:/, // Remove focus states from critical CSS
        /transition-/, // Remove transitions from critical CSS
        /duration-/, // Remove animation durations
        /ease-/, // Remove easing functions
      ],
      decl: (node, value) => {
        // Ignore large background images, complex animations, and transitions
        if (/url\(.+\)/.test(value) && value.length > 100) return true;
        if (/transition|animation|transform/.test(node.prop)) return true;
        return false;
      },
    },

    // Penthouse (critical CSS extraction engine) options
    penthouse: {
      timeout: 15000,
      maxEmbeddedBase64Length: 500,
      renderWaitTime: 100,
      blockJSRequests: true,
      forceInclude: [
        // Always include these selectors in critical CSS
        '.min-h-screen',
        '.bg-gradient-to-br',
        '.from-blue-50',
        '.to-indigo-100',
        '.max-w-4xl',
        '.mx-auto',
        '.text-center',
        '.text-4xl',
        '.font-bold',
        '.text-gray-900',
        '.md\\:text-6xl',
        '.text-xl',
        '.text-gray-600',
        '.mb-6',
        '.mb-16',
        '.px-4',
        '.py-12',
        '.sm\\:px-6',
        '.lg\\:px-8',
        // About page specific above-the-fold elements
        '.grid',
        '.items-center',
        '.gap-12',
        '.md\\:grid-cols-2',
        '.space-y-6',
        '.text-3xl',
        '.leading-relaxed',
        '.aspect-square',
        '.from-indigo-500',
        '.to-purple-600',
        '.rounded-2xl',
        '.shadow-2xl',
      ],
    },
  },

  // Performance budgets and warnings
  performance: {
    // Critical CSS size budget (14KB is the recommended limit)
    maxCriticalCssSize: 14000,

    // Warn if critical CSS is larger than this percentage of the budget
    warningThreshold: 0.8,
  },

  // Advanced optimization options
  optimization: {
    // Remove duplicate CSS rules
    deduplicate: true,

    // Combine similar CSS rules
    combine: true,

    // Remove unused CSS variables
    removeUnusedVars: true,

    // Minify the extracted CSS
    minify: true,
  },
};
