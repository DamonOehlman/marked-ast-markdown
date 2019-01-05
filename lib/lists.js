const { decodeHTML} = require('entities');

const genList = (node, indent, index, ast, writeNode) => node.body.map((item, c) => {
  const charPrefix = node.ordered ? ((c+1) + '. ') : '* ';
  const formattedItems = item.text.map((childNode, childIndex) => {
    if (typeof childNode === 'string') {
      return decodeHTML(childNode);
    }

    if (childNode.type !== 'list') {
      return writeNode(childNode, childIndex, ast);
    }

    return genList(childNode, `${indent}  `, childIndex, node.body[childIndex], writeNode);
  }).join('');

  return `\n${indent}${charPrefix}${formattedItems}`;
}).join('');

module.exports = {
  genList,
};
