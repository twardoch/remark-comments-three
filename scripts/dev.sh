#!/bin/bash
# this_file: scripts/dev.sh

set -e

echo "🚀 Starting development environment..."

# Function to display help
show_help() {
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  setup    - Initial setup (install dependencies, build)"
    echo "  test     - Run tests in watch mode"
    echo "  build    - Build and watch for changes"
    echo "  check    - Run all checks (lint, test, build)"
    echo "  clean    - Clean build artifacts"
    echo "  version  - Show version info"
    echo "  help     - Show this help"
    echo ""
    echo "If no command is provided, 'setup' is run by default."
}

# Function to setup development environment
setup() {
    echo "📦 Installing dependencies..."
    npm install
    
    echo "🔧 Building project..."
    npm run build
    
    echo "🧪 Running tests..."
    npm test
    
    echo "✅ Development environment ready!"
    echo "💡 Try: npm run test:watch to run tests in watch mode"
}

# Function to run tests in watch mode
test_watch() {
    echo "🧪 Running tests in watch mode..."
    npm run test:watch
}

# Function to build and watch
build_watch() {
    echo "🏗️  Building and watching for changes..."
    npm run build
    echo "✅ Build completed! Run 'npm run build' again after making changes."
}

# Function to run all checks
check() {
    echo "🔍 Running all checks..."
    
    echo "📝 Updating version..."
    npm run version:update
    
    echo "🔧 Running linter..."
    npm run pretest
    
    echo "🧪 Running tests..."
    npm run test:ci
    
    echo "🏗️  Building project..."
    npm run build
    
    echo "✅ All checks passed!"
}

# Function to clean build artifacts
clean() {
    echo "🧹 Cleaning build artifacts..."
    rm -rf dist/
    rm -rf coverage/
    rm -rf node_modules/.cache/
    echo "✅ Clean completed!"
}

# Function to show version info
version() {
    echo "📦 Package version: $(npm run version:current --silent)"
    echo "🏷️  Git version: $(npm run version:get --silent)"
    
    if command -v git &> /dev/null; then
        echo "🌿 Git branch: $(git branch --show-current)"
        echo "📝 Git commit: $(git rev-parse --short HEAD)"
    fi
}

# Parse command line arguments
case "${1:-setup}" in
    "setup")
        setup
        ;;
    "test")
        test_watch
        ;;
    "build")
        build_watch
        ;;
    "check")
        check
        ;;
    "clean")
        clean
        ;;
    "version")
        version
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac