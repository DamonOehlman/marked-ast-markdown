var fs = require('fs');
var path = require('path');
var async = require('async');
var test = require('tape');
var samples = ['heading.md'];
var loadedSamples;

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
