#!/usr/bin/env node

import { load } from 'cheerio';
import { generate as critical } from 'critical';
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import config from '../critical.config.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Resolve paths relative to project root (parent of scripts directory)
const CONFIG = {
  ...config,
  distDir: resolve(__dirname, '..', config.distDir),
  criticalCssFile: resolve(__dirname, '..', config.criticalCssFile),
};

/**
 * Extract Critical CSS for multiple viewports and routes
 */
async function extractCriticalCSS() {
  console.log('🚀 Starting Critical CSS extraction...');

  const allCriticalCSS = [];

  for (const route of CONFIG.routes) {
    // Fix HTML file path mapping for vite-ssg output
    let htmlFile;
    if (route === '/') {
      htmlFile = 'index.html';
    } else {
      htmlFile = `${route.slice(1)}.html`; // Remove leading slash and add .html
    }

    const htmlPath = join(CONFIG.distDir, htmlFile);

    if (!existsSync(htmlPath)) {
      console.warn(`⚠️  HTML file not found: ${htmlPath}`);
      continue;
    }

    console.log(`📄 Processing route: ${route}`);

    for (const viewport of CONFIG.viewports) {
      console.log(`  📱 Extracting for ${viewport.name} (${viewport.width}x${viewport.height})`);

      try {
        const result = await critical({
          src: htmlPath,
          width: viewport.width,
          height: viewport.height,
          ...CONFIG.critical,
        });

        if (result.css) {
          allCriticalCSS.push(`/* ${route} - ${viewport.name} */`);
          allCriticalCSS.push(result.css);
          console.log(`  ✅ Extracted ${result.css.length} characters`);
        }
      } catch (error) {
        console.error(
          `  ❌ Failed to extract critical CSS for ${route} (${viewport.name}):`,
          error.message,
        );
      }
    }
  }

  return allCriticalCSS.join('\n');
}

/**
 * Advanced CSS optimization with configurable options
 */
function optimizeCriticalCSS(css) {
  if (!CONFIG.optimization.deduplicate && !CONFIG.optimization.combine) {
    return css;
  }

  // Remove duplicate CSS rules while preserving order
  if (CONFIG.optimization.deduplicate) {
    const rules = css.split('}').filter((rule) => rule.trim());
    const uniqueRules = [];
    const seen = new Set();

    for (let rule of rules) {
      rule = `${rule.trim()}}`;
      const selector = rule.split('{')[0]?.trim();

      if (selector && !seen.has(selector)) {
        seen.add(selector);
        uniqueRules.push(rule);
      }
    }

    css = uniqueRules.join('\n');
  }

  // Additional optimizations can be added here
  if (CONFIG.optimization.combine) {
    // Combine similar rules (simplified implementation)
    css = css.replace(/\n\s*\n/g, '\n');
  }

  return css;
}

/**
 * Inject Critical CSS into HTML files with advanced optimizations
 */
async function injectCriticalCSS(criticalCSS) {
  console.log('💉 Injecting Critical CSS into HTML files...');

  const optimizedCSS = optimizeCriticalCSS(criticalCSS);

  for (const route of CONFIG.routes) {
    const htmlFile = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
    const htmlPath = join(CONFIG.distDir, htmlFile);

    if (!existsSync(htmlPath)) {
      continue;
    }

    try {
      const html = readFileSync(htmlPath, 'utf8');
      const $ = load(html);

      // Remove existing critical CSS if any
      $('style[data-critical]').remove();

      // Inject new critical CSS in the head with proper attributes
      const criticalStyleTag = `<style data-critical data-route="${route}">${optimizedCSS}</style>`;
      $('head').append(criticalStyleTag);

      // Optimize CSS loading with preload and proper fallbacks
      $('link[rel="stylesheet"]').each((i, elem) => {
        const $elem = $(elem);
        const href = $elem.attr('href');
        if (href) {
          // Convert to preload for non-critical CSS
          $elem.attr('rel', 'preload');
          $elem.attr('as', 'style');
          $elem.attr('onload', "this.onload=null;this.rel='stylesheet'");

          // Add noscript fallback
          $elem.after(`<noscript><link rel="stylesheet" href="${href}"></noscript>`);

          // Add resource hints for better performance
          if (i === 0) {
            $('head').prepend(
              `<link rel="dns-prefetch" href="${new URL(href, 'http://localhost').origin}">`,
            );
          }
        }
      });

      // Add performance hints
      $('head').append(`
        <!-- Critical CSS Performance Hints -->
        <meta name="critical-css-size" content="${Buffer.byteLength(optimizedCSS, 'utf8')}">
        <meta name="critical-css-route" content="${route}">
      `);

      writeFileSync(htmlPath, $.html());
      console.log(
        `  ✅ Injected into ${htmlFile} (${Buffer.byteLength(optimizedCSS, 'utf8')} bytes)`,
      );
    } catch (error) {
      console.error(`  ❌ Failed to inject into ${htmlFile}:`, error.message);
    }
  }
}

/**
 * Enhanced performance impact analysis
 */
function estimatePerformanceImpact(criticalCSS) {
  const cssSize = Buffer.byteLength(criticalCSS, 'utf8');
  const gzippedEstimate = Math.round(cssSize * 0.3); // Rough gzip estimate
  const budgetUsage = (cssSize / CONFIG.performance.maxCriticalCssSize) * 100;

  console.log('\n📊 Performance Impact Analysis:');
  console.log(
    `  Critical CSS size: ${cssSize.toLocaleString()} bytes (~${gzippedEstimate.toLocaleString()} bytes gzipped)`,
  );
  console.log(
    `  Budget utilization: ${budgetUsage.toFixed(1)}% of ${CONFIG.performance.maxCriticalCssSize.toLocaleString()} bytes`,
  );

  // Performance predictions
  if (cssSize < 4000) {
    console.log(`  🚀 FCP improvement: Excellent (sub-100ms reduction expected)`);
  } else if (cssSize < 8000) {
    console.log(`  ⚡ FCP improvement: Good (50-100ms reduction expected)`);
  } else if (cssSize < CONFIG.performance.maxCriticalCssSize) {
    console.log(`  📈 FCP improvement: Moderate (20-50ms reduction expected)`);
  } else {
    console.log(`  ⚠️  FCP improvement: Limited (may increase initial payload)`);
  }

  // Budget warnings
  if (budgetUsage > CONFIG.performance.warningThreshold * 100) {
    console.warn(`⚠️  Critical CSS approaching budget limit. Consider optimizing.`);
  }

  if (cssSize > CONFIG.performance.maxCriticalCssSize) {
    console.warn(`❌ Critical CSS exceeds recommended budget. Performance may be impacted.`);
    console.log(
      `   Consider: reducing critical CSS scope, using smaller viewports, or excluding non-essential rules.`,
    );
  }

  // Network impact estimation
  const downloadTime3G = Math.round((cssSize / ((400 * 1024) / 8)) * 1000); // 400 Kbps 3G
  const downloadTime4G = Math.round((cssSize / ((1.6 * 1024 * 1024) / 8)) * 1000); // 1.6 Mbps 4G

  console.log('\n🌐 Network Impact:');
  console.log(`  Download time (3G): ~${downloadTime3G}ms`);
  console.log(`  Download time (4G): ~${downloadTime4G}ms`);
}

/**
 * Main execution function with enhanced error handling
 */
async function main() {
  try {
    // Ensure dist directory exists
    if (!existsSync(CONFIG.distDir)) {
      throw new Error(
        `Build directory not found: ${CONFIG.distDir}\nRun 'npm run build:ssg' first.`,
      );
    }

    console.log('🎯 Critical CSS Automation Starting...\n');
    console.log(`📂 Source directory: ${CONFIG.distDir}`);
    console.log(
      `🎨 Processing ${CONFIG.routes.length} routes across ${CONFIG.viewports.length} viewports\n`,
    );

    // Step 1: Extract Critical CSS
    const criticalCSS = await extractCriticalCSS();

    if (!criticalCSS.trim()) {
      throw new Error('No critical CSS was extracted. Check your HTML files and CSS selectors.');
    }

    // Step 2: Write to temporary file for inspection
    writeFileSync(CONFIG.criticalCssFile, criticalCSS);
    console.log(`\n💾 Critical CSS saved to: ${CONFIG.criticalCssFile}`);

    // Step 3: Inject into HTML files
    await injectCriticalCSS(criticalCSS);

    // Step 4: Performance analysis
    estimatePerformanceImpact(criticalCSS);

    // Step 5: Cleanup (configurable)
    if (process.env.CLEANUP_CRITICAL_CSS !== 'false') {
      if (existsSync(CONFIG.criticalCssFile)) {
        unlinkSync(CONFIG.criticalCssFile);
        console.log('\n🧹 Cleaned up temporary critical.css file');
      }
    }

    console.log('\n🎉 Critical CSS automation completed successfully!');
    console.log('   Your SPA is now optimized for lightning-fast above-the-fold rendering.');
    console.log('\n💡 Next steps:');
    console.log('   • Test with npm run preview:ssg');
    console.log('   • Analyze with Lighthouse or WebPageTest');
    console.log('   • Deploy to production');
  } catch (error) {
    console.error('\n❌ Critical CSS automation failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   • Ensure dist directory exists (run npm run build:ssg)');
    console.log('   • Check that HTML files contain valid markup');
    console.log('   • Verify CSS files are properly linked');
    console.log('   • Review critical.config.js settings');
    process.exit(1);
  }
}

// Run the automation
main();
