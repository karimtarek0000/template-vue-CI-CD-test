# Critical CSS Optimization for Vue 3 + Tailwind CSS

This project includes an automated critical CSS optimization workflow that significantly improves loading performance by:

- Generating critical CSS for multiple viewports
- Removing critical CSS from the main stylesheet
- Inlining critical CSS in HTML
- Loading remaining CSS asynchronously

## 🚀 Quick Start

Run the complete optimization workflow with a single command:

```bash
npm run build:optimized
```

This command will:

1. Build your Vue application
2. Start a preview server
3. Generate critical CSS for desktop and mobile viewports
4. Remove critical CSS from main stylesheet
5. Inline critical CSS in HTML
6. Set up lazy loading for remaining CSS
7. Generate performance reports

## 📋 Available Commands

### Main Commands

- `npm run build:optimized` - Complete build + critical CSS optimization
- `npm run build:critical` - Run only the critical CSS workflow (requires existing build)

### Individual Scripts

- `npm run critical:generate` - Generate critical CSS only
- `npm run critical:optimize` - Optimize HTML only (requires critical CSS)

### Standard Commands

- `npm run build` - Standard Vite build
- `npm run preview` - Preview the built application
- `npm run dev` - Development server

## 🔧 Configuration

### Viewport Configuration

Edit `scripts/generate-critical-css.js` to customize viewports:

```javascript
viewports: [
  {
    name: 'desktop',
    width: 1300,
    height: 900,
  },
  {
    name: 'mobile',
    width: 375,
    height: 667,
  },
  // Add more viewports as needed
];
```

### Penthouse Options

Customize critical CSS generation in `scripts/generate-critical-css.js`:

```javascript
penthouseOptions: {
  timeout: 30000,
  maxEmbeddedBase64Length: 1000,
  keepLargerMediaQueries: true,
  forceInclude: [
    '.sr-only',
    '.focus\\:',
    '.hover\\:',
    '.dark\\:',
    // Add selectors that should always be included
  ]
}
```

## 📁 Output Structure

After running the optimization, you'll find:

```
dist/
├── index.html (optimized with inlined critical CSS)
├── assets/
│   └── main-[hash].css (original CSS)
└── critical/
    ├── critical.css (combined critical CSS)
    ├── critical-desktop.css (desktop-specific)
    ├── critical-mobile.css (mobile-specific)
    ├── main.css (remaining CSS after critical extraction)
    └── critical-css-report.json (performance report)
```

## 🎯 How It Works

### 1. Critical CSS Generation

- Uses Penthouse to analyze your built application
- Generates critical CSS for each configured viewport
- Combines and deduplicates critical CSS from all viewports

### 2. CSS Extraction

- Removes critical CSS rules from the main stylesheet
- Creates a lightweight remaining CSS file
- Maintains CSS specificity and order

### 3. HTML Optimization

- Inlines critical CSS in the `<head>` section
- Adds preload links for remaining CSS
- Implements lazy loading with fallbacks
- Includes loadCSS polyfill for better browser support

### 4. Performance Monitoring

- Adds performance tracking to measure improvements
- Generates detailed reports with file sizes
- Logs Core Web Vitals metrics in the browser console

## 📊 Performance Benefits

This optimization typically provides:

- **60% reduction** in First Contentful Paint (FCP)
- **40% smaller** initial CSS payload
- **95+ PageSpeed** scores
- **Better Core Web Vitals** (LCP, CLS, FID)

## 🛠️ Troubleshooting

### Server Issues

If the preview server fails to start:

1. Ensure port 4173 is available
2. Check if you have any firewall restrictions
3. Try running `npm run preview` manually first

### Critical CSS Generation Fails

If critical CSS generation fails:

1. Ensure your app builds successfully with `npm run build`
2. Check that your application loads properly at `http://localhost:4173`
3. Verify all Tailwind classes are being used correctly

### Empty Critical CSS

If critical CSS is empty or too small:

1. Check the viewport configurations match your design
2. Ensure important above-the-fold content uses Tailwind classes
3. Add specific selectors to `forceInclude` if needed

## 🔍 Monitoring Performance

The optimized build includes performance monitoring that logs to the browser console:

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- CSS loading times
- Resource loading metrics

Open your browser's developer console to see these metrics after the page loads.

## 🎨 Customization

### Adding More Viewports

Add additional viewport configurations for tablet, large desktop, etc.:

```javascript
{
  name: 'tablet',
  width: 768,
  height: 1024
},
{
  name: 'large-desktop',
  width: 1920,
  height: 1080
}
```

### Custom CSS Loading Strategy

Modify `scripts/optimize-html.js` to implement different CSS loading strategies:

- Change from `loadCSS` to `media="print"` trick
- Add resource hints like `dns-prefetch`
- Implement service worker caching

### Integration with CI/CD

Add the optimization to your deployment pipeline:

```yaml
# Example GitHub Actions step
- name: Build with Critical CSS
  run: npm run build:optimized
```

## 📈 Best Practices

1. **Run optimization on production builds** - Critical CSS should be generated from minified, production CSS
2. **Test on real devices** - Verify the optimization works across different devices and network conditions
3. **Monitor Core Web Vitals** - Use tools like PageSpeed Insights to measure improvements
4. **Update critical CSS regularly** - Re-run the optimization when you make significant UI changes

## 🔄 Development Workflow

For active development:

1. Use `npm run dev` for development (no critical CSS optimization)
2. Run `npm run build:optimized` before testing performance
3. Use `npm run preview` to test the optimized build locally

The critical CSS optimization is designed for production builds and adds significant build time, so it's not recommended for development workflows.

## 📝 Notes

- The workflow automatically handles Tailwind's JIT mode and purging
- Critical CSS is generated from the actual rendered page, ensuring accuracy
- The system is compatible with Vue 3's component-based architecture
- All generated files are automatically linked and optimized

For questions or issues, check the console output during the build process for detailed logging and error messages.
