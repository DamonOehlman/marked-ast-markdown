var entities = require('entities');
var times = require('whisk/times');

function createChar(x) {
  return function() {
    return x;
  }
}

var generators = {
  heading: function(node) {
    return times(node.level).map(createChar('#')).join('') + ' ' + node.text.map(writeNode).join(' ') + '\n\n';
  },

  paragraph: function(node) {
    return node.text.map(writeNode).join('') + '\n\n';
  },

  strong: function(node) {
    return '**' + node.text.map(writeNode).join(' ') + '**';
  },

  em: function(node) {
    return '_' + node.text.map(writeNode).join(' ') + '_';
  }
};

function writeNode(node) {
  var handler = generators[node.type];

  if (typeof node == 'string' || (node instanceof String)) {
    return entities.decodeHTML(node);
  }

  if (typeof handler == 'function') {
    return handler(node);
  }

  return '';
}

module.exports = function(ast) {
  return ast.map(writeNode).join('');
};
