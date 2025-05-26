#!/usr/bin/env node

import { load } from 'cheerio';
import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import config from '../critical.config.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Resolve paths relative to project root (parent of scripts directory)
const CONFIG = {
  ...config,
  distDir: resolve(__dirname, '..', config.distDir),
};

/**
 * Analyze the critical CSS implementation in built files
 */
function analyzeCriticalCSS() {
  console.log('🔍 Critical CSS Analysis Report\n');

  const results = [];

  for (const route of CONFIG.routes) {
    const htmlFile = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
    const htmlPath = join(CONFIG.distDir, htmlFile);

    if (!existsSync(htmlPath)) {
      console.warn(`⚠️  HTML file not found: ${htmlPath}`);
      continue;
    }

    const html = readFileSync(htmlPath, 'utf8');
    const $ = load(html);

    // Analyze critical CSS
    const criticalStyles = $('style[data-critical]');
    const preloadLinks = $('link[rel="preload"][as="style"]');
    const stylesheetLinks = $('link[rel="stylesheet"]');

    const analysis = {
      route,
      htmlFile,
      criticalCSS: {
        found: criticalStyles.length > 0,
        count: criticalStyles.length,
        size: criticalStyles.text().length,
        sizeBytes: Buffer.byteLength(criticalStyles.text(), 'utf8'),
      },
      cssLoading: {
        preloadLinks: preloadLinks.length,
        stylesheetLinks: stylesheetLinks.length,
        hasNoscriptFallback: $('noscript link[rel="stylesheet"]').length > 0,
      },
      performanceHints: {
        hasCriticalSizeMeta: $('meta[name="critical-css-size"]').length > 0,
        hasCriticalRouteMeta: $('meta[name="critical-css-route"]').length > 0,
        hasDnsPrefetch: $('link[rel="dns-prefetch"]').length > 0,
      },
    };

    results.push(analysis);

    // Display route analysis
    console.log(`📄 Route: ${route} (${htmlFile})`);

    if (analysis.criticalCSS.found) {
      console.log(`  ✅ Critical CSS: ${analysis.criticalCSS.sizeBytes.toLocaleString()} bytes`);

      const budgetUsage =
        (analysis.criticalCSS.sizeBytes / CONFIG.performance.maxCriticalCssSize) * 100;
      console.log(`     Budget usage: ${budgetUsage.toFixed(1)}%`);

      if (budgetUsage > 100) {
        console.log(`     ❌ Exceeds 14KB budget!`);
      } else if (budgetUsage > 80) {
        console.log(`     ⚠️  Approaching budget limit`);
      } else {
        console.log(`     ✅ Within budget`);
      }
    } else {
      console.log(`  ❌ No critical CSS found`);
    }

    console.log(`  📦 CSS Loading:`);
    console.log(`     Preload links: ${analysis.cssLoading.preloadLinks}`);
    console.log(`     Regular links: ${analysis.cssLoading.stylesheetLinks}`);
    console.log(`     Noscript fallback: ${analysis.cssLoading.hasNoscriptFallback ? '✅' : '❌'}`);

    console.log(`  🔧 Performance hints:`);
    console.log(
      `     Size metadata: ${analysis.performanceHints.hasCriticalSizeMeta ? '✅' : '❌'}`,
    );
    console.log(
      `     Route metadata: ${analysis.performanceHints.hasCriticalRouteMeta ? '✅' : '❌'}`,
    );
    console.log(`     DNS prefetch: ${analysis.performanceHints.hasDnsPrefetch ? '✅' : '❌'}`);

    console.log('');
  }

  // Overall summary
  console.log('📊 Overall Summary:');

  const totalRoutes = results.length;
  const routesWithCritical = results.filter((r) => r.criticalCSS.found).length;
  const totalCriticalSize = results.reduce((sum, r) => sum + r.criticalCSS.sizeBytes, 0);
  const avgCriticalSize = totalCriticalSize / routesWithCritical || 0;

  console.log(`  Routes processed: ${totalRoutes}`);
  console.log(`  Routes with critical CSS: ${routesWithCritical}`);
  console.log(`  Total critical CSS size: ${totalCriticalSize.toLocaleString()} bytes`);
  console.log(`  Average critical CSS size: ${Math.round(avgCriticalSize).toLocaleString()} bytes`);

  const overallBudgetUsage = (avgCriticalSize / CONFIG.performance.maxCriticalCssSize) * 100;
  console.log(`  Average budget usage: ${overallBudgetUsage.toFixed(1)}%`);

  if (routesWithCritical === totalRoutes) {
    console.log(`  🎉 All routes have critical CSS!`);
  } else {
    console.log(`  ⚠️  ${totalRoutes - routesWithCritical} routes missing critical CSS`);
  }

  return results;
}

/**
 * Generate recommendations based on analysis
 */
function generateRecommendations(results) {
  console.log('\n💡 Recommendations:');

  const recommendations = [];

  // Check for missing critical CSS
  const routesWithoutCritical = results.filter((r) => !r.criticalCSS.found);
  if (routesWithoutCritical.length > 0) {
    recommendations.push({
      priority: 'high',
      issue: 'Missing critical CSS',
      description: `${routesWithoutCritical.length} routes don't have critical CSS`,
      action: 'Run npm run build:critical to generate critical CSS',
    });
  }

  // Check for oversized critical CSS
  const oversizedRoutes = results.filter(
    (r) => r.criticalCSS.sizeBytes > CONFIG.performance.maxCriticalCssSize,
  );
  if (oversizedRoutes.length > 0) {
    recommendations.push({
      priority: 'medium',
      issue: 'Critical CSS budget exceeded',
      description: `${oversizedRoutes.length} routes exceed 14KB budget`,
      action: 'Optimize critical CSS by reducing scope or excluding non-essential rules',
    });
  }

  // Check for missing noscript fallbacks
  const routesWithoutFallback = results.filter((r) => !r.cssLoading.hasNoscriptFallback);
  if (routesWithoutFallback.length > 0) {
    recommendations.push({
      priority: 'low',
      issue: 'Missing noscript fallbacks',
      description: `${routesWithoutFallback.length} routes lack noscript CSS fallbacks`,
      action: 'Ensure all routes have proper noscript fallbacks for users with JS disabled',
    });
  }

  // Display recommendations
  if (recommendations.length === 0) {
    console.log('  🎉 No issues found! Your critical CSS implementation looks great.');
    console.log('\n🚀 Next steps:');
    console.log('     • Test with Lighthouse for Core Web Vitals');
    console.log('     • Measure real user performance');
    console.log('     • Consider A/B testing performance impact');
  } else {
    recommendations.forEach((rec, index) => {
      const priorityIcon = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🔵';
      console.log(`\n  ${priorityIcon} ${rec.issue} (${rec.priority} priority)`);
      console.log(`     ${rec.description}`);
      console.log(`     Action: ${rec.action}`);
    });
  }
}

/**
 * Main execution
 */
function main() {
  try {
    if (!existsSync(CONFIG.distDir)) {
      console.error('❌ Dist directory not found. Run "npm run build:ssg" first.');
      process.exit(1);
    }

    const results = analyzeCriticalCSS();
    generateRecommendations(results);

    console.log('\n✨ Analysis complete!');
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    process.exit(1);
  }
}

main();
