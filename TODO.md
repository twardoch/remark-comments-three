# TODO

## Completed Tasks ✓
- [x] Analyze `package.json` (initial analysis and cleanup)
- [x] Examine Build Process (`build.sh` and `package.json` scripts)
- [x] Review Code (`src/index.js`)
- [x] Review Tests (`__tests__/index.js`)
- [x] Update Documentation (`README.md`)
- [x] Run Linters and Tests
- [x] Update CHANGELOG.md with recent changes
- [x] Create comprehensive improvement plan (PLAN.md)

## Phase 1: Dependency Modernization (High Priority)

### Babel Ecosystem Updates
- [ ] Update `@babel/cli` from 7.8.3 to latest 7.25.x
- [ ] Update `@babel/core` from 7.8.3 to latest 7.25.x
- [ ] Update `@babel/preset-env` from 7.8.3 to latest 7.25.x
- [ ] Update `babel-jest` from 24.8.0 to match Jest version
- [ ] Update `babel-loader` from 8.0.6 to latest
- [ ] Verify `.babelrc` configuration after updates

### Testing Framework Updates
- [ ] Update Jest from v24.8.0 to v29.x
- [ ] Update test configurations for Jest 29
- [ ] Verify all snapshots work correctly
- [ ] Update `coveralls` from 3.0.9 to latest

### Remark/Unified Ecosystem Updates (Critical)
- [ ] Update `unified` from v7.1.0 to v11.x
- [ ] Update `remark` from v9.0.0 to v15.x
- [ ] Update `remark-parse` from v5.0.0 to v11.x
- [ ] Update `remark-rehype` from v3.0.2 to v11.x
- [ ] Update `remark-stringify` from v5.0.0 to v11.x
- [ ] Update `rehype-stringify` from v4.0.0 to v10.x
- [ ] Update `mdast-util-to-hast` from v3.0.2 to v13.x
- [ ] Update `unist-util-visit` from v1.4.1 to v5.x
- [ ] Fix any breaking API changes in src/index.js

### Linting and Build Tools
- [ ] Update ESLint from v5.16.0 to v8.x or v9.x
- [ ] Migrate ESLint configuration to modern format
- [ ] Add Prettier for code formatting
- [ ] Update `cross-env` from 5.2.0 to latest
- [ ] Update `del-cli` from 1.0.0 to latest
- [ ] Update `dedent` from 0.7.0 to latest

### Remove Remaining Outdated Dependencies
- [ ] Update or remove `core-js` v2.6.11 (migrate to v3)
- [ ] Remove `remark-math` if not used

## Phase 2: CI/CD Setup (High Priority)

### GitHub Actions
- [ ] Create `.github/workflows/ci.yml` for automated testing
- [ ] Configure testing on Node.js 18, 20, and 22
- [ ] Add ESLint check to CI pipeline
- [ ] Add test coverage reporting
- [ ] Add build verification step
- [ ] Add npm audit for security checks

### Pre-commit Hooks
- [ ] Install and configure husky
- [ ] Add pre-commit hook for linting
- [ ] Add pre-commit hook for tests
- [ ] Configure lint-staged for efficiency

### Release Automation
- [ ] Set up semantic-release or release-it
- [ ] Configure automated changelog generation
- [ ] Set up automated npm publishing

## Phase 3: Modern JavaScript Support (Medium Priority)

### ES Modules Support
- [ ] Add ESM build output alongside CommonJS
- [ ] Update package.json with proper exports field
- [ ] Test dual package hazard scenarios
- [ ] Update build process to generate both formats

### TypeScript Migration (Optional)
- [ ] Add TypeScript as dev dependency
- [ ] Create tsconfig.json
- [ ] Convert src/index.js to TypeScript
- [ ] Generate type definitions
- [ ] Update build process for TypeScript

### Modern Build Pipeline
- [ ] Evaluate modern bundlers (esbuild, tsup, Rollup)
- [ ] Replace Babel with chosen bundler if beneficial
- [ ] Optimize build output size
- [ ] Add source maps generation

## Phase 4: Documentation Enhancement (Medium Priority)

### API Documentation
- [ ] Document all plugin options in detail
- [ ] Add JSDoc comments to source code
- [ ] Generate API documentation
- [ ] Add TypeScript types documentation

### Contributing Guidelines
- [ ] Create CONTRIBUTING.md
- [ ] Add CODE_OF_CONDUCT.md
- [ ] Document development setup
- [ ] Add PR template
- [ ] Add issue templates

### Examples and Demos
- [ ] Create examples/ directory
- [ ] Add basic usage example
- [ ] Add advanced usage examples
- [ ] Create online playground/demo
- [ ] Add integration examples (Next.js, Gatsby, etc.)

## Phase 5: Feature Enhancements (Low Priority)

### Core Features
- [ ] Add support for nested comments
- [ ] Add comment metadata/categories
- [ ] Add position preservation option
- [ ] Add comment extraction API

### Performance
- [ ] Add benchmarks
- [ ] Optimize regex patterns
- [ ] Profile performance on large documents
- [ ] Add performance regression tests

### Developer Experience
- [ ] Improve error messages
- [ ] Add debug mode
- [ ] Add verbose logging option
- [ ] Create troubleshooting guide

## Maintenance Tasks

### Security
- [ ] Run npm audit and fix vulnerabilities
- [ ] Set up Dependabot or Renovate
- [ ] Add security policy

### Project Health
- [ ] Add badges for build status, coverage, npm version
- [ ] Ensure all links in README work
- [ ] Update project metadata in package.json
- [ ] Add keywords for better npm discoverability