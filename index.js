const entities = require('entities');
const times = require('whisk/times');
const { writeTableHeaderLine } = require('./lib/tables');
const { genList } = require('./lib/lists');

const toMarkdown = (ast) => ast.map(writeNode).join('');
const writeNode = (node, index, ast) => {
  const handler = generators[node.type];
  if (typeof node == 'string' || (node instanceof String)) {
    return entities.decodeHTML(node);
  }

  return typeof handler == 'function' ? handler(node, index, ast) : '';
};

module.exports = {
  toMarkdown,
  writeNode,
};

const generators = {
  heading: (node) => `${HEADERS[node.level]} ${toText(node.text, ' ')}\n\n`,
  paragraph: (node) => `${toText(node.text)}\n\n`,
  strong: (node) => `**${toText(node.text)}**`,
  em: (node) => `_${toText(node.text)}_`,
  link: (node) => (Array.isArray(node.text) ? `[${toText(node.text)}](${getUrl(node)})` : `<${getUrl(node)}>`),
  image: (node) => `![${node.text}](${getUrl(node)})`,
  list: (node, index, ast) => `${genList(node, '', writeNode).slice(1)}${index !== ast.length-1 ? '\n\n\n' : ''}`,
  blockquote: (node) => `> ${node.quote.map(writeNode)}`,
  code: (node) => `${CODE_BLOCK}${node.lang || ''}\n${node.code}\n${CODE_BLOCK}\n\n`,
  codespan: (node) => `\`${node.text}\``,
  html: (node) => `${toText(node.html)}\n`,
  hr: (node, index, ast) => `---${index !== ast.length-1 ? '\n\n' : ''}`,

  table: (node) => ([
    node.header.map(writeNode),
    node.header.map(writeTableHeaderLine).join(''),
    node.body.map(writeNode).join('\n')
  ].join('\n') + '\n\n'),
  tablerow: (node) => `| ${node.content.map(writeNode).join(' | ')} |`,
  tablecell: (node) => toText(node.content),
};

const CODE_BLOCK = '```';

const createHeader = (level) => times(level).map(() => '#').join('');
const HEADERS = times(7).map((_, headerLevel) => createHeader(headerLevel));

const toText = (list, separator = '') => list.map(writeNode).join(separator);
const getUrl = (node) => `${node.href}${node.title ? ' "' + node.title + '"' : ''}`;
