#!/usr/bin/env node
// this_file: scripts/version.js

const fs = require('fs')
const path = require('path')
const {execSync} = require('child_process')

/**
 * Get version from git tags using semver
 * @returns {string} Version string
 */
function getVersionFromGit () {
  try {
    // Get the latest tag
    const latestTag = execSync('git describe --tags --abbrev=0', {encoding: 'utf8'}).trim()

    // Check if we're exactly on a tag
    const currentCommit = execSync('git rev-parse HEAD', {encoding: 'utf8'}).trim()
    const tagCommit = execSync(`git rev-parse ${latestTag}`, {encoding: 'utf8'}).trim()

    if (currentCommit === tagCommit) {
      // We're exactly on a tag
      return latestTag.replace(/^v/, '')
    } else {
      // We're ahead of the tag, add pre-release info
      const commitsSinceTag = execSync(
        `git rev-list --count ${latestTag}..HEAD`,
        {encoding: 'utf8'}
      ).trim()
      const shortCommit = execSync('git rev-parse --short HEAD', {encoding: 'utf8'}).trim()
      const baseVersion = latestTag.replace(/^v/, '')
      return `${baseVersion}-dev.${commitsSinceTag}+${shortCommit}`
    }
  } catch (error) {
    console.warn('No git tags found, using default version')
    return '0.0.0-dev'
  }
}

/**
 * Update package.json version
 * @param {string} version - New version
 */
function updatePackageVersion (version) {
  const packagePath = path.join(__dirname, '..', 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

  packageJson.version = version

  fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`)
  console.log(`Updated package.json version to ${version}`)
}

/**
 * Get current version from package.json
 * @returns {string} Current version
 */
function getCurrentVersion () {
  const packagePath = path.join(__dirname, '..', 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  return packageJson.version
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'get':
      console.log(getVersionFromGit())
      break
    case 'update':
      const newVersion = getVersionFromGit()
      updatePackageVersion(newVersion)
      break
    case 'current':
      console.log(getCurrentVersion())
      break
    default:
      console.log('Usage: node scripts/version.js [get|update|current]')
      console.log('  get     - Get version from git tags')
      console.log('  update  - Update package.json version from git tags')
      console.log('  current - Get current version from package.json')
      process.exit(1)
  }
}

module.exports = {
  getVersionFromGit,
  updatePackageVersion,
  getCurrentVersion,
}

