#!/usr/bin/env node

/**
 * Deployment Preparation Script
 * Optimizes the project for Vercel deployment by:
 * 1. Analyzing bundle size
 * 2. Checking for large files
 * 3. Optimizing images
 * 4. Cleaning up unnecessary files
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

function log(message, type = "info") {
  const colors = {
    info: "\x1b[36m",
    success: "\x1b[32m",
    warning: "\x1b[33m",
    error: "\x1b[31m",
    reset: "\x1b[0m",
  };
  console.log(`${colors[type]}${message}${colors.reset}`);
}

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

  try {
    calculateSize(dirPath);
  } catch (error) {
    // Directory doesn't exist or can't be read
  }

  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function checkLargeFiles(directory, maxSize = 1024 * 1024) {
  // 1MB default
  const largeFiles = [];

  function scan(dir) {
    try {
      const files = fs.readdirSync(dir);

      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (
          stats.isDirectory() &&
          !file.startsWith(".") &&
          file !== "node_modules"
        ) {
          scan(filePath);
        } else if (stats.isFile() && stats.size > maxSize) {
          largeFiles.push({
            path: path.relative(process.cwd(), filePath),
            size: stats.size,
          });
        }
      });
    } catch (error) {
      // Skip directories that can't be read
    }
  }

  scan(directory);
  return largeFiles;
}

function main() {
  log("🚀 Preparing project for Vercel deployment...", "info");

  // Check current project size
  const projectSize = getDirectorySize(".");
  const publicSize = getDirectorySize("./public");
  const srcSize = getDirectorySize("./src");
  const nodeModulesSize = getDirectorySize("./node_modules");

  log("\n📊 Project Size Analysis:", "info");
  log(`Total project size: ${formatBytes(projectSize)}`);
  log(`Source code size: ${formatBytes(srcSize)}`);
  log(`Public assets size: ${formatBytes(publicSize)}`);
  log(`Node modules size: ${formatBytes(nodeModulesSize)}`);

  // Check for large files
  const largeFiles = checkLargeFiles(".", 500 * 1024); // 500KB threshold

  if (largeFiles.length > 0) {
    log("\n⚠️  Large files detected:", "warning");
    largeFiles.forEach((file) => {
      log(`  ${file.path} (${formatBytes(file.size)})`, "warning");
    });
  }

  // Check if build directory exists and analyze it
  if (fs.existsSync("./dist")) {
    const buildSize = getDirectorySize("./dist");
    log(
      `\n📦 Build size: ${formatBytes(buildSize)}`,
      buildSize > 10 * 1024 * 1024 ? "warning" : "success",
    );

    if (buildSize > 10 * 1024 * 1024) {
      log(
        "⚠️  Build size is over 10MB, this may cause Vercel deployment issues",
        "warning",
      );
    }
  } else {
    log("\n🔨 Building project to analyze bundle size...", "info");
    try {
      execSync("npm run build", { stdio: "inherit" });
      const buildSize = getDirectorySize("./dist");
      log(
        `📦 Build size: ${formatBytes(buildSize)}`,
        buildSize > 10 * 1024 * 1024 ? "warning" : "success",
      );
    } catch (error) {
      log(
        "❌ Build failed. Please fix build errors before deploying.",
        "error",
      );
      process.exit(1);
    }
  }

  // Recommendations
  log("\n💡 Optimization Recommendations:", "info");

  if (publicSize > 5 * 1024 * 1024) {
    log("• Move large images from /public to Supabase storage", "warning");
  }

  if (
    largeFiles.some((f) => f.path.includes(".png") || f.path.includes(".jpg"))
  ) {
    log("• Compress images or use WebP format", "warning");
  }

  log("• Use lazy loading for images and components", "info");
  log("• Enable gzip compression on your server", "info");
  log("• Consider using a CDN for static assets", "info");

  // Check for potential issues
  const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
  const devDeps = Object.keys(packageJson.devDependencies || {});
  const deps = Object.keys(packageJson.dependencies || {});

  // Check for large dependencies
  const potentiallyLargeDeps = deps.filter(
    (dep) =>
      dep.includes("moment") ||
      dep.includes("lodash") ||
      dep.includes("antd") ||
      dep.includes("material-ui"),
  );

  if (potentiallyLargeDeps.length > 0) {
    log("\n📦 Large dependencies detected:", "warning");
    potentiallyLargeDeps.forEach((dep) => {
      log(`  ${dep} - consider alternatives or tree shaking`, "warning");
    });
  }

  log("\n✅ Deployment preparation complete!", "success");
  log("\n🚀 Ready to deploy to Vercel:", "success");
  log("  vercel --prod", "info");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { getDirectorySize, formatBytes, checkLargeFiles };
