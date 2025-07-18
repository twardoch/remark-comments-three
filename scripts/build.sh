#!/bin/bash
# this_file: scripts/build.sh

set -e

echo "🔧 Starting build process..."

# Update version from git tags
echo "📝 Updating version from git tags..."
node scripts/version.js update

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linting..."
npm run pretest

# Run tests
echo "🧪 Running tests..."
npm test

# Build the project
echo "🏗️  Building project..."
npm run build

# Generate coverage report
echo "📊 Generating coverage report..."
npm run coverage

echo "✅ Build completed successfully!"