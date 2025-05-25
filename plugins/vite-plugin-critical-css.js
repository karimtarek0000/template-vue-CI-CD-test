import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function criticalCSSPlugin(options = {}) {
  const {
    routes = [
      { path: '/', name: 'home' },
      { path: '/about', name: 'about' },
      { path: '/services', name: 'services' },
      { path: '/blog', name: 'blog' },
      { path: '/contact', name: 'contact' },
    ],
    viewports = [
      { name: 'desktop', width: 1300, height: 900 },
      { name: 'mobile', width: 375, height: 667 },
    ],
    generateInBuild = false,
    smartOptimization = true,
    thresholds = {
      criticalSizeKB: 14,
      largeSizeKB: 50,
      componentThreshold: 5,
    },
  } = options;

  let config;
  let isProduction = false;
  const cssAnalysis = new Map();

  // CSS content analysis function
  function analyzeCSSContent(cssContent, fileName) {
    const content = cssContent.toString();
    const sizeKB = Math.round((content.length / 1024) * 100) / 100;

    // Analyze CSS characteristics
    const characteristics = {
      hasAnimations: /(@keyframes|animation:|transition:)/gi.test(content),
      hasInteractive: /(:hover|:focus|:active|:visited)/gi.test(content),
      hasMediaQueries: /@media/gi.test(content),
      hasUtilities: /(\.p-|\.m-|\.w-|\.h-|\.text-|\.bg-)/gi.test(content),
      hasComponents: /\.(btn|card|modal|nav|header|footer)/gi.test(content),
      hasCriticalSelectors: /(html|body|#app|\.container)/gi.test(content),
    };

    // Determine priority based on analysis
    let priority = 'medium';
    let loadingStrategy = 'prefetch';

    if (sizeKB < thresholds.criticalSizeKB && characteristics.hasCriticalSelectors) {
      priority = 'high';
      loadingStrategy = 'inline-candidate';
    } else if (sizeKB > thresholds.largeSizeKB || characteristics.hasAnimations) {
      priority = 'low';
      loadingStrategy = 'prefetch';
    } else if (characteristics.hasInteractive || characteristics.hasComponents) {
      priority = 'medium';
      loadingStrategy = 'preload-low';
    }

    return {
      sizeKB,
      priority,
      loadingStrategy,
      characteristics,
      fileName,
    };
  }

  // Generate smart CSS loading based on analysis
  function generateSmartCSSLink(href, analysis, existingAttrs) {
    const { loadingStrategy } = analysis;

    switch (loadingStrategy) {
      case 'prefetch':
        // Use prefetch with a more efficient loading pattern
        return `<link rel="prefetch" href="${href}" as="style" ${existingAttrs} onload="this.rel='stylesheet';this.onload=null;">`;

      case 'preload-low':
        return `<link rel="prefetch" href="${href}" as="style" ${existingAttrs} onload="this.rel='stylesheet';this.onload=null;">`;

      case 'preload-high':
        return `<link rel="preload" href="${href}" as="style" fetchpriority="high" ${existingAttrs} onload="this.onload=null;this.rel='stylesheet'">`;

      case 'inline-candidate':
        return `<link rel="prefetch" href="${href}" as="style" ${existingAttrs} onload="this.rel='stylesheet';this.onload=null;">`;

      default:
        return `<link rel="prefetch" href="${href}" as="style" ${existingAttrs} onload="this.rel='stylesheet';this.onload=null;">`;
    }
  }

  // Fallback analysis for files not processed by generateBundle
  function getDefaultAnalysis(href) {
    const fileName = path.basename(href);

    if (fileName.includes('critical') || fileName.includes('above-fold')) {
      return { priority: 'high', loadingStrategy: 'preload-high' };
    } else if (fileName.includes('component') || fileName.includes('interactive')) {
      return { priority: 'medium', loadingStrategy: 'preload-low' };
    }
    return { priority: 'low', loadingStrategy: 'prefetch' };
  }

  return {
    name: 'critical-css-smart',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      isProduction = resolvedConfig.command === 'build';
    },

    // Analyze CSS during build
    generateBundle(outputOptions, bundle) {
      if (!isProduction || !smartOptimization) {
        return;
      }

      // Analyze CSS assets and determine smart loading strategy
      Object.keys(bundle).forEach((fileName) => {
        if (fileName.endsWith('.css')) {
          const asset = bundle[fileName];
          if (asset.type === 'asset') {
            const analysis = analyzeCSSContent(asset.source, fileName);
            cssAnalysis.set(fileName, analysis);

            console.log(`📊 CSS Analysis for ${fileName}:`);
            console.log(`   Size: ${analysis.sizeKB}KB`);
            console.log(`   Priority: ${analysis.priority}`);
            console.log(`   Strategy: ${analysis.loadingStrategy}`);
          }
        }
      });
    },

    // Smart HTML transformation
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        if (!isProduction || !smartOptimization) {
          return html;
        }

        // Check for different types of critical CSS implementations
        const hasInlinedCSS = html.includes('<style nonce=') || html.includes('<style>');
        const hasImportantCSS = html.includes('critical.css') || html.includes('above-fold.css');

        return html.replace(
          /<link\s+([^>]*\s+)?rel="stylesheet"([^>]*\s+)?href="([^"]*\.css)"[^>]*>/gi,
          (match, beforeRel, afterRel, href) => {
            const fileName = path.basename(href);
            const analysis = cssAnalysis.get(fileName) || getDefaultAnalysis(href);

            // Prevent duplicate loading scenarios
            if (
              hasInlinedCSS &&
              fileName.includes('index-') &&
              analysis.sizeKB > thresholds.criticalSizeKB
            ) {
              console.log(
                `🎯 Skipping duplicate CSS load for ${fileName} (already inlined as critical CSS)`,
              );
              return '<!-- CSS already inlined as critical CSS -->';
            }

            // If this is a tiny CSS file that's likely already included elsewhere, skip it
            if (analysis.sizeKB < 0.1) {
              console.log(
                `🎯 Skipping tiny CSS file ${fileName} (${analysis.sizeKB}KB - likely duplicate)`,
              );
              return '<!-- Tiny CSS file skipped to prevent duplication -->';
            }

            // Extract existing attributes
            const existingAttrs = match
              .replace(/<link\s+/, '')
              .replace(/\s*\/?>$/, '')
              .replace(/rel="stylesheet"/, '')
              .replace(/href="[^"]*"/, '')
              .trim();

            // Use more efficient loading pattern
            const smartLink = generateSmartCSSLink(href, analysis, existingAttrs);
            console.log(`🔗 Smart CSS loading for ${fileName}: ${analysis.loadingStrategy}`);
            return smartLink;
          },
        );
      },
    },

    writeBundle: {
      order: 'post',
      async handler() {
        if (!isProduction || !generateInBuild) {
          return;
        }

        const { execSync } = await import('child_process');
        try {
          console.log('🎨 Generating critical CSS...');
          execSync('node scripts/critical-css-generator.js', {
            cwd: config.root,
            stdio: 'inherit',
          });
        } catch (error) {
          console.warn('⚠️ Critical CSS generation failed:', error.message);
        }
      },
    },

    configureServer(server) {
      // Add dev server middleware for critical CSS preview
      server.middlewares.use('/critical-css-preview', async (req, res, next) => {
        const criticalDir = path.join(config.root, 'critical');
        const combinedFile = path.join(criticalDir, 'combined-critical.css');

        try {
          if (await fs.pathExists(combinedFile)) {
            const css = await fs.readFile(combinedFile, 'utf8');
            res.setHeader('Content-Type', 'text/css');
            res.end(css);
          } else {
            res.statusCode = 404;
            res.end('Critical CSS not generated yet');
          }
        } catch (error) {
          res.statusCode = 500;
          res.end('Error reading critical CSS');
        }
      });
    },
  };
}
