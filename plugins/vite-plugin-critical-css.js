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

  return {
    name: 'critical-css',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      isProduction = resolvedConfig.command === 'build';
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
