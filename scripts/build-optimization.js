#!/usr/bin/env node

/**
 * Build Optimization Script
 * Analyzes build size and applies additional optimizations
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function getDirectorySize(dirPath) {
  let totalSize = 0;

  function calculateSize(currentPath) {
    const stats = fs.statSync(currentPath);

    if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach((file) => {
        calculateSize(path.join(currentPath, file));
      });
    } else {
      totalSize += stats.size;
    }
  }

  if (fs.existsSync(dirPath)) {
    calculateSize(dirPath);
  }

  return totalSize;
}

function formatBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2);
}

function analyzeBuild() {
  console.log("📊 Analyzing build size...");

  const distPath = "dist";
  if (!fs.existsSync(distPath)) {
    console.log("❌ Build directory not found. Run 'npm run build' first.");
    return false;
  }

  const totalSize = getDirectorySize(distPath);
  const sizeInMB = formatBytes(totalSize);

  console.log(`📦 Total build size: ${sizeInMB} MB`);

  // Analyze individual directories
  const subdirs = fs.readdirSync(distPath).filter((item) => {
    return fs.statSync(path.join(distPath, item)).isDirectory();
  });

  console.log("\n📁 Directory breakdown:");
  subdirs.forEach((dir) => {
    const dirSize = getDirectorySize(path.join(distPath, dir));
    console.log(`  ${dir}: ${formatBytes(dirSize)} MB`);
  });

  // Check if under Vercel limit
  const VERCEL_LIMIT_MB = 10;
  if (parseFloat(sizeInMB) > VERCEL_LIMIT_MB) {
    console.log(
      `\n⚠️  Build size (${sizeInMB} MB) exceeds Vercel limit (${VERCEL_LIMIT_MB} MB)`,
    );
    return false;
  } else {
    console.log(
      `\n✅ Build size (${sizeInMB} MB) is under Vercel limit (${VERCEL_LIMIT_MB} MB)`,
    );
    return true;
  }
}

function optimizeBuild() {
  console.log("🔧 Applying build optimizations...");

  try {
    // Clean previous build
    if (fs.existsSync("dist")) {
      execSync("rm -rf dist", { stdio: "inherit" });
    }

    // Run optimized build
    console.log("🏗️  Running optimized build...");
    execSync("npm run build", { stdio: "inherit" });

    return true;
  } catch (error) {
    console.error("❌ Build optimization failed:", error.message);
    return false;
  }
}

function main() {
  console.log("🚀 Starting build optimization process...");

  // Step 1: Clean assets
  try {
    console.log("\n🧹 Step 1: Cleaning large assets...");
    execSync("node scripts/remove-large-assets.js", { stdio: "inherit" });
  } catch (error) {
    console.warn("⚠️  Asset cleanup script not found, continuing...");
  }

  // Step 2: Optimize build
  console.log("\n🔧 Step 2: Building with optimizations...");
  if (!optimizeBuild()) {
    process.exit(1);
  }

  // Step 3: Analyze results
  console.log("\n📊 Step 3: Analyzing optimized build...");
  const isOptimal = analyzeBuild();

  if (isOptimal) {
    console.log(
      "\n🎉 Build optimization successful! Ready for Vercel deployment.",
    );
    console.log("\n📋 Next steps:");
    console.log(
      "1. Commit your changes: git add . && git commit -m 'Optimize build for Vercel'",
    );
    console.log("2. Deploy to Vercel: vercel --prod");
  } else {
    console.log(
      "\n⚠️  Build still exceeds limits. Consider additional optimizations.",
    );
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { analyzeBuild, optimizeBuild, getDirectorySize };
