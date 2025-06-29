# remark-comments-three

[![CI][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status]

**remark-comments-three** is a powerful [remark](https://remark.js.org/) plugin designed to enhance your Markdown workflow. It allows you to embed comments directly within your Markdown source files. These comments will be seamlessly removed when you compile your Markdown to HTML, ensuring they don't appear in the final output. However, they are thoughtfully preserved if you compile your Markdown back to Markdown, making them perfect for notes, instructions, or collaboration.

## Table of Contents

*   [What it Does](#what-it-does)
*   [Who It's For](#who-its-for)
*   [Why It's Useful](#why-its-useful)
*   [Installation](#installation)
*   [Usage](#usage)
    *   [Command-Line Interface (CLI)](#command-line-interface-cli)
    *   [Programmatic Usage](#programmatic-usage)
*   [How It Works](#how-it-works)
    *   [Comment Syntax and Markers](#comment-syntax-and-markers)
    *   [Parsing Process](#parsing-process)
    *   [Compilation Process](#compilation-process)
*   [AST Node Specification](#ast-node-specification)
*   [Configuration Options](#configuration-options)
*   [Contributing](#contributing)
    *   [Development Workflow](#development-workflow)
    *   [Reporting Issues](#reporting-issues)
*   [License](#license)

## What it Does

This plugin provides a simple yet flexible way to add source comments to your Markdown.

*   **Invisible in HTML:** Comments written using the specified syntax will not be present in the HTML generated from your Markdown.
*   **Preserved in Markdown:** If you process your Markdown and output Markdown again (e.g., for formatting or other transformations), these comments will remain intact.
*   **Customizable Syntax:** While it comes with a default comment style, you can easily customize the comment markers to fit your preferences or existing conventions.

## Who It's For

`remark-comments-three` is ideal for:

*   **Content Creators & Authors:** Keep notes, reminders, or alternative phrasings directly within your manuscript without worrying about them appearing in the published version.
*   **Developers & Documentarians:** Add explanatory notes about complex Markdown structures or content generation logic for yourself or your team.
*   **Collaborative Projects:** Leave feedback or instructions for collaborators directly in the Markdown files.
*   **Technical Writers:** Manage conditional content or version-specific notes within a single source.

## Why It's Useful

*   **Cleaner Source Files:** Keep your Markdown files organized and understandable with inline annotations.
*   **Improved Collaboration:** Facilitate communication and feedback within a team working on the same Markdown documents.
*   **Non-Destructive Notes:** Add temporary or permanent notes without affecting the final rendered output.
*   **Flexibility:** Adapt the comment syntax to your needs.

## Installation

Install `remark-comments-three` using npm:

```bash
npm install remark-comments-three
```

Or using yarn:

```bash
yarn add remark-comments-three
```

## Usage

You can use `remark-comments-three` both programmatically with `unified` (the engine behind remark) or via the `remark-cli` for command-line operations.

### Command-Line Interface (CLI)

To use `remark-comments-three` with `remark-cli`, you can include it with the `--use` flag.

**Example:** Process `input.md` and output `output.html`, removing comments:

```bash
remark input.md --use remark-comments-three --output output.html
```

If `input.md` contains:
```markdown
Hello <!-- - this is a secret comment  - --> world.
```

The `output.html` will effectively render as:
```html
<p>Hello  world.</p>
```

To process `input.md` and output `formatted.md`, preserving comments:
```bash
remark input.md --use remark-comments-three --output
```
(This will output to stdout, or you can specify an output file like `formatted.md`)

The `formatted.md` (or stdout) would contain:
```markdown
Hello <!-- - this is a secret comment  - --> world.
```

*(Note: Exact CLI behavior for outputting Markdown might depend on your `remark-cli` setup and other plugins. The core principle is that `remark-comments-three` itself preserves comments when the final output is Markdown.)*

### Programmatic Usage

`remark-comments-three` integrates with the `unified` ecosystem.

**Dependencies:**

```javascript
const {unified} = require('unified')
const remarkParse = require('remark-parse')
const remarkRehype = require('remark-rehype') // To convert Markdown AST to HTML AST
const rehypeStringify = require('rehype-stringify') // For HTML output
const remarkStringify = require('remark-stringify') // For Markdown output

const remarkCommentsThree = require('remark-comments-three') // Import the plugin
```

**Example 1: Compiling to HTML (Comments Removed)**

```javascript
async function main() {
  const processor = unified()
    .use(remarkParse)
    .use(remarkCommentsThree) // Use the plugin
    .use(remarkRehype)
    .use(rehypeStringify);

  const markdownInput = "Hello <!-- - this is a default comment  - --> world!";
  const file = await processor.process(markdownInput);
  const htmlOutput = String(file);

  console.log(htmlOutput);
  // Output: <p>Hello  world!</p>
}

main();
```

**Example 2: Compiling back to Markdown (Comments Preserved)**

```javascript
async function main() {
  const processor = unified()
    .use(remarkParse)
    .use(remarkCommentsThree) // Use the plugin
    .use(remarkStringify);

  const markdownInput = "Hello <!-- - this is a default comment  - --> world!";
  const file = await processor.process(markdownInput);
  const markdownOutput = String(file);

  console.log(markdownOutput.trim());
  // Output: Hello <!-- - this is a default comment  - --> world!
}

main();
```

**Example 3: Using Custom Markers (Compiling to HTML)**

```javascript
async function main() {
  const processorCustom = unified()
    .use(remarkParse)
    .use(remarkCommentsThree, { beginMarker: '((', endMarker: '))' }) // Custom markers
    .use(remarkRehype)
    .use(rehypeStringify);

  const markdownInputCustom = "Hello <!--(( this is a custom comment ))--> world!";
  const fileCustom = await processorCustom.process(markdownInputCustom);
  const htmlOutputCustom = String(fileCustom);

  console.log(htmlOutputCustom);
  // Output: <p>Hello  world!</p>
}

main();
```

## How It Works

`remark-comments-three` functions as an inline tokenizer plugin for [remark](https://remark.js.org/), the Markdown processor.

### Comment Syntax and Markers

**Default Syntax:**
By default, comments are identified using the following structure:
```markdown
Some text <!-- - Your comment text here  - --> and more text.
```
Here, `<!-- - ` is the opening sequence and `  - -->` (note the spaces around the inner `-`) is the closing sequence.

**Custom Syntax:**
You can define custom comment markers by passing `beginMarker` and `endMarker` options to the plugin during initialization.

*   `beginMarker` (string, default: `'-'`): This value is inserted into the opening marker template: `<!--${beginMarkerValue} ` (note the trailing space).
*   `endMarker` (string, default: `'-'`): This value is inserted into the closing marker template: ` ${endMarkerValue}-->` (note the leading space).

For instance, if you configure:
```javascript
.use(remarkCommentsThree, {
  beginMarker: 'MY_COMMENT_BEGINS',
  endMarker: 'MY_COMMENT_ENDS'
})
```
The plugin will look for comments like this:
```markdown
<!--MY_COMMENT_BEGINS Your comment text here MY_COMMENT_ENDS-->
```

**Important Notes on Markers:**
*   The plugin searches for these exact constructed marker strings, including the specified internal spacing and the surrounding `<!--` and `-->`.
*   A comment must start with the complete begin marker and end with the complete end marker within the same paragraph to be correctly parsed. Unmatched or incomplete comment syntax might be treated as plain text or be affected by subsequent HTML processing rules (potentially being stripped if it resembles an unclosed HTML comment).

### Parsing Process

1.  **Tokenizer Injection:** The plugin registers an `inlineTokenizer` with remark's parser. This tokenizer is responsible for identifying and processing the comment syntax.
2.  **Comment Recognition:** The `inlineTokenizer` uses a `locator` function to efficiently find potential start sequences (`<!--${beginMarkerValue} `).
3.  **AST Node Creation:** When a valid comment (from begin marker to end marker) is found, the tokenizer consumes the entire comment string. It then creates an [mdast (Markdown Abstract Syntax Tree)](https://github.com/syntax-tree/mdast) node of type `comments`. The actual text of the comment (the part between the markers) is stored in the `data.comment` property of this node.

    Example `comments` node:
    ```javascript
    {
      type: 'comments',
      value: '', // The 'value' property is often empty for nodes where content is in 'data'
      data: {
        comment: 'Your comment text here'
      }
    }
    ```

### Compilation Process

The behavior during compilation (transforming the AST to an output format) depends on the target format:

*   **To Markdown:** When compiling the mdast tree back to Markdown (e.g., using `remark-stringify`), the plugin provides a visitor for `comments` nodes. This visitor reconstructs the original comment syntax using the `node.data.comment` and the configured (or default) `beginMarker` and `endMarker` strings. This ensures comments are preserved.
*   **To HTML:** When the mdast tree is transformed to an [hast (Hypertext Abstract Syntax Tree)](https://github.com/syntax-tree/hast) via a plugin like `remark-rehype`, the custom `comments` node type typically has no default handler in `remark-rehype` or standard HTML renderers. Consequently, it is effectively omitted from the HTML output. This is the desired behavior for ensuring comments do not appear in the final rendered HTML.

## AST Node Specification

The plugin introduces the following custom node type to the mdast syntax tree:

```javascript
interface Comments <: Node {
  type: "comments";
  data: {
    comment: string; // The content of the comment
  }
  // 'value' property is typically empty as content is in 'data.comment'
}
```
*(This is a conceptual representation. In practice, mdast nodes are plain JavaScript objects.)*

## Configuration Options

You can pass a single options object when registering the plugin with `.use()`:

*   **`beginMarker`**:
    *   Type: `string`
    *   Default: `'-'`
    *   Description: The string that, when combined with `<!--` and a trailing space, forms the opening marker of a comment (e.g., `<!--${beginMarker} `).

*   **`endMarker`**:
    *   Type: `string`
    *   Default: `'-'`
    *   Description: The string that, when combined with `-->` and a leading space, forms the closing marker of a comment (e.g., ` ${endMarker}-->`).

Refer to the [Comment Syntax and Markers](#comment-syntax-and-markers) section for detailed examples.

## Contributing

Contributions are welcome! Whether it's bug reports, feature suggestions, or pull requests, your help is appreciated.

### Development Workflow

1.  **Fork the repository:** Create your own fork of `remark-comments-three`.
2.  **Clone your fork:** `git clone https://github.com/YOUR_USERNAME/remark-comments-three.git`
3.  **Create a new branch:** `git checkout -b my-feature-or-fix`
4.  **Install dependencies:** `npm install` (or `yarn install`)
5.  **Make your changes:** Implement your feature or bug fix.
6.  **Ensure code quality:**
    *   Run linters: `npm run pretest` (this typically runs ESLint as per `package.json`)
    *   Run tests: `npm test`
    *   Ensure all tests pass and there are no linting errors. Consider adding new tests for new functionality.
7.  **Commit your changes:** Use clear and descriptive commit messages.
8.  **Push to your fork:** `git push origin my-feature-or-fix`
9.  **Open a Pull Request:** Submit a PR to the `main` branch of the original `remark-comments-three` repository.

### Reporting Issues

*   Use the [GitHub Issues page](https://github.com/twardoch/remark-comments-three/issues) to report bugs or suggest features.
*   Provide as much detail as possible, including steps to reproduce, expected behavior, and actual behavior.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<!-- Definitions for badges (usually at the end of the file) -->
[build-badge]: https://github.com/twardoch/remark-comments-three/actions/workflows/ci.yml/badge.svg
[build-status]: https://github.com/twardoch/remark-comments-three/actions/workflows/ci.yml
[coverage-badge]: https://coveralls.io/repos/github/twardoch/remark-comments-three/badge.svg?branch=main
[coverage-status]: https://coveralls.io/github/twardoch/remark-comments-three?branch=main
