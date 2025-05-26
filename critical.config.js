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

    // Ignore certain CSS rules to reduce size
    ignore: {
      atrule: ['@font-face', '@import'],
      rule: [/\.sr-only/, /\.hidden/, /\.lg:/, /\.xl:/, /\.2xl:/, /\.sm:only/, /\.md:only/],
      decl: (node, value) => {
        // Ignore large background images and complex animations
        return /url\(.+\)/.test(value) && value.length > 100;
      },
    },

    // Penthouse (critical CSS extraction engine) options
    penthouse: {
      timeout: 15000, // Reduced timeout for faster processing
      maxEmbeddedBase64Length: 500,
      renderWaitTime: 100, // Reduced wait time
      blockJSRequests: true, // Block JS for faster CSS extraction
      forceInclude: [
        // Always include these selectors in critical CSS
        '.btn',
        '.hero',
        '.header',
        '.nav',
        'h1',
        'h2',
        'h3',
        '.container',
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
