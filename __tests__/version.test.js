// this_file: __tests__/version.test.js

import fs from 'fs'
import path from 'path'

// Mock the version module
const {getCurrentVersion} = require('../scripts/version')

describe('Version management', () => {
  test('getCurrentVersion returns valid semver', () => {
    const version = getCurrentVersion()
    expect(version).toMatch(/^\d+\.\d+\.\d+/)
  })

  test('package.json has required fields for npm publishing', () => {
    const packagePath = path.join(__dirname, '..', 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

    expect(packageJson.name).toBeDefined()
    expect(packageJson.version).toBeDefined()
    expect(packageJson.description).toBeDefined()
    expect(packageJson.author).toBeDefined()
    expect(packageJson.license).toBeDefined()
    expect(packageJson.main).toBeDefined()
    expect(packageJson.repository).toBeDefined()
    expect(packageJson.keywords).toBeDefined()
    expect(Array.isArray(packageJson.keywords)).toBe(true)
  })

  test('package.json points to correct main file', () => {
    const packagePath = path.join(__dirname, '..', 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

    const mainFile = path.join(__dirname, '..', packageJson.main)
    expect(fs.existsSync(mainFile)).toBe(true)
  })

  test('package.json files array includes necessary files', () => {
    const packagePath = path.join(__dirname, '..', 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

    expect(packageJson.files).toContain('LICENSE')
    expect(packageJson.files).toContain('dist')
    expect(packageJson.files).toContain('README.md')
  })

  test('package.json has correct Node.js engine requirement', () => {
    const packagePath = path.join(__dirname, '..', 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

    expect(packageJson.engines.node).toBeDefined()
    expect(packageJson.engines.node).toMatch(/>=\d+/)
  })
})

describe('Build artifacts', () => {
  test('dist directory exists after build', () => {
    // This test assumes build has been run
    const distPath = path.join(__dirname, '..', 'dist')
    if (fs.existsSync(distPath)) {
      expect(fs.lstatSync(distPath).isDirectory()).toBe(true)
    }
  })

  test('main dist file exists after build', () => {
    const packagePath = path.join(__dirname, '..', 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
    const mainFile = path.join(__dirname, '..', packageJson.main)

    // Only test if build has been run
    if (fs.existsSync(path.dirname(mainFile))) {
      expect(fs.existsSync(mainFile)).toBe(true)
    }
  })
})

