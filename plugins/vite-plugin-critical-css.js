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
  } = options;

  let config;
  let isProduction = false;
  const excludedCSSFiles = new Set();

  return {
    name: 'critical-css',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      isProduction = resolvedConfig.command === 'build';
    },

    // Intercept CSS imports and prevent them from being bundled
    load(id) {
      if (!isProduction) {
        return null;
      }

      // If we're building for critical CSS analysis, allow CSS files to be loaded
      if (process.env.CRITICAL_CSS_BUILD === 'true') {
        return null;
      }

      // Check if this is a CSS file being imported by Vue components
      if (id.endsWith('.css') && !id.includes('critical')) {
        console.log('🚫 Blocking CSS file from bundle:', id);
        excludedCSSFiles.add(id);
        // Return empty CSS to prevent bundling
        return '';
      }
      return null;
    },

    // Prevent CSS from being emitted as assets
    generateBundle(options, bundle) {
      if (!isProduction) {
        return;
      }

      // If we're building for critical CSS analysis, allow CSS files to be generated
      if (process.env.CRITICAL_CSS_BUILD === 'true') {
        console.log('🔧 Building with CSS files for critical CSS analysis...');
        return;
      }

      console.log('🚫 Blocking CSS files from bundle...');

      // Remove CSS files from the bundle
      Object.keys(bundle).forEach((fileName) => {
        const chunk = bundle[fileName];
        if (chunk.type === 'asset' && chunk.fileName.endsWith('.css')) {
          console.log('🗑️ Removing CSS asset from bundle:', chunk.fileName);
          delete bundle[fileName];
        }
      });
    },

    // Hook into the HTML transformation to remove CSS links at the source
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!isProduction) {
          return html;
        }

        console.log('🔧 Cleaning CSS links from HTML during build...');

        let modifiedHtml = html;

        // More comprehensive CSS link removal with proper comment handling
        const cssLinkRegex = /<link[^>]*rel="stylesheet"[^>]*>/gi;
        const cssImportRegex = /@import\s+["'][^"']*\.css["'][^;]*;?/gi;

        const removedLinks = [];
        const removedImports = [];

        // Find and store CSS links before removing them
        const cssLinks = modifiedHtml.match(cssLinkRegex) || [];
        cssLinks.forEach((link) => {
          console.log('🗑️ Removing CSS link:', link);
          removedLinks.push(link);
          // Replace with a clean comment (will be removed later)
          modifiedHtml = modifiedHtml.replace(link, `<!-- CSS-REMOVED: ${link} -->`);
        });

        // Find and store CSS imports before removing them
        const cssImports = modifiedHtml.match(cssImportRegex) || [];
        cssImports.forEach((importStmt) => {
          console.log('🗑️ Removing CSS import:', importStmt);
          removedImports.push(importStmt);
          modifiedHtml = modifiedHtml.replace(
            importStmt,
            `<!-- CSS-IMPORT-REMOVED: ${importStmt} -->`,
          );
        });

        // Clean up all our temporary comments and any malformed comments
        modifiedHtml = modifiedHtml.replace(/<!-- CSS-REMOVED: .* -->/gi, '');
        modifiedHtml = modifiedHtml.replace(/<!-- CSS-IMPORT-REMOVED: .* -->/gi, '');

        // Clean up any stray HTML comment fragments
        modifiedHtml = modifiedHtml.replace(/-->\s*$/gm, ''); // Remove stray closing comment tags
        modifiedHtml = modifiedHtml.replace(/^\s*<!--[^>]*$/gm, ''); // Remove stray opening comment tags
        modifiedHtml = modifiedHtml.replace(/-->\s*\n/g, '\n'); // Remove --> followed by newline
        modifiedHtml = modifiedHtml.replace(/\n\s*-->/g, ''); // Remove --> at start of line

        // Clean up empty lines and normalize whitespace
        modifiedHtml = modifiedHtml.replace(/\n\s*\n\s*\n/g, '\n\n'); // Remove triple newlines
        modifiedHtml = modifiedHtml.replace(/\n\s*\n(?=\s*<\/head>)/g, '\n'); // Clean up before </head>

        // Store removed links for the critical CSS generator to find later
        if (removedLinks.length > 0 || removedImports.length > 0) {
          // Add invisible comments that the generator can find
          const linkData = [...removedLinks, ...removedImports].join('|||');
          modifiedHtml = modifiedHtml.replace(
            '</head>',
            `  <!-- CRITICAL-CSS-DATA: ${Buffer.from(linkData).toString('base64')} -->\n</head>`,
          );
        }

        console.log(
          `✅ Cleaned ${cssLinks.length} CSS links and ${cssImports.length} CSS imports from HTML`,
        );

        return modifiedHtml;
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
