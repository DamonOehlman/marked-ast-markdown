const genList = (node, indent, writeNode) => node.body.map((item, c) => {
  const charPrefix = node.ordered ? ((c+1) + '. ') : '* ';
  const formattedItems = item.text.map((node) => {
    if (typeof node === 'string') {
      return node;
    }

    if (node.type !== 'list') {
      return writeNode(node);
    }

    return genList(node, `${indent}  `, writeNode);
  }).join('');

  return `\n${indent}${charPrefix}${formattedItems}`;
}).join('');

module.exports = {
  genList,
};
