#!/usr/bin/env node

/**
 * Asset Cleanup Script for Vercel Deployment
 * Removes large local assets that are now hosted on CDN
 */

const fs = require("fs");
const path = require("path");

const assetsToRemove = [
  "public/ai-tools.png",
  "public/ai-tools-2.png",
  "public/cutting-edge-features.png",
  "public/dashboard-example.png",
  "public/logo.png",
  "public/logo-black.png",
  "public/nfc-keychain.png",
  "public/team-members.png",
  "screenshot.png",
];

function removeAsset(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      fs.unlinkSync(filePath);
      console.log(`✅ Removed ${filePath} (${sizeInMB} MB)`);
      return parseFloat(sizeInMB);
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
      return 0;
    }
  } catch (error) {
    console.error(`❌ Error removing ${filePath}:`, error.message);
    return 0;
  }
}

function main() {
  console.log("🧹 Cleaning up large assets for deployment...");

  let totalSaved = 0;

  assetsToRemove.forEach((asset) => {
    totalSaved += removeAsset(asset);
  });

  console.log(`\n📊 Total space saved: ${totalSaved.toFixed(2)} MB`);
  console.log("🚀 Assets cleanup complete - ready for deployment!");

  // Verify critical files still exist
  const criticalFiles = ["public/vite.svg", "index.html", "package.json"];
  console.log("\n🔍 Verifying critical files:");

  criticalFiles.forEach((file) => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file} exists`);
    } else {
      console.log(`❌ CRITICAL: ${file} missing!`);
    }
  });
}

if (require.main === module) {
  main();
}

module.exports = { removeAsset };
