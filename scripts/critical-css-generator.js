import { execSync } from 'child_process';
import crypto from 'crypto';
import fs from 'fs-extra';
import path from 'path';
import penthouse from 'penthouse';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const criticalDir = path.join(rootDir, 'critical');

// XSS Protection: Sanitize CSS content
function sanitizeCSS(css) {
  // Remove any potential XSS vectors in CSS
  return css
    .replace(/<script[^>]*>.*?<\/script>/gis, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/expression\s*\(/gi, '') // Remove CSS expressions
    .replace(/import\s+['"][^'"]*['"];?/gi, '') // Remove @import statements that could be malicious
    .replace(/url\s*\(\s*['"]?javascript:/gi, 'url(') // Remove javascript in url()
    .replace(/behavior\s*:/gi, '') // Remove IE behavior property
    .replace(/moz-binding\s*:/gi, ''); // Remove Mozilla binding
}

// Viewport configurations for critical CSS generation
const viewports = [
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
];

// Routes to generate critical CSS for
const routes = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/services', name: 'services' },
  { path: '/blog', name: 'blog' },
  { path: '/contact', name: 'contact' },
];

class CriticalCSSGenerator {
  constructor() {
    this.server = null;
    this.criticalCSS = new Map();
    this.combinedCriticalCSS = '';
    this.baseURL = 'http://localhost:4173';
    // Performance tracking
    this.performanceMetrics = {
      startTime: Date.now(),
      originalCSSSize: 0,
      criticalCSSSize: 0,
      reducedMainCSSSize: 0,
      routes: 0,
      viewports: 0,
    };
  }

  async init() {
    try {
      console.log('🚀 Initializing Critical CSS Generator...');
      this.performanceMetrics.startTime = Date.now();

      // Ensure critical directory exists
      await fs.ensureDir(criticalDir);
      console.log(`📁 Critical directory ready: ${criticalDir}`);

      // Start preview server
      await this.startPreviewServer();

      // Build project to generate CSS files for analysis
      await this.buildProject();

      // Generate critical CSS
      await this.generateCriticalCSS();

      // Process and inject critical CSS into HTML
      await this.processCriticalCSS();

      // Stop preview server
      await this.stopPreviewServer();

      // Print performance impact
      await this.printPerformanceImpact();

      // Clean up critical folder
      await this.cleanupCriticalFolder();

      console.log('✅ Critical CSS generation completed successfully!');
    } catch (error) {
      console.error('❌ Critical CSS generation failed:', error);
      await this.stopPreviewServer();
      process.exit(1);
    }
  }

  async buildProject() {
    console.log('📦 Building project for critical CSS analysis...');
    try {
      // First, build with CSS blocking disabled
      console.log('🔧 Building with CSS files enabled for analysis...');
      process.env.CRITICAL_CSS_BUILD = 'true';
      execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

      // Verify CSS files were generated
      const cssFiles = await this.findCSSFiles();
      if (cssFiles.length === 0) {
        console.log('⚠️ No CSS files found after build, trying alternative approach...');

        // Try building without the plugin interfering
        delete process.env.CRITICAL_CSS_BUILD;

        // Temporarily rename the plugin to disable it
        const pluginPath = path.join(rootDir, 'plugins', 'vite-plugin-critical-css.js');
        const pluginBackupPath = path.join(
          rootDir,
          'plugins',
          'vite-plugin-critical-css.js.backup',
        );

        if (await fs.pathExists(pluginPath)) {
          await fs.move(pluginPath, pluginBackupPath);
          console.log('🔧 Temporarily disabled critical CSS plugin');

          // Build again without the plugin
          execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

          // Restore the plugin
          await fs.move(pluginBackupPath, pluginPath);
          console.log('🔧 Restored critical CSS plugin');
        }
      }

      delete process.env.CRITICAL_CSS_BUILD;
    } catch (error) {
      delete process.env.CRITICAL_CSS_BUILD;
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
  }

  async startPreviewServer() {
    console.log('🌐 Starting preview server...');
    try {
      // Use spawn instead of execSync for better control
      const { spawn } = await import('child_process');

      this.serverProcess = spawn('npm', ['run', 'preview'], {
        cwd: rootDir,
        stdio: 'pipe',
        detached: false,
      });

      // Suppress output but capture errors
      this.serverProcess.stdout.on('data', (data) => {
        // Silent - we just need the server running
      });

      this.serverProcess.stderr.on('data', (data) => {
        const output = data.toString();
        if (output.includes('EADDRINUSE')) {
          console.log('📌 Preview server already running, continuing...');
        }
      });

      // Wait for server to be ready
      await this.waitForServer();
    } catch (error) {
      console.error('❌ Failed to start preview server:', error.message);
      process.exit(1);
    }
  }

  async waitForServer() {
    const maxAttempts = 30;
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(this.baseURL);
        if (response.ok) {
          console.log('✅ Preview server is ready');
          return;
        }
      } catch (error) {
        // Server not ready yet
      }

      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    throw new Error('Preview server failed to start within timeout');
  }

  async generateCriticalCSS() {
    console.log('🎨 Generating critical CSS...');

    // Find the main CSS file
    const cssFiles = await this.findCSSFiles();
    if (cssFiles.length === 0) {
      throw new Error(
        'No CSS files found in dist directory or source files. Please ensure you have CSS files in your project.',
      );
    }

    const mainCSSFile = cssFiles[0]; // Use the first/main CSS file

    // Track original CSS size
    const originalCSSContent = await fs.readFile(mainCSSFile, 'utf8');
    this.performanceMetrics.originalCSSSize = originalCSSContent.length;

    this.performanceMetrics.routes = routes.length;
    this.performanceMetrics.viewports = viewports.length;

    for (const route of routes) {
      console.log(`📄 Processing route: ${route.path}`);

      for (const viewport of viewports) {
        try {
          // Verify CSS file exists and has content
          const cssContent = await fs.readFile(mainCSSFile, 'utf8');
          if (!cssContent.trim()) {
            console.log(`⚠️ CSS file ${mainCSSFile} is empty, skipping...`);
            continue;
          }

          console.log(`📱 Generating for ${viewport.name} (${viewport.width}x${viewport.height})`);
          console.log(
            `🔍 Using CSS file: ${path.basename(mainCSSFile)} (${(cssContent.length / 1024).toFixed(2)}KB)`,
          );

          const critical = await penthouse({
            url: `${this.baseURL}${route.path}`,
            cssString: cssContent, // Use cssString directly
            width: viewport.width,
            height: viewport.height,
            timeout: 30000,
            maxEmbeddedBase64Length: 1000,
            keepLargerMediaQueries: viewport.name === 'mobile',
            propertiesToRemove: ['(-webkit-)?transform', 'transition', 'animation'],
            forceInclude: [
              // Include critical layout and typography
              'html',
              'body',
              '#app',
              '.container',
              '.max-w-',
              '.mx-auto',
              '.flex',
              '.grid',
              '.block',
              '.inline',
              '.text-',
              '.font-',
              '.leading-',
              '.bg-',
              '.border-',
              '.rounded-',
              '.p-',
              '.m-',
              '.w-',
              '.h-',
            ],
            userAgent:
              viewport.name === 'mobile'
                ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
                : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            renderWaitTime: 2000, // Wait for page to fully render
            blockJSRequests: false, // Allow JS to run for SPA
            strict: false, // Be more lenient with CSS parsing
            puppeteer: {
              args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
            },
          });

          if (critical && critical.trim()) {
            // Sanitize the generated critical CSS
            const sanitizedCritical = sanitizeCSS(critical);

            // Store critical CSS
            const key = `${route.name}-${viewport.name}`;
            this.criticalCSS.set(key, sanitizedCritical);

            // Write individual critical CSS file for debugging
            await fs.writeFile(path.join(criticalDir, `${key}.css`), sanitizedCritical, 'utf8');

            console.log(
              `✅ Generated ${(sanitizedCritical.length / 1024).toFixed(2)}KB critical CSS for ${route.path} (${viewport.name})`,
            );
          } else {
            console.log(`⚠️ No critical CSS generated for ${route.path} (${viewport.name})`);
          }
        } catch (error) {
          console.error(
            `❌ Failed to generate critical CSS for ${route.path} (${viewport.name}):`,
            error.message,
          );

          // Continue with other routes/viewports even if one fails
          continue;
        }
      }
    }
  }

  async findCSSFiles() {
    const distDir = path.join(rootDir, 'dist', 'assets');
    if (!(await fs.pathExists(distDir))) {
      console.log('❌ Dist assets directory not found');
      return [];
    }

    const files = await fs.readdir(distDir);
    const cssFiles = files.filter((file) => file.endsWith('.css'));

    // Filter out empty CSS files
    const validCssFiles = [];
    for (const file of cssFiles) {
      const filePath = path.join(distDir, file);
      const stats = await fs.stat(filePath);
      if (stats.size > 0) {
        const content = await fs.readFile(filePath, 'utf8');
        if (content.trim().length > 0) {
          validCssFiles.push(filePath);
          console.log(`📄 Found valid CSS file: ${file} (${stats.size} bytes)`);
        } else {
          console.log(`⚠️ Skipping empty CSS file: ${file}`);
        }
      } else {
        console.log(`⚠️ Skipping zero-byte CSS file: ${file}`);
      }
    }

    if (validCssFiles.length === 0) {
      console.log('❌ No valid CSS files found with content');
    }

    return validCssFiles;
  }

  async findSourceCSSFiles() {
    const sourceFiles = [];

    // Check main style.css
    const mainStylePath = path.join(rootDir, 'src', 'assets', 'style.css');
    if (await fs.pathExists(mainStylePath)) {
      sourceFiles.push(mainStylePath);
      console.log(`📁 Found source CSS: ${path.basename(mainStylePath)}`);
    }

    // Check for component CSS files
    const srcDir = path.join(rootDir, 'src');
    const componentCssFiles = await this.findCSSFilesRecursively(srcDir);
    sourceFiles.push(...componentCssFiles);

    console.log(`📁 Total source CSS files found: ${sourceFiles.length}`);
    return sourceFiles;
  }

  async findCSSFilesRecursively(dir) {
    const cssFiles = [];
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          const subFiles = await this.findCSSFilesRecursively(fullPath);
          cssFiles.push(...subFiles);
        } else if (entry.isFile() && entry.name.endsWith('.css')) {
          cssFiles.push(fullPath);
        }
      }
    } catch (error) {
      // Ignore directories we can't read
    }

    return cssFiles;
  }

  async processCriticalCSS() {
    console.log('🔧 Processing and optimizing critical CSS...');

    // Combine all critical CSS and remove duplicates
    await this.combineCriticalCSS();

    // Inject critical CSS into HTML
    await this.injectCriticalCSS();

    // Remove critical CSS from main CSS file
    await this.removeCriticalFromMainCSS();
  }

  async combineCriticalCSS() {
    console.log('🔗 Combining critical CSS from all pages and viewports...');

    // If we have critical CSS in memory, use it
    if (this.criticalCSS.size > 0) {
      const allCriticalCSS = Array.from(this.criticalCSS.values());
      let combined = allCriticalCSS.join('\n');

      // Remove duplicates by converting to Set and back
      const cssRules = combined.split('}').filter((rule) => rule.trim());
      const uniqueRules = [...new Set(cssRules)];
      combined = uniqueRules.join('}\n') + (uniqueRules.length > 0 ? '}' : '');

      // Further optimize: remove duplicate selectors and properties
      combined = this.removeDuplicateCSS(combined);

      // Minify critical CSS
      combined = this.minifyCSS(combined);

      this.combinedCriticalCSS = combined;

      // Track critical CSS size
      this.performanceMetrics.criticalCSSSize = combined.length;

      // Save combined critical CSS for reference
      await fs.writeFile(path.join(criticalDir, 'combined-critical.css'), combined, 'utf8');

      console.log(`📊 Combined critical CSS size: ${(combined.length / 1024).toFixed(2)}KB`);
      return;
    }

    // Fallback: Read existing critical CSS files from the critical directory
    console.log('📁 Reading existing critical CSS files from critical directory...');

    try {
      const criticalFiles = await fs.readdir(criticalDir);
      const cssFiles = criticalFiles.filter(
        (file) =>
          file.endsWith('.css') && file !== 'combined-critical.css' && !file.startsWith('.'),
      );

      console.log(`🔍 Found ${cssFiles.length} critical CSS files:`, cssFiles);

      if (cssFiles.length === 0) {
        console.log('⚠️ No critical CSS files found to combine');
        this.combinedCriticalCSS = '';
        return;
      }

      const allCriticalCSS = [];

      for (const file of cssFiles) {
        const filePath = path.join(criticalDir, file);
        try {
          const content = await fs.readFile(filePath, 'utf8');
          if (content.trim()) {
            allCriticalCSS.push(content);
            console.log(`✅ Read ${file}: ${(content.length / 1024).toFixed(2)}KB`);
          } else {
            console.log(`⚠️ Skipping empty file: ${file}`);
          }
        } catch (error) {
          console.error(`❌ Failed to read ${file}:`, error.message);
        }
      }

      if (allCriticalCSS.length === 0) {
        console.log('⚠️ All critical CSS files were empty');
        this.combinedCriticalCSS = '';
        return;
      }

      let combined = allCriticalCSS.join('\n');

      // Remove duplicates by converting to Set and back
      const cssRules = combined.split('}').filter((rule) => rule.trim());
      const uniqueRules = [...new Set(cssRules)];
      combined = uniqueRules.join('}\n') + (uniqueRules.length > 0 ? '}' : '');

      // Further optimize: remove duplicate selectors and properties
      combined = this.removeDuplicateCSS(combined);

      // Minify critical CSS
      combined = this.minifyCSS(combined);

      this.combinedCriticalCSS = combined;

      // Track critical CSS size
      this.performanceMetrics.criticalCSSSize = combined.length;

      // Save combined critical CSS for reference
      await fs.writeFile(path.join(criticalDir, 'combined-critical.css'), combined, 'utf8');

      console.log(`📊 Combined critical CSS size: ${(combined.length / 1024).toFixed(2)}KB`);
      console.log(`✅ Successfully combined ${cssFiles.length} critical CSS files`);
    } catch (error) {
      console.error('❌ Failed to combine critical CSS:', error.message);
      this.combinedCriticalCSS = '';
    }
  }

  removeDuplicateCSS(css) {
    // Simple duplicate removal - in production, consider using PostCSS plugins
    const lines = css.split('\n');
    const seen = new Set();
    const unique = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !seen.has(trimmed)) {
        seen.add(trimmed);
        unique.push(line);
      }
    }

    return unique.join('\n');
  }

  minifyCSS(css) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/;\s*}/g, '}') // Remove last semicolon before }
      .replace(/\s*{\s*/g, '{') // Clean up braces
      .replace(/;\s*/g, ';') // Clean up semicolons
      .trim();
  }

  async injectCriticalCSS() {
    console.log('💉 Injecting critical CSS into HTML...');

    const indexPath = path.join(distDir, 'index.html');
    let html = await fs.readFile(indexPath, 'utf8');

    // Generate nonce for CSP protection
    const nonce = crypto.randomBytes(16).toString('base64');

    // Create critical CSS style tag with nonce
    const criticalStyleTag = `<style nonce="${nonce}">${this.combinedCriticalCSS}</style>`;

    // Inject critical CSS in head
    html = html.replace('</head>', `  ${criticalStyleTag}\n</head>`);

    // Add CSP meta tag if not present
    if (!html.includes('Content-Security-Policy')) {
      const cspTag = `<meta http-equiv="Content-Security-Policy" content="style-src 'self' 'nonce-${nonce}' 'unsafe-inline';">`;
      html = html.replace('<title>', `  ${cspTag}\n    <title>`);
    }

    await fs.writeFile(indexPath, html, 'utf8');
  }

  async removeCriticalFromMainCSS() {
    console.log('✂️  Removing critical CSS from main CSS file...');

    const cssFiles = await this.findCSSFiles();
    let totalReducedSize = 0;

    for (const cssFile of cssFiles) {
      let css = await fs.readFile(cssFile, 'utf8');
      const originalSize = css.length;

      // Extract critical CSS rules for comparison
      const criticalRules = this.extractCSSRules(this.combinedCriticalCSS);

      // Only remove rules that are:
      // 1. Static/base styles (not interactive)
      // 2. Exactly duplicated in critical CSS
      // 3. Not media queries, animations, or pseudo-classes

      for (const rule of criticalRules) {
        const cleanRule = rule.trim();

        // Skip removing interactive styles that should remain in lazy-loaded CSS
        if (this.shouldKeepInLazyCSS(cleanRule)) {
          continue;
        }

        // Only remove exact matches of static styles
        if (cleanRule.length > 10) {
          // Avoid removing tiny rules
          // Create a more precise regex that matches the exact rule
          const escapedRule = this.escapeRegExp(cleanRule);
          const ruleRegex = new RegExp(escapedRule.replace(/\s+/g, '\\s*'), 'g');
          css = css.replace(ruleRegex, '');
        }
      }

      // Clean up empty lines and unnecessary whitespace
      css = css.replace(/\n\s*\n\s*\n/g, '\n\n').trim();

      const newSize = css.length;
      const reductionKB = ((originalSize - newSize) / 1024).toFixed(2);
      totalReducedSize += newSize;

      console.log(
        `📉 Reduced ${path.basename(cssFile)} by ${reductionKB}KB while preserving interactive styles`,
      );

      await fs.writeFile(cssFile, css, 'utf8');
    }

    // Track total reduced main CSS size
    this.performanceMetrics.reducedMainCSSSize = totalReducedSize;
  }

  shouldKeepInLazyCSS(cssRule) {
    // Keep interactive and dynamic styles in the lazy-loaded CSS
    const shouldKeep =
      cssRule.includes(':hover') ||
      cssRule.includes(':focus') ||
      cssRule.includes(':active') ||
      cssRule.includes(':visited') ||
      cssRule.includes('transition') ||
      cssRule.includes('animation') ||
      cssRule.includes('@keyframes') ||
      cssRule.includes('@media') ||
      cssRule.includes('::before') ||
      cssRule.includes('::after') ||
      cssRule.includes(':nth-child') ||
      cssRule.includes(':first-child') ||
      cssRule.includes(':last-child') ||
      cssRule.includes('transform') ||
      (cssRule.includes('opacity') && cssRule.includes('hover'));

    return shouldKeep;
  }

  extractCSSRules(css) {
    // Extract individual CSS rules for comparison
    const rules = [];
    const ruleRegex = /([^{}]+){[^{}]*}/g;
    let match;

    while ((match = ruleRegex.exec(css)) !== null) {
      rules.push(match[0]);
    }

    return rules;
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  async stopPreviewServer() {
    if (this.serverProcess) {
      console.log('🛑 Stopping preview server...');
      this.serverProcess.kill();
      this.serverProcess = null;
    }
  }

  async printPerformanceImpact() {
    console.log('📊 Performance Impact Report:');
    console.log(
      `- Original CSS Size: ${(this.performanceMetrics.originalCSSSize / 1024).toFixed(2)} KB`,
    );
    console.log(
      `- Critical CSS Size: ${(this.performanceMetrics.criticalCSSSize / 1024).toFixed(2)} KB`,
    );
    console.log(
      `- Reduced Main CSS Size: ${(this.performanceMetrics.reducedMainCSSSize / 1024).toFixed(2)} KB`,
    );
    console.log(`- Total Routes Processed: ${this.performanceMetrics.routes}`);
    console.log(`- Total Viewports Processed: ${this.performanceMetrics.viewports}`);
    console.log(
      `- Time Taken: ${((Date.now() - this.performanceMetrics.startTime) / 1000).toFixed(2)} seconds`,
    );
  }

  async cleanupCriticalFolder() {
    console.log('🧹 Cleaning up critical folder...');

    try {
      const files = await fs.readdir(criticalDir);
      for (const file of files) {
        const filePath = path.join(criticalDir, file);
        await fs.remove(filePath);
        console.log(`- Removed ${file}`);
      }

      console.log('✅ Critical folder cleaned up');
    } catch (error) {
      console.error('❌ Failed to clean up critical folder:', error.message);
    }
  }
}

// Initialize and run the generator
const generator = new CriticalCSSGenerator();
generator.init().catch(console.error);

// Process critical CSS function (standalone utility function)
async function processCriticalCSS() {
  try {
    const distDir = path.join(__dirname, '..', 'dist');
    const indexPath = path.join(distDir, 'index.html');

    // Check if dist/index.html exists
    if (
      !(await fs
        .access(indexPath)
        .then(() => true)
        .catch(() => false))
    ) {
      console.error('❌ dist/index.html not found. Please run "npm run build" first.');
      return;
    }

    // Create a new generator instance for processing
    const processingGenerator = new CriticalCSSGenerator();
    await processingGenerator.combineCriticalCSS();
    await processingGenerator.injectCriticalCSS();

    console.log('✅ Critical CSS processing completed');
  } catch (error) {
    console.error('❌ Failed to process critical CSS:', error);
  }
}

// Export the functions for use in other modules
export { CriticalCSSGenerator, processCriticalCSS };
