import dedent from 'dedent'
import unified from 'unified'
import reParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import remarkStringify from 'remark-stringify'
import rehypeStringify from 'rehype-stringify'

import plugin from '../src/'

const renderToMarkdown = text => unified()
  .use(reParse)
  .use(remarkStringify)
  .use(plugin)
  .processSync(text)

test('comments', () => {
  const render = text => unified()
    .use(reParse)
    .use(plugin)
    .use(remark2rehype)
    .use(rehypeStringify)
    .processSync(text)

  const {contents} = render(dedent`
    Foo<!-- - I will be gone ABC  - -->bar

    \`\`\`
    Foo<--COMMENTS I will not get removed because I am in a code block DEF COMMENTS-->bar
    \`\`\`

    <!-- - Unfinished block won't get parsed either GHI
  `)
  expect(contents).toMatchSnapshot()
  expect(contents).not.toContain('ABC')
  expect(contents).toContain('DEF')
  // GHI part is removed by HTML processing chain as it looks like an unclosed HTML comment
  // expect(contents).toContain('GHI')
})

test('compiles to markdown', () => {
  const {contents} = renderToMarkdown(dedent`
    Foo<!-- - I will be gone ABC  - -->bar

    \`\`\`
    Foo<--COMMENTS I will not get removed because I am in a code block DEF COMMENTS-->bar
    \`\`\`

    <!-- - Unfinished block won't get parsed either GHI
  `)
  expect(contents).toMatchSnapshot()
  expect(contents).toContain('Foo<!-- - I will be gone ABC  - -->bar')
})

test('comments custom different markers', () => {
  const render = text => unified()
    .use(reParse)
    .use(plugin, {
      beginMarker: 'foo',
      endMarker: 'bAR',
    })
    .use(remark2rehype)
    .use(rehypeStringify)
    .processSync(text)

  const {contents} = render(dedent`
    Foo<!--foo I will be gone bAR-->bar

    \`\`\`
    Foo<--foo I will not get removed because I am in a code block bAR-->bar
    \`\`\`

    <!--foo Unfinished block won't get parsed either
  `)
  expect(contents).toMatchSnapshot()
})

test('comments custom same markers', () => {
  const render = text => unified()
    .use(reParse)
    .use(plugin, {
      beginMarker: 'foo',
      endMarker: 'foo',
    })
    .use(remark2rehype)
    .use(rehypeStringify)
    .processSync(text)

  const {contents} = render(dedent`
    Foo<!--foo I will be gone foo-->bar

    \`\`\`
    Foo<--foo I will not get removed because I am in a code block foo-->bar
    \`\`\`

    <!--foo Unfinished block won't get parsed either
  `)
  expect(contents).toMatchSnapshot()
})
