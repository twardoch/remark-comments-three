const beginMarkerFactory = (marker = '-') => `<!--${marker} `
const endMarkerFactory = (marker = '-') => ` ${marker}->`

function plugin ({
  beginMarker = '-',
  endMarker = '-',
} = {}) {
  beginMarker = beginMarkerFactory(beginMarker)
  endMarker = endMarkerFactory(endMarker)

  function locator (value, fromIndex) {
    return value.indexOf(beginMarker, fromIndex)
  }

  function inlineTokenizer (eat, value, silent) {
    if (!value.startsWith(beginMarker)) {
      return
    }
    // Search for endMarker *after* the beginMarker
    const endMarkerIndex = value.indexOf(endMarker, beginMarker.length)
    if (endMarkerIndex === -1) {
      return
    }

    /* istanbul ignore if - never used (yet) */
    if (silent) {
      return true
    }

    const comment = value.substring(beginMarker.length, endMarkerIndex)
    return eat(beginMarker + comment + endMarker)({
      type: 'comments',
      value: '', // Value is empty, content is in data
      data: {
        comment,
      },
    })
  }
  inlineTokenizer.locator = locator

  const Parser = this.Parser

  // Inject inlineTokenizer
  const inlineTokenizers = Parser.prototype.inlineTokenizers
  const inlineMethods = Parser.prototype.inlineMethods
  inlineTokenizers.comments = inlineTokenizer
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'comments')

  const Compiler = this.Compiler
  if (Compiler) {
    const visitors = Compiler.prototype.visitors
    if (!visitors) return
    visitors.comments = (node) => {
      return beginMarker + node.data.comment + endMarker
    }
  }
}

module.exports = plugin
