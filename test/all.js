const fs = require('fs');
const path = require('path');
const async = require('async');
const marked = require('marked-ast');
const { toMarkdown } = require('..');
const test = require('tape');
const samples = [
  'heading.md',
  'headings.md',
  'simple.md',
  'links.md',
  'blockquote.md',
  'code.md',
  'image.md',
  'tables.md',
  'comment.md',
  'html.md',
  'list.md',
  'codespan.md',
  'hr.md'
];
let loadedSamples;
let expectedOutputs;

test('load all the samples', function(t) {

  function loadFile(filename, callback) {
    fs.readFile(path.resolve(__dirname, 'input', filename), { encoding: 'utf-8' }, callback);
  }

  t.plan(1);
  async.map(samples, loadFile, function(err, items) {
    loadedSamples = items;
    t.ifError(err);
  });
});

test('load the expected outputs', function(t) {
  function loadFile(filename, callback) {
    fs.readFile(path.resolve(__dirname, 'expected', filename), { encoding: 'utf-8' }, callback);
  }

  t.plan(1);
  async.map(samples, loadFile, function(err, items) {
    expectedOutputs = items;
    t.ifError(err);
  });
});

samples.forEach(function(filename, idx) {
  test('Parse and write: ' + filename, function(t) {
    var ast;
    t.plan(1);

    ast = marked.parse(loadedSamples[idx]);
    t.equal(toMarkdown(ast), expectedOutputs[idx], 'matched expected');
  });
});
