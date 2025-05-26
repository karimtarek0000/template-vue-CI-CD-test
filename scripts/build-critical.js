#!/usr/bin/env node

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Execute a command and return a promise
 */
function executeCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`🔄 Running: ${command} ${args.join(' ')}`);

    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', reject);
  });
}

/**
 * Main build orchestration
 */
async function main() {
  try {
    console.log('🚀 Starting Critical CSS Build Pipeline...\n');

    // Step 1: Clean previous build
    console.log('🧹 Step 1: Cleaning previous build...');
    if (existsSync(resolve(__dirname, '../dist'))) {
      await executeCommand('rm', ['-rf', 'dist']);
    }

    // Step 2: Run SSG build
    console.log('\n📦 Step 2: Building static site with vite-ssg...');
    await executeCommand('npm', ['run', 'build:ssg']);

    // Step 3: Extract and inject Critical CSS
    console.log('\n🎨 Step 3: Extracting and injecting Critical CSS...');
    await executeCommand('node', ['scripts/critical-css.js']);

    console.log('\n✨ Build pipeline completed successfully!');
    console.log(
      '🎯 Your SPA is now optimized with Critical CSS for fast above-the-fold rendering.',
    );
    console.log('\n📁 Output location: ./dist/');
    console.log('🚀 Ready for deployment!');
  } catch (error) {
    console.error('\n❌ Build pipeline failed:', error.message);
    process.exit(1);
  }
}

main();
