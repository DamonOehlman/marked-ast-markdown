const marked = require('marked-ast');
const { toMarkdown } = require('..');

const ast = marked.parse(`
## Test

I'm some markdown, and:

1. I'm pretty easy to use
2. I support lists
`);

console.log(ast);
console.log(toMarkdown(ast));
