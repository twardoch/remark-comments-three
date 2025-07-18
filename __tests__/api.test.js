// this_file: __tests__/api.test.js

import plugin from '../src/'

describe('Plugin API', () => {
  test('plugin exports a function', () => {
    expect(typeof plugin).toBe('function')
  })

  test('plugin returns undefined (as expected for remark plugins)', () => {
    const mockProcessor = {
      Parser: {
        prototype: {
          inlineTokenizers: {},
          inlineMethods: ['text'],
        },
      },
      Compiler: {
        prototype: {
          visitors: {},
        },
      },
    }

    const result = plugin.call(mockProcessor)
    expect(result).toBeUndefined()
  })

  test('plugin modifies parser inlineTokenizers', () => {
    const mockProcessor = {
      Parser: {
        prototype: {
          inlineTokenizers: {},
          inlineMethods: ['text'],
        },
      },
      Compiler: {
        prototype: {
          visitors: {},
        },
      },
    }

    plugin.call(mockProcessor)

    expect(mockProcessor.Parser.prototype.inlineTokenizers.comments).toBeDefined()
    expect(typeof mockProcessor.Parser.prototype.inlineTokenizers.comments).toBe('function')
  })

  test('plugin modifies parser inlineMethods', () => {
    const mockProcessor = {
      Parser: {
        prototype: {
          inlineTokenizers: {},
          inlineMethods: ['text'],
        },
      },
      Compiler: {
        prototype: {
          visitors: {},
        },
      },
    }

    plugin.call(mockProcessor)

    expect(mockProcessor.Parser.prototype.inlineMethods).toContain('comments')
    expect(mockProcessor.Parser.prototype.inlineMethods.indexOf('comments')).toBeLessThan(
      mockProcessor.Parser.prototype.inlineMethods.indexOf('text')
    )
  })

  test('plugin modifies compiler visitors', () => {
    const mockProcessor = {
      Parser: {
        prototype: {
          inlineTokenizers: {},
          inlineMethods: ['text'],
        },
      },
      Compiler: {
        prototype: {
          visitors: {},
        },
      },
    }

    plugin.call(mockProcessor)

    expect(mockProcessor.Compiler.prototype.visitors.comments).toBeDefined()
    expect(typeof mockProcessor.Compiler.prototype.visitors.comments).toBe('function')
  })

  test('plugin handles missing Compiler gracefully', () => {
    const mockProcessor = {
      Parser: {
        prototype: {
          inlineTokenizers: {},
          inlineMethods: ['text'],
        },
      },
      Compiler: undefined,
    }

    expect(() => plugin.call(mockProcessor)).not.toThrow()
  })

  test('plugin handles missing Compiler visitors gracefully', () => {
    const mockProcessor = {
      Parser: {
        prototype: {
          inlineTokenizers: {},
          inlineMethods: ['text'],
        },
      },
      Compiler: {
        prototype: {
          visitors: undefined,
        },
      },
    }

    expect(() => plugin.call(mockProcessor)).not.toThrow()
  })
})

describe('Plugin configuration', () => {
  test('plugin accepts empty options', () => {
    const mockProcessor = {
      Parser: {
        prototype: {
          inlineTokenizers: {},
          inlineMethods: ['text'],
        },
      },
      Compiler: {
        prototype: {
          visitors: {},
        },
      },
    }

    expect(() => plugin.call(mockProcessor, {})).not.toThrow()
  })

  test('plugin accepts custom markers', () => {
    const mockProcessor = {
      Parser: {
        prototype: {
          inlineTokenizers: {},
          inlineMethods: ['text'],
        },
      },
      Compiler: {
        prototype: {
          visitors: {},
        },
      },
    }

    expect(() => plugin.call(mockProcessor, {
      beginMarker: 'START',
      endMarker: 'END',
    })).not.toThrow()
  })

  test('plugin accepts undefined options', () => {
    const mockProcessor = {
      Parser: {
        prototype: {
          inlineTokenizers: {},
          inlineMethods: ['text'],
        },
      },
      Compiler: {
        prototype: {
          visitors: {},
        },
      },
    }

    expect(() => plugin.call(mockProcessor, undefined)).not.toThrow()
  })
})

