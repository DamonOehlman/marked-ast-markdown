var entities = require('entities');
var times = require('whisk/times');

function createChar(x) {
  return function() {
    return x;
  }
}

function getUrl(node) {
  var href = node.href;
  if (node.title) {
    href += ' "' + node.title + '"';
  }

  return href;
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
    var href = getUrl(node);

    if (typeof node.text == 'string' || (node.text instanceof String)) {
      return '<' + href + '>';
    }

    return '[' + node.text.map(writeNode).join('') + '](' + href + ')';
  },

  image: function(node) {
    var href = getUrl(node);

    return '![' + node.text + '](' + href + ')';
  },

  list: function (node, index, ast) {
    return (function list(node, ind) {
      return node.body.map(function (item, c) {
        var charPrefix = node.ordered ? ((c+1) + '. ') : '* ';
        return '\n' + ind + charPrefix + item.text.map(function (node) {
          if (typeof node === 'string') { return node; }
          if (node.type !== 'list') { return writeNode(node); }
          return list(node, ind + '  ');
        }).join('')
      }).join('')
    })(node, '').slice(1) + ((index !== ast.length-1) ? '\n\n\n' : '');
  },

  blockquote: function(node) {
    return '> ' + node.quote.map(writeNode);
  },

  code: function(node) {
    return '```' + (node.lang || '') + '\n' + node.code + '\n' + '```' + '\n\n';
  },

  codespan: function (node) {
    return '`' + node.text + '`';
  },

  table: function(node) {
    return [
      node.header.map(writeNode),
      node.header.map(writeTableHeaderLine).join(''),
      node.body.map(writeNode).join('\n')
    ].join('\n') + '\n\n';
  },

  tablerow: function(node) {
    return '| ' + node.content.map(writeNode).join(' | ') + ' |';
  },

  tablecell: function(node) {
    return node.content.map(writeNode).join('');
  },

  html: function(node) {
    return node.html.map(writeNode).join('') + '\n';
  },
  hr: function (node, index, ast) {
    return '---' + ((index !== ast.length-1) ? '\n\n' : '');
  }
};


function writeNode(node, index, ast) {
  var handler = generators[node.type];

  if (typeof node == 'string' || (node instanceof String)) {
    return entities.decodeHTML(node);
  }

  if (typeof handler == 'function') {
    return handler(node, index, ast);
  }

  return '';
}

function writeTableHeaderLine(node) {
  return '| ' + node.content.map(function(cell) {
    var headerLen = cell.content.reduce(function(memo, item) {
      return (memo || 0) + (item.length ? item.length : 0);
    }, 0);
    var header = times(headerLen).map(createChar('-')).join('');

    switch ((cell.flags || {}).align) {
      case 'left': {
        header = ':' + header.slice(1);
        break;
      }

      case 'right': {
        header = header.slice(0, -1) + ':';
        break;
      }

      case 'center': {
        header = ':' + header.slice(1, -1) + ':';
        break;
      }
    }

    return header;
  }).join(' | ') + ' |';
}

module.exports = function(ast) {
  return ast.map(writeNode).join('');
};
