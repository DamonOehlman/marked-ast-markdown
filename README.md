# marked-ast-markdown

This is a simple module that takes a [marked-ast](https://github.com/pdubroy/marked-ast) parsed Abstract Syntax Tree and generates markdown output.

[![NPM](https://nodei.co/npm/marked-ast-markdown.png)](https://nodei.co/npm/marked-ast-markdown/)

[![unstable](https://img.shields.io/badge/stability-unstable-yellowgreen.svg)](https://github.com/dominictarr/stability#unstable) [![Build Status](https://api.travis-ci.org/DamonOehlman/marked-ast-markdown.svg?branch=master)](https://travis-ci.org/DamonOehlman/marked-ast-markdown)

## Why?

You may be wondering why you would do this.  In my case, I wanted to parse a markdown document (specifically a `README.md` file) and parse the file and then modify the document in some way.  Rather than attempt to parse markdown from source each time and make text modifications it made much more sense to work with an AST as you would if you were modifying JS code.  This package provides the ability to generate a markdown file again, once those modifications have been made.

## Example Usage

```js
const marked = require('marked-ast');
const { toMarkdown } = require('marked-ast-markdown');

const ast = marked.parse(`
## Test

I'm some markdown, and:

1. I'm pretty easy to use
2. I support lists
`);

console.log(ast);
console.log(toMarkdown(ast));
```

## LICENSE

ISC License

Copyright (c) 2019, Damon Oehlman <damon.oehlman@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


