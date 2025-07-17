#!/usr/bin/env node

/**
 * Force clean deployment script
 * Guarantees Vercel won't "remember" previous builds
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 FORCE CLEAN DEPLOYMENT STARTING...');

// 1. Clean all local caches
const cleanDirs = [
  'build',
  'dist', 
  '.vite',
  '.remix',
  'node_modules/.cache',
  '.vercel'
];

cleanDirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    console.log(`🗑️  Removing ${dir}/`);
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
});

// 2. Generate unique build identifier
const buildId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
const envPath = path.join(process.cwd(), '.env.local');

// Update .env.local with build ID
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Remove any existing BUILD_ID
envContent = envContent.replace(/^VITE_BUILD_ID=.*$/m, '');
envContent += `\nVITE_BUILD_ID=${buildId}\n`;

fs.writeFileSync(envPath, envContent.trim() + '\n');

console.log(`🆔 Build ID: ${buildId}`);
console.log('✅ FORCE CLEAN DEPLOYMENT READY!');
console.log('📤 Run: vercel --prod --force');