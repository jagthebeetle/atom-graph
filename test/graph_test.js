var assert = require('assert');
var graph = require('../graph');

describe('atom.Graph', function() {
  var a, b;
  beforeEach(function() {
    a = new graph.AdjacencyList();
  });
  describe('addVertexByKey', function() {
    it('should increment population', function() {
      a.addVertexByKey(5);
      a.addVertexByKey('foo');
      assert.equal(a.population, 2);
    });
    it('should not enter duplicates', function() {
      a.addVertexByKey(5);
      a.addVertexByKey('foo');
      a.addVertexByKey(5);
      a.addVertexByKey('foo');
      assert.equal(a.population, 2);
    });
    it('should accept a variable number of arguments', function() {
      a.addVertexByKey(1,2,3,4);
      assert.equal(a.population, 4);
    });
    it('should reject duplicates when given several args', function() {
      a.addVertexByKey(1,2,2,3,1);
      assert.equal(a.population, 3);
    });
    it('should return false if no vertices were added', function() {
      a.addVertexByKey(5);
      assert.equal(a.addVertexByKey(5), false);
    });
    it('should return true if a vertex was added', function() {
      assert.equal(a.addVertexByKey(5), true);
    });
  });
  describe('connectToByKey', function() {
    it('should add second argument to first argument\'s adjacencies', function() {
      a.addVertexByKey(1);
      a.addVertexByKey(2);
      a.connectToByKey(1, 2);
      assert.equal(a.vertices[1].adjacencies[2], a.vertices[2]);
    });
  });
  describe('deleteByKey', function() {
    beforeEach(function() {
      a.addVertexByKey(1);
      a.addVertexByKey(2);
      a.connectToByKey(1,2);
    });
    it('should remove vertex from all other vertices\s adjacencies', function() {
      a.deleteByKey(2);
      assert.equal(a.vertices[1].adjacencies[2], undefined);
    });
    it('should decrement population', function() {
      a.deleteByKey(1);
      assert.equal(a.population, 1);
    });
  });
});