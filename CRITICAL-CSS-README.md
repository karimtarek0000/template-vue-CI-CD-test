# Critical CSS Optimization for Vue 3 + Vite SPA

This implementation provides a comprehensive critical CSS optimization solution for your Vue 3 Single Page Application built with Vite. It meets all your requirements for performance optimization while ensuring security and compatibility.

## Features ✨

- ✅ **Multi-viewport Critical CSS**: Generates critical CSS for desktop (1300x900) and mobile (375x667) viewports
- ✅ **Per-page Critical CSS**: Creates critical CSS for each route/page
- ✅ **Combined & Inlined**: Combines all critical CSS and inlines it in the HTML head
- ✅ **XSS Protection**: Sanitizes CSS content and uses CSP nonces for security
- ✅ **Duplicate Removal**: Removes critical CSS from main CSS files to avoid duplication
- ✅ **Lazy Loading**: Loads remaining CSS lazily after critical rendering
- ✅ **Above-the-fold Focus**: Uses Penthouse to extract only above-the-fold CSS
- ✅ **Tailwind Compatible**: Works with or without Tailwind CSS
- ✅ **Single Script Solution**: One main script handles all operations

## How It Works 🔧

### 1. Generation Process

The script performs these steps:

1. Builds your project using `npm run build`
2. Starts a preview server to analyze pages
3. Uses Penthouse to extract critical CSS for each route and viewport
4. Combines all critical CSS and removes duplicates
5. Injects the combined critical CSS inline into HTML with XSS protection
6. Removes critical CSS from main CSS files
7. Sets up lazy loading for remaining CSS

### 2. XSS Protection

- Sanitizes CSS content to remove potential XSS vectors
- Uses CSP nonces for inline styles
- Removes dangerous CSS properties and functions
- Validates all CSS content before injection

### 3. Above-the-fold Accuracy

- Uses Penthouse library for accurate above-the-fold detection
- Configures specific viewport dimensions for precise measurement
- Optimizes for both desktop and mobile viewports
- Removes non-critical CSS properties on mobile for better performance

## Usage 🚀

### Quick Start

```bash
# Generate critical CSS after building
npm run build:critical

# Or generate critical CSS for existing build
npm run critical:generate
```

### Available Scripts

- `npm run build:critical` - Build project and generate critical CSS
- `npm run critical:generate` - Generate critical CSS for existing build
- `npm run critical:analyze` - Generate with analysis mode

### Configuration

#### Routes Configuration

The script automatically processes these routes (customizable in `scripts/critical-css-generator.js`):

- `/` (Home)
- `/about` (About)
- `/services` (Services)
- `/blog` (Blog)
- `/contact` (Contact)

#### Viewport Configuration

Two viewports are configured by default:

- **Desktop**: 1300x900px
- **Mobile**: 375x667px

#### Customizing Routes and Viewports

Edit `scripts/critical-css-generator.js` to modify:

```javascript
// Add or modify routes
const routes = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/your-custom-route', name: 'custom' },
];

// Add or modify viewports
const viewports = [
  { name: 'desktop', width: 1300, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
];
```

## File Structure 📁

```
├── scripts/
│   └── critical-css-generator.js    # Main critical CSS generation script
├── plugins/
│   └── vite-plugin-critical-css.js  # Vite plugin for integration
├── critical/                        # Generated critical CSS files
│   └── combined-critical.css        # Final combined critical CSS
└── dist/                            # Built application with optimized CSS
    ├── index.html                   # HTML with inlined critical CSS
    └── assets/                      # CSS files with critical CSS removed
```

## Security Features 🔒

### XSS Prevention

The system includes comprehensive XSS protection:

1. **CSS Sanitization**: Removes dangerous CSS content:

   - Script tags
   - JavaScript protocols
   - CSS expressions
   - Malicious imports
   - IE behaviors
   - Mozilla bindings

2. **Content Security Policy**: Adds CSP headers with nonces for inline styles

3. **Input Validation**: Validates all CSS content before processing

## Performance Benefits 📈

### Before Optimization

- Large CSS files block rendering
- Flash of Unstyled Content (FOUC)
- Slower First Contentful Paint (FCP)
- Poor Core Web Vitals scores

### After Optimization

- Critical CSS inlined in HTML head
- Above-the-fold content renders immediately
- Non-critical CSS loads lazily
- Improved FCP and Largest Contentful Paint (LCP)
- Better Core Web Vitals scores

## Tailwind CSS Compatibility 🎨

The system works seamlessly with Tailwind CSS:

- Processes Tailwind utility classes correctly
- Handles responsive breakpoints appropriately
- Optimizes for both utility-first and component approaches
- Maintains Tailwind's purge/JIT benefits

## Monitoring and Debugging 🔍

### Generated Files

- Individual critical CSS files: `critical/{route}-{viewport}.css`
- Combined critical CSS: `critical/combined-critical.css`
- Modified main CSS: `dist/assets/*.css` (with critical CSS removed)

### Development Preview

Access critical CSS preview during development:

```
http://localhost:5173/critical-css-preview
```

### Size Analysis

The script outputs critical CSS size information:

```
📊 Combined critical CSS size: 12.34KB
```

## Best Practices 💡

1. **Run After Major CSS Changes**: Regenerate critical CSS when making significant style changes
2. **Test on Real Devices**: Verify critical CSS works correctly on actual mobile devices
3. **Monitor Performance**: Use tools like Lighthouse to measure improvement
4. **Keep Routes Updated**: Add new routes to the configuration when adding pages
5. **Regular Regeneration**: Include critical CSS generation in your CI/CD pipeline

## Troubleshooting 🛠️

### Common Issues

1. **Preview Server Won't Start**

   - Ensure port 4173 is available
   - Check if another Vite preview is running

2. **No CSS Files Found**

   - Verify the build completed successfully
   - Check that CSS files exist in `dist/assets/`

3. **Critical CSS Too Large**

   - Review your CSS for unnecessary above-the-fold styles
   - Consider splitting complex components

4. **Routes Not Found**
   - Ensure your Vue Router is configured correctly
   - Check that all routes are accessible

### Debug Mode

Run with environment variables for debugging:

```bash
DEBUG=true npm run critical:generate
```

## Advanced Configuration ⚙️

### Custom Penthouse Options

Modify the Penthouse configuration in `scripts/critical-css-generator.js`:

```javascript
const critical = await penthouse({
  url: `${this.baseURL}${route.path}`,
  cssFile: mainCSSFile,
  width: viewport.width,
  height: viewport.height,
  timeout: 30000,
  maxEmbeddedBase64Length: 1000,
  // Add custom options here
  forceInclude: ['.always-critical'],
  forceExclude: ['.never-critical'],
});
```

### Integration with CI/CD

Add to your deployment pipeline:

```yaml
# Example GitHub Actions
- name: Build and optimize
  run: npm run build:critical
```

## Support 🤝

For issues or questions:

1. Check the troubleshooting section
2. Review console output for error messages
3. Verify all dependencies are installed
4. Ensure routes are accessible

The system is designed to be robust and will continue working even if critical CSS generation fails, ensuring your application remains functional.
