const { decodeHTML} = require('entities');
const times = require('whisk/times');
const { writeTableHeaderLine } = require('./lib/tables');
const { genList } = require('./lib/lists');

const toMarkdown = (ast) => ast.map(writeNode).join('');
const writeNode = (node, index, ast) => {
  const handler = generators[node.type];
  if (typeof node == 'string' || (node instanceof String)) {
    return decodeHTML(node);
  }

  return typeof handler == 'function' ? handler(node, index, ast) : '';
};

module.exports = {
  toMarkdown,
  writeNode,
};

const generators = {
  heading: (node, index, ast) => `${HEADERS[node.level]} ${toText(node.text, ' ')}${newLines(ast, index)}`,
  paragraph: (node, index, ast) => `${toText(node.text)}${newLines(ast, index)}`,
  strong: (node) => `**${toText(node.text)}**`,
  em: (node) => `_${toText(node.text)}_`,
  link: (node) => (Array.isArray(node.text) ? `[${toText(node.text)}](${getUrl(node)})` : `<${getUrl(node)}>`),
  image: (node) => `![${node.text}](${getUrl(node)})`,
  list: (node, index, ast) => `${genList(node, '', index, ast, writeNode).slice(1)}${newLines(ast, index)}`,
  blockquote: (node, index, ast) => `> ${node.quote.map(writeNode)}${newLines(ast, index)}`,
  code: (node, index, ast) => `${CODE_BLOCK}${node.lang || ''}\n${node.code}\n${CODE_BLOCK}${newLines(ast, index)}`,
  codespan: (node) => `\`${decodeHTML(node.text)}\``,
  html: (node) => `${toText(node.html)}`,
  hr: (node, index, ast) => `---${newLines(ast, index)}`,

  table: (node, index, ast) => ([
    node.header.map(writeNode),
    node.header.map(writeTableHeaderLine).join(''),
    node.body.map(writeNode).join('\n')
  ].join('\n') + newLines(ast, index)),
  tablerow: (node) => `| ${node.content.map(writeNode).join(' | ')} |`,
  tablecell: (node) => toText(node.content),
};

const CODE_BLOCK = '```';

const createHeader = (level) => times(level).map(() => '#').join('');
const HEADERS = times(7).map((_, headerLevel) => createHeader(headerLevel));

const toText = (list, separator = '') => list.map(writeNode).join(separator);
const getUrl = (node) => `${node.href}${node.title ? ' "' + node.title + '"' : ''}`;
const newLines = (ast, index) => (ast.slice(index + 1).length > 0 ? '\n\n' : '');
