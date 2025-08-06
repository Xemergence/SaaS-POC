#!/usr/bin/env node

/**
 * Pre-deployment script to minimize deployment package size
 * This script removes unnecessary files before Vercel deployment
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✓ Removed: ${dirPath}`);
  }
}

function removeFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`✓ Removed: ${filePath}`);
  }
}

function main() {
  console.log("🧹 Cleaning project for deployment...");

  // Remove development directories
  // Keep tempobook directory for storyboards
  // removeDirectory("src/tempobook");
  removeDirectory("src/stories");
  removeDirectory("scripts");
  removeDirectory(".vscode");
  removeDirectory(".storybook");

  // Remove large images (they're in Supabase now)
  const publicImages = [
    "public/ai-tools.png",
    "public/ai-tools-2.png",
    "public/dashboard-example.png",
    "public/team-members.png",
    "public/logo.png",
    "public/logo-black.png",
    "public/nfc-keychain.png",
    "public/cutting-edge-features.png",
  ];

  publicImages.forEach(removeFile);

  // Remove documentation
  removeFile("README.md");
  removeFile("SECURITY_AUDIT.md");
  removeFile("screenshot.png");

  // Remove config files not needed for deployment
  removeFile("tempo.config.json");
  removeFile("components.json");
  removeFile("tsconfig.node.json");

  // Clean up node_modules of unnecessary packages while preserving tempo-devtools
  console.log("🔧 Cleaning node_modules while preserving tempo-devtools...");

  // Remove large dev-only packages that aren't needed in production
  const devPackagesToRemove = [
    "node_modules/@storybook",
    "node_modules/storybook",
    "node_modules/vite-bundle-analyzer",
    "node_modules/@types/node",
    "node_modules/typescript",
    "node_modules/sharp",
  ];

  devPackagesToRemove.forEach(removeDirectory);

  // Ensure tempo-devtools is available
  const tempoDevtoolsPath = "node_modules/tempo-devtools";
  if (!fs.existsSync(tempoDevtoolsPath)) {
    console.warn("⚠️ Warning: tempo-devtools not found in node_modules");
  } else {
    console.log("✓ tempo-devtools found and preserved");
  }

  console.log("✅ Pre-deployment cleanup complete!");
}

if (require.main === module) {
  main();
}

module.exports = { main };
