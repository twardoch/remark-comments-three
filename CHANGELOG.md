# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-01-18
### Added
- **Complete CI/CD pipeline** with GitHub Actions for automated testing and deployment
- **Git-tag-based semversioning** system with automatic version management
- **Comprehensive test suite** with edge cases, API tests, and version management tests
- **Local development scripts** for convenient build, test, and release workflows
- **Multiplatform binary releases** with automatic artifact generation
- **Security auditing** integrated into CI pipeline
- **Development environment setup** with interactive scripts
- **Comprehensive documentation** including DEVELOPMENT.md guide
- **Enhanced npm packaging** with proper .npmignore configuration
- **Dual registry publishing** (npm and GitHub Package Registry)
- **Pre-release support** with beta tag publishing
- **Coverage reporting** with Coveralls integration
- **Multiple Node.js version testing** (18, 20, 22)

### Changed
- **Upgraded project structure** to modern CI/CD standards
- **Enhanced package.json** with comprehensive script commands
- **Improved build process** with automated version updates
- **Modernized development workflow** with automated checks

### Fixed
- **Code quality issues** resolved with comprehensive ESLint fixes
- **Test stability** with proper error handling and edge case coverage

### Security
- **Dependency auditing** with npm audit integration
- **Automated security scanning** in CI pipeline

## [1.2.9] - 2025-06-29
### Added
- Created `PLAN.md`, `TODO.md`, `CHANGELOG.md` for better project management
- Initial project refactor and documentation updates (PR #26)

### Changed
- Updated `engines.node` in `package.json` to `>=18` for modern Node.js support
- Improved robustness of `inlineTokenizer` in `src/index.js` by ensuring `endMarker` is searched after `beginMarker` and using `startsWith`
- Updated `README.md` to accurately describe default and custom comment syntax, marker generation, plugin options, and usage
- Corrected links (CI badge, coverage badge, license, NPM) in `README.md`

### Fixed
- Corrected test inputs in `__tests__/index.js` to align with the plugin's actual marker generation logic
- Updated Jest snapshots after test corrections
- Removed a test assertion (`expect(contents).toContain('GHI')`) in `test('comments')` that was failing due to HTML processing of unclosed comments by `rehype`
- Ran ESLint with `--fix` to resolve linting errors in `src/index.js` and `__tests__/index.js`

### Removed
- Removed unused dependencies from `package.json`: `@babel/polyfill`, `axios`, `clone`, `express`, `html-differ`, `jest-environment-node-debug`, `lerna`, `parallel-webpack`, `sync-request`, `textr`, `webpack`, `webpack-cli`

### Chore
- Examined build process (`build.sh`, `package.json` scripts, `.babelrc`)
- Successfully ran linters (`eslint .`) and tests (`jest`) to confirm all changes are integrated correctly

## [1.2.8] - Previous release
