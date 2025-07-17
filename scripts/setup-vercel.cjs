#!/usr/bin/env node

/**
 * Setup script for Vercel auto-deployment
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 CONFIGURING VERCEL AUTO-DEPLOYMENT...');

// Check if vercel CLI is installed
exec('vercel --version', (error, stdout, stderr) => {
  if (error) {
    console.log('❌ Vercel CLI not found. Installing...');
    exec('npm install -g vercel', (installError) => {
      if (installError) {
        console.error('❌ Failed to install Vercel CLI:', installError);
        return;
      }
      console.log('✅ Vercel CLI installed successfully!');
      setupProject();
    });
  } else {
    console.log('✅ Vercel CLI found:', stdout.trim());
    setupProject();
  }
});

function setupProject() {
  console.log('\n📋 PROJECT SETUP INSTRUCTIONS:');
  console.log('1. Run: vercel login');
  console.log('2. Run: vercel link');
  console.log('3. Add these secrets to GitHub:');
  console.log('   - VERCEL_TOKEN (from vercel.com/account/tokens)');
  console.log('   - VERCEL_ORG_ID (from .vercel/project.json)');
  console.log('   - VERCEL_PROJECT_ID (from .vercel/project.json)');
  console.log('\n🔧 To get tokens:');
  console.log('   vercel env ls');
  console.log('   cat .vercel/project.json');
  console.log('\n✅ After setup, pushes to main will auto-deploy!');
}