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
    return '**' + node.text.map(writeNode).join('') + '**';
  },

  em: function(node) {
    return '_' + node.text.map(writeNode).join('') + '_';
  },

  link: function(node) {
    var href = node.href;
    if (node.title) {
      href += ' "' + node.title + '"';
    }

    if (typeof node.text == 'string' || (node.text instanceof String)) {
      return '<' + href + '>';
    }

    return '[' + node.text.map(writeNode).join('') + '](' + href + ')';
  },

  blockquote: function(node) {
    return '> ' + node.quote.map(writeNode);
  },

  code: function(node) {
    return '```' + (node.lang || '') + '\n' + node.code + '\n' + '```' + '\n\n';
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
