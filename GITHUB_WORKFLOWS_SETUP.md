# GitHub Workflows Setup

Due to GitHub App permissions, the workflow files could not be automatically committed. Please manually create the following workflow files:

## Required Directory Structure

Create the following directory structure in your repository:

```
.github/
└── workflows/
    ├── ci.yml
    └── release.yml
```

## Workflow Files

### 1. `.github/workflows/ci.yml`

Copy the content from `workflow-templates/ci.yml` to `.github/workflows/ci.yml`

### 2. `.github/workflows/release.yml`

Copy the content from `workflow-templates/release.yml` to `.github/workflows/release.yml`

## Setup Instructions

1. Create the directory structure:
   ```bash
   mkdir -p .github/workflows
   ```

2. Copy the workflow files:
   ```bash
   cp workflow-templates/ci.yml .github/workflows/ci.yml
   cp workflow-templates/release.yml .github/workflows/release.yml
   ```

3. Commit the workflow files:
   ```bash
   git add .github/workflows/
   git commit -m "ci: add GitHub Actions workflows"
   git push origin your-branch-name
   ```

## Required GitHub Secrets

For the release workflow to work properly, you'll need to configure the following secrets in your GitHub repository:

1. **NPM_TOKEN**: Token for publishing to npm registry
   - Go to npm.com → Account settings → Access tokens
   - Create a new token with "Automation" type
   - Add it as a secret named `NPM_TOKEN`

2. **GITHUB_TOKEN**: Automatically provided by GitHub (no setup needed)

## Features Enabled

Once the workflows are set up, you'll have:

- **Continuous Integration**: Tests on Node.js 18, 20, 22
- **Code Quality**: ESLint checks and security auditing
- **Coverage Reporting**: Integration with Coveralls
- **Automated Releases**: On git tags (e.g., `v1.2.3`)
- **Dual Publishing**: npm and GitHub Package Registry
- **Pre-release Support**: Beta tags for pre-releases

## Testing the Setup

1. Push a commit to `main`, `master`, or `develop` branch to trigger CI
2. Create and push a tag (e.g., `v1.2.3`) to trigger a release

## Troubleshooting

If you encounter issues:

1. Check that the workflow files are in the correct location
2. Verify that required secrets are configured
3. Check the Actions tab in your GitHub repository for detailed logs
4. Review the workflow syntax for any formatting issues

## Template Files Location

The workflow templates are located in the `workflow-templates/` directory of this repository for easy reference and copying.