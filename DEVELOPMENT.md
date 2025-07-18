# Development Guide

This document provides comprehensive information about developing, testing, and releasing the `remark-comments-three` project.

## Table of Contents

- [Development Setup](#development-setup)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Version Management](#version-management)
- [Build Process](#build-process)
- [Release Process](#release-process)
- [CI/CD Pipeline](#cicd-pipeline)
- [Contributing](#contributing)

## Development Setup

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm 7+
- Git

### Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/twardoch/remark-comments-three.git
   cd remark-comments-three
   ```

2. Set up development environment:
   ```bash
   npm run dev setup
   ```

This will install dependencies, build the project, and run tests to ensure everything is working correctly.

## Available Scripts

### Development Scripts

- `npm run dev` - Interactive development environment setup
- `npm run dev setup` - Initial setup (install, build, test)
- `npm run dev test` - Run tests in watch mode
- `npm run dev build` - Build and watch for changes
- `npm run dev check` - Run all checks (lint, test, build)
- `npm run dev clean` - Clean build artifacts
- `npm run dev version` - Show version information

### Build Scripts

- `npm run build` - Build the project for production
- `npm run build:local` - Local build with full test suite
- `npm run prepare` - Prepare package for publishing (runs build)

### Test Scripts

- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ci` - Run tests for CI (with coverage)
- `npm run coverage` - Generate coverage report

### Linting Scripts

- `npm run pretest` - Run ESLint (runs before tests)

### Version Management Scripts

- `npm run version:get` - Get version from git tags
- `npm run version:update` - Update package.json version from git tags
- `npm run version:current` - Get current version from package.json

### Release Scripts

- `npm run release:local` - Local release process (requires git tag)

## Testing

### Test Structure

The project uses Jest for testing with the following test files:

- `__tests__/index.js` - Main functionality tests
- `__tests__/edge-cases.test.js` - Edge case and stress tests
- `__tests__/api.test.js` - Plugin API tests
- `__tests__/version.test.js` - Version management tests

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run coverage

# Run tests for CI
npm run test:ci
```

### Test Coverage

The project aims for high test coverage. Coverage reports are generated in the `coverage/` directory and uploaded to Coveralls in CI.

## Version Management

This project uses **git-tag-based semantic versioning**:

### Version Calculation

- **On a tag**: Uses the tag version (e.g., `v1.2.3` → `1.2.3`)
- **Between tags**: Uses base version with pre-release info (e.g., `1.2.3-dev.5+abc123`)

### Version Commands

```bash
# Get version from git tags
npm run version:get

# Update package.json from git tags
npm run version:update

# Show current package.json version
npm run version:current
```

### Creating Versions

1. **Development**: Versions are automatically calculated from git history
2. **Releases**: Create and push a git tag:
   ```bash
   git tag v1.2.3
   git push origin v1.2.3
   ```

## Build Process

### Local Build

```bash
# Quick build
npm run build

# Full build with tests
npm run build:local
```

### Build Output

- `dist/index.js` - Main compiled file
- `coverage/` - Test coverage reports

### Build Process Steps

1. Clean existing build artifacts
2. Update version from git tags
3. Install dependencies
4. Run linter
5. Run tests
6. Build with Babel
7. Generate coverage report

## Release Process

### Automatic Releases (Recommended)

1. Create and push a git tag:
   ```bash
   git tag v1.2.3
   git push origin v1.2.3
   ```

2. GitHub Actions automatically:
   - Runs full test suite
   - Builds the project
   - Creates GitHub release
   - Publishes to npm
   - Publishes to GitHub Package Registry

### Manual Local Release

```bash
# Ensure you're on a git tag
git tag v1.2.3

# Run local release
npm run release:local
```

### Release Types

- **Stable**: `v1.2.3` - Published to npm with `latest` tag
- **Pre-release**: `v1.2.3-alpha.1`, `v1.2.3-beta.1`, `v1.2.3-rc.1` - Published to npm with `beta` tag

## CI/CD Pipeline

### GitHub Actions Workflows

#### CI Workflow (`.github/workflows/ci.yml`)

Triggers on:
- Push to `main`, `master`, `develop` branches
- Pull requests to `main`, `master`, `develop` branches

Jobs:
- **Test**: Runs on Node.js 18, 20, 22
- **Lint**: Code quality checks
- **Security**: Dependency auditing

#### Release Workflow (`.github/workflows/release.yml`)

Triggers on:
- Git tags matching `v*.*.*`

Jobs:
- **Build and Test**: Full test suite and build
- **Release**: Creates GitHub release with artifacts
- **Publish NPM**: Publishes to npm registry
- **Publish GPR**: Publishes to GitHub Package Registry

### Required Secrets

For automatic publishing, configure these secrets in your GitHub repository:

- `NPM_TOKEN` - npm authentication token
- `GITHUB_TOKEN` - Automatically provided by GitHub

### CI/CD Features

- ✅ Multi-Node.js version testing
- ✅ Code quality checks (ESLint)
- ✅ Security auditing
- ✅ Test coverage reporting
- ✅ Automatic versioning from git tags
- ✅ GitHub releases with artifacts
- ✅ NPM publishing (stable and pre-release)
- ✅ GitHub Package Registry publishing

## Contributing

### Development Workflow

1. **Fork and clone** the repository
2. **Create a feature branch**: `git checkout -b feature/my-feature`
3. **Set up development environment**: `npm run dev setup`
4. **Make changes** and write tests
5. **Run checks**: `npm run dev check`
6. **Commit changes**: `git commit -m "feat: add new feature"`
7. **Push and create PR**: `git push origin feature/my-feature`

### Code Quality

- Follow existing code style (enforced by ESLint)
- Write tests for new functionality
- Ensure all tests pass
- Maintain or improve test coverage

### Commit Messages

Use conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Test changes
- `refactor:` - Code refactoring
- `chore:` - Build process or auxiliary tool changes

### Pull Request Process

1. Ensure all CI checks pass
2. Update documentation as needed
3. Add tests for new functionality
4. Request review from maintainers

## Troubleshooting

### Common Issues

1. **Build fails**: Run `npm run dev clean` then `npm run dev setup`
2. **Tests fail**: Check Node.js version (>=18 required)
3. **Version mismatch**: Run `npm run version:update`
4. **Release fails**: Ensure you're on a git tag and have required secrets configured

### Getting Help

- Check existing [issues](https://github.com/twardoch/remark-comments-three/issues)
- Create a new issue with detailed information
- Include steps to reproduce any problems