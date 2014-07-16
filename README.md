freetree
========

A node module for creating tree data structure from text input

This module takes a tree structured input string and build a JavaScript tree object in memory. 

A simple tree structured input string example:
```
\#root node
\##node1
\###node11
\##node2
```
It illustrates a tree as below:
```
root node
 |-- node1
 |    |--node11
 |-- node2
```
## Conventions
Each line represents a node in the tree, it should begins with the leading character (default is \#). The count of leading chracters minus 1 is the level of the node. There should be only 1 root node which has only 1 leading character, and it should be in the first line of the input string.
## Code examples
```JavaScript
var freetree = require('freetree');
var str = '#abc\r\n##def\r\n##xyz';
var ds = freetree.parse(str);
```
now, `console.log(JSON.stringify(ds))` will output below
```JavaScript
```
