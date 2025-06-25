# remark-comments-three [![CI][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status]

This plugin allows you to embed comments in your Markdown source that will be removed when compiling to HTML. These comments are preserved when compiling back to Markdown.

## Syntax

**Default Syntax**

By default, comments are written as:
```markdown
Some text <!-- - Your comment text here  - --> and more text.
```
This uses `<!-- - ` as the opening marker and `  - -->` (note the leading/trailing spaces around the inner `-`) as the closing marker. Everything between these markers will be absent from the HTML output.

**Custom Syntax**

You can customize the markers using the `beginMarker` and `endMarker` options when initializing the plugin.

The plugin constructs the full begin marker as `<!--${beginMarkerOptionValue} ` (note the space *after* your option value) and the full end marker as ` ${endMarkerOptionValue}-->` (note the space *before* your option value).

For example, if you configure the plugin like this:
```javascript
.use(remarkComments, {
  beginMarker: 'MY_CUSTOM_START',
  endMarker: 'MY_CUSTOM_END'
})
```
Then, comments in your Markdown should be written as:
```markdown
Some text <!--MY_CUSTOM_START Your comment text here MY_CUSTOM_END--> and more text.
```

**Important Notes on Markers:**
*   The values you provide for `beginMarker` and `endMarker` are inserted into the template.
*   The plugin searches for these exact constructed strings, including the specific spacing shown.
*   If a comment starts with the begin marker but does not have a corresponding end marker in the same paragraph, it might be treated as plain text or handled by subsequent HTML processing rules (which could strip it if it resembles an unclosed HTML comment).

## AST node (see [mdast][mdast] specification)

The plugin will produce the following node and add it to the MDAST syntax tree:

```javascript
interface Comments <: Node {
  type: "comments";
  data: {
    comment: string;
  }
}
```

## Installation

[npm][npm]:

```bash
npm install remark-comments-three
```

## Configuration

Two options can be passed as a single object argument to the plugin:

*   `beginMarker` (string, default: `'-'`): The text to insert after `<!--` and before the trailing space in the opening comment marker.
*   `endMarker` (string, default: `'-'`): The text to insert before `-->` and after the leading space in the closing comment marker.

See the [Syntax](#syntax) section for examples of how these options affect the parsed comment markers.

## Usage

Dependencies:

```javascript
const unified = require('unified')
const remarkParse = require('remark-parse')
const rehypeStringify = require('rehype-stringify') // For HTML output
const remarkRehype = require('remark-rehype')     // To convert Markdown AST to HTML AST
// Or for Markdown output:
// const remarkStringify = require('remark-stringify')

const remarkCommentsThree = require('remark-comments-three') // Import the plugin
```

Example (compiling to HTML):

```javascript
const processor = unified()
  .use(remarkParse)
  .use(remarkCommentsThree) // Use the plugin (optionally with custom markers)
  // Example with custom markers:
  // .use(remarkCommentsThree, { beginMarker: 'CUSTOM', endMarker: 'CUSTOM' })
  .use(remarkRehype)
  .use(rehypeStringify)

const markdownInput = "Hello <!-- - this is a default comment  - --> world!"
const htmlOutput = processor.processSync(markdownInput).toString()
console.log(htmlOutput) // <p>Hello  world!</p>
```

## License

[MIT][license] © Adam Twardoch, Zeste de Savoir

<!-- Definitions -->

[build-badge]: https://github.com/twardoch/remark-comments-three/actions/workflows/ci.yml/badge.svg
[build-status]: https://github.com/twardoch/remark-comments-three/actions/workflows/ci.yml

[coverage-badge]: https://coveralls.io/repos/github/twardoch/remark-comments-three/badge.svg?branch=main
[coverage-status]: https://coveralls.io/github/twardoch/remark-comments-three?branch=main

[license]: LICENSE

[zds]: https://zestedesavoir.com

[npm]: https://www.npmjs.com/package/remark-comments-three
