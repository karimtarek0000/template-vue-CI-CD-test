# Vue 3 SPA with Critical CSS Automation

This project implements a complete automation flow for extracting and injecting Critical CSS into your Vue 3 Single Page Application (SPA) to optimize First Contentful Paint (FCP) and Largest Contentful Paint (LCP) performance metrics.

## 🚀 Features

- **Automated Critical CSS Extraction**: Extract above-the-fold CSS for multiple viewports and routes
- **SSG Integration**: Uses vite-ssg for static site generation with proper routing
- **Performance Optimization**: Intelligent CSS loading with preload hints and fallbacks
- **Multi-Viewport Support**: Mobile, tablet, and desktop responsive critical CSS
- **Performance Budgets**: 14KB budget monitoring with warnings and recommendations
- **Analysis Tools**: Comprehensive reporting and optimization suggestions
- **Zero Configuration**: Works out-of-the-box with sensible defaults

## 📦 Installation & Setup

All dependencies are already installed. The automation includes:

- `vite-ssg` - Static Site Generation for Vue 3
- `critical` - Critical CSS extraction engine
- `cheerio` - HTML manipulation for injection
- `fs-extra` - Enhanced file system operations

## 🛠️ Available Scripts

### Production Build with Critical CSS

```bash
npm run build:critical
```

Complete automation pipeline that:

1. Cleans previous build
2. Generates static site with vite-ssg
3. Extracts Critical CSS for all routes and viewports
4. Injects optimized Critical CSS into HTML files
5. Provides performance analysis and recommendations

### Individual Operations

```bash
# Build static site only
npm run build:ssg

# Extract and inject Critical CSS (requires existing build)
npm run critical:extract

# Analyze current Critical CSS implementation
npm run critical:analyze

# Preview the optimized build
npm run preview:ssg
```

## ⚙️ Configuration

Edit `critical.config.js` to customize:

```javascript
export default {
  // Routes to process
  routes: ['/', '/about', '/contact-us'],

  // Viewport configurations
  viewports: [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1440, height: 900, name: 'desktop' },
  ],

  // Performance budgets
  performance: {
    maxCriticalCssSize: 14000, // 14KB budget
    warningThreshold: 0.8, // Warn at 80% usage
  },

  // Critical CSS extraction options
  critical: {
    inline: false, // Manual injection for better control
    extract: false, // Don't modify original CSS files
    ignore: {
      atrule: ['@font-face', '@import'],
      rule: [/\.sr-only/, /\.hidden/],
    },
  },
};
```

## 📊 Performance Impact

The automation provides detailed performance analysis:

- **CSS Size Monitoring**: Tracks critical CSS size against 14KB budget
- **Network Impact**: Download time estimates for 3G/4G connections
- **FCP Predictions**: Performance improvement estimates based on CSS size
- **Optimization Suggestions**: Actionable recommendations for better performance

## 🎯 How It Works

### 1. Static Site Generation

Uses vite-ssg to pre-render your Vue 3 SPA into static HTML files for each route, enabling server-side CSS extraction.

### 2. Critical CSS Extraction

For each route and viewport combination:

- Loads the HTML file in a headless browser
- Identifies above-the-fold CSS selectors
- Extracts and optimizes the critical CSS rules
- Deduplicates across routes and viewports

### 3. CSS Injection & Optimization

- Injects critical CSS directly into `<head>` as inline styles
- Converts remaining CSS files to `preload` with proper fallbacks
- Adds performance hints and metadata
- Ensures graceful degradation with noscript tags

### 4. Performance Monitoring

- Analyzes critical CSS size against performance budgets
- Provides network impact estimates
- Generates optimization recommendations
- Tracks implementation across all routes

## 📈 Expected Performance Improvements

With properly optimized Critical CSS (under 14KB):

- **First Contentful Paint (FCP)**: 50-200ms improvement
- **Largest Contentful Paint (LCP)**: 100-500ms improvement
- **Cumulative Layout Shift (CLS)**: Reduced by preventing FOUC
- **Time to Interactive (TTI)**: Faster perceived loading

## 🔧 Advanced Usage

### Custom CSS Optimization

The automation includes intelligent CSS optimization:

- Duplicate rule removal across viewports
- Similar rule combination
- Unused CSS variable elimination (configurable)
- Minification with source maps

### Development Workflow

1. **Development**: Use `npm run dev` for normal Vue development
2. **Testing**: Run `npm run build:critical` to test with Critical CSS
3. **Analysis**: Use `npm run critical:analyze` to review implementation
4. **Preview**: Test with `npm run preview:ssg` before deployment

### Production Deployment

The `dist/` folder after running `npm run build:critical` contains:

- Optimized HTML files with inlined Critical CSS
- Preloaded CSS files for non-critical styles
- Proper fallbacks for JavaScript-disabled users
- Performance metadata for monitoring

## 📝 File Structure

```
scripts/
├── build-critical.js    # Main orchestration script
├── critical-css.js      # Critical CSS extraction and injection
└── analyze-critical.js  # Analysis and reporting tool

critical.config.js       # Configuration file
```

## 🐛 Troubleshooting

### Common Issues

1. **"No critical CSS extracted"**

   - Ensure HTML files exist in dist/
   - Check CSS file links in HTML
   - Verify viewport configurations

2. **"Budget exceeded"**

   - Reduce viewport count
   - Exclude non-essential CSS rules
   - Use smaller critical CSS scope

3. **"Missing noscript fallbacks"**
   - Run the automation again
   - Check for JavaScript errors during injection

### Performance Tips

- **Route-specific optimization**: Different routes may need different critical CSS
- **Viewport prioritization**: Focus on mobile-first critical CSS
- **Regular monitoring**: Use `npm run critical:analyze` regularly
- **A/B testing**: Measure real-world performance impact

## 🚀 Next Steps

After running the automation:

1. **Performance Testing**

   ```bash
   npm run preview:ssg
   # Test with Lighthouse, WebPageTest, or PageSpeed Insights
   ```

2. **Real User Monitoring**

   - Deploy to staging environment
   - Monitor Core Web Vitals
   - Compare before/after metrics

3. **Continuous Optimization**
   - Run automation on every deployment
   - Monitor budget usage over time
   - Adjust configuration based on analytics

## 📚 Additional Resources

- [Critical CSS Best Practices](https://web.dev/extract-critical-css/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Vue 3 Performance Guide](https://vuejs.org/guide/best-practices/performance.html)
- [Vite SSG Documentation](https://github.com/antfu/vite-ssg)

---

Your Vue 3 SPA is now equipped with enterprise-grade Critical CSS automation for optimal performance! 🎉
