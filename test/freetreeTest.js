var assert = require('assert');
var freetree = require('../freetree');

describe('#parse', function() {
    it('should parse 0 level tree', function() {
	var str = '#abc';
	var tree = freetree.parse(str);
        assert.ok(tree.level == 0);
	assert.ok(tree.value == 'abc');
	assert.ok(tree.nodes == undefined);
    });

    it('should parse 1 level tree', function() {
	var str = '#abc\r\n##def\r\n##xyz';
	var tree = freetree.parse(str);
        assert.ok(tree.level == 0);
	assert.ok(tree.value == 'abc');
	assert.ok(tree.nodes.length == 2);
    });

    it('should parse 2 level tree', function() {
	var str = '#abc\r\n##def\r\n###123\r\n##xyz';
	var tree = freetree.parse(str);
        assert.ok(tree.level == 0);
	assert.ok(tree.value == 'abc');
	assert.ok(tree.nodes.length == 2);
	assert.ok(tree.nodes[0].nodes[0].value == '123');
    });

    it('should parse 2 level tree with custom leading character', function() {
	var str = '@abc\r\n@@def\r\n@@@123\r\n@@xyz';
	var tree = freetree.parse(str, {leadingChar: '@'});
        assert.ok(tree.level == 0);
	assert.ok(tree.value == 'abc');
	assert.ok(tree.nodes.length == 2);
	assert.ok(tree.nodes[0].nodes[0].value == '123');
    });

    it('should parse 2 level tree with regular expression control character as leading character', function() {
	var str = '*abc\r\n**def\r\n***123\r\n**xyz';
	var tree = freetree.parse(str, {leadingChar: '*'});
        assert.ok(tree.level == 0);
	assert.ok(tree.value == 'abc');
	assert.ok(tree.nodes.length == 2);
	assert.ok(tree.nodes[0].nodes[0].value == '123');
    });
});
