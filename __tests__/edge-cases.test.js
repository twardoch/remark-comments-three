// this_file: __tests__/edge-cases.test.js

import dedent from 'dedent'
import unified from 'unified'
import reParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import remarkStringify from 'remark-stringify'
import rehypeStringify from 'rehype-stringify'

import plugin from '../src/'

const renderToHtml = (text, options = {}) => unified()
  .use(reParse)
  .use(plugin, options)
  .use(remark2rehype)
  .use(rehypeStringify)
  .processSync(text)

const renderToMarkdown = (text, options = {}) => unified()
  .use(reParse)
  .use(plugin, options)
  .use(remarkStringify)
  .processSync(text)

describe('Edge cases', () => {
  test('nested comments are not supported', () => {
    const {contents} = renderToHtml('<!-- - outer <!-- - inner  - --> outer  - -->')
    expect(contents).toMatchSnapshot()
  })

  test('comments across multiple lines', () => {
    const {contents} = renderToHtml(dedent`
      <!-- - This is a
      multiline comment
      that spans multiple lines  - -->
      
      Regular text here.
    `)
    expect(contents).toMatchSnapshot()
  })

  test('comments with special characters', () => {
    const input = '<!-- - Comment with émojis 🎉 and special chars: !@#$%^&*()  - -->'
    const {contents} = renderToHtml(input)
    expect(contents).toMatchSnapshot()
  })

  test('empty comments', () => {
    const {contents} = renderToHtml('<!-- -  - -->')
    expect(contents).toMatchSnapshot()
  })

  test('comments with only whitespace', () => {
    const {contents} = renderToHtml('<!-- -     - -->')
    expect(contents).toMatchSnapshot()
  })

  test('malformed comments are not parsed', () => {
    const {contents} = renderToHtml(dedent`
      <!-- - Missing end marker
      <!-- Missing begin marker - -->
      <!-- - Wrong spacing--> 
      <!--Wrong begin marker - -->
    `)
    expect(contents).toMatchSnapshot()
  })

  test('comments in headers', () => {
    const {contents} = renderToHtml('# Header <!-- - with comment  - --> text')
    expect(contents).toMatchSnapshot()
  })

  test('comments in lists', () => {
    const {contents} = renderToHtml(dedent`
      - Item 1 <!-- - comment in list  - -->
      - Item 2
      - <!-- - comment at start  - --> Item 3
    `)
    expect(contents).toMatchSnapshot()
  })

  test('comments in links', () => {
    const {contents} = renderToHtml('[Link<!-- - comment  - --> text](http://example.com)')
    expect(contents).toMatchSnapshot()
  })

  test('comments with markdown syntax inside', () => {
    const {contents} = renderToHtml('<!-- - This has **bold** and *italic* text  - -->')
    expect(contents).toMatchSnapshot()
  })
})

describe('Custom markers edge cases', () => {
  test('markers with special regex characters', () => {
    const {contents} = renderToHtml(
      '<!--[. Test comment .]--> Regular text',
      {beginMarker: '[.', endMarker: '.]'}
    )
    expect(contents).toMatchSnapshot()
  })

  test('markers with spaces', () => {
    const {contents} = renderToHtml(
      '<!--BEGIN Test comment END--> Regular text',
      {beginMarker: 'BEGIN', endMarker: 'END'}
    )
    expect(contents).toMatchSnapshot()
  })

  test('very long markers', () => {
    const beginMarker = 'VERY_LONG_BEGIN_MARKER_12345'
    const endMarker = 'VERY_LONG_END_MARKER_67890'
    const {contents} = renderToHtml(
      `<!--${beginMarker} Test comment ${endMarker}--> Regular text`,
      {beginMarker, endMarker}
    )
    expect(contents).toMatchSnapshot()
  })
})

describe('Performance and stress tests', () => {
  test('many comments in one document', () => {
    const manyComments = Array(100)
      .fill(0)
      .map((_, i) => `Text ${i} <!-- - comment ${i}  - --> more text`)
      .join('\n')

    const {contents} = renderToHtml(manyComments)
    expect(contents).not.toContain('comment')
    expect(contents).toContain('Text 0')
    expect(contents).toContain('Text 99')
  })

  test('very long comment content', () => {
    const longComment = 'A'.repeat(10000)
    const {contents} = renderToHtml(`<!-- - ${longComment}  - -->`)
    expect(contents).not.toContain(longComment)
  })
})

describe('Integration with other remark plugins', () => {
  test('comments preserve when converting back to markdown', () => {
    const input = 'Hello <!-- - secret  - --> world'
    const {contents} = renderToMarkdown(input)
    expect(contents.trim()).toBe(input)
  })

  test('comments work with emphasis', () => {
    const {contents} = renderToHtml('**Bold <!-- - comment  - --> text**')
    expect(contents).toMatchSnapshot()
  })
})

