freetree
========

A node module for creating tree data structure from text input

This module takes a tree structured input string and build a JavaScript tree object in memory. 

A simple tree structured input string (input.txt) example:
```
#root node
##node1
###node11
##node2
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
Prepare an `input.txt` file as above demonstrated.
```JavaScript
var fs = require('fs');
var freetree = require('freetree');
var str = fs.readFileSync('input.txt', 'utf8');
var tree = freetree.parse(str);
```
then, the `free` object is an in-memory JavaScript tree object. In this example, the object is in structure:
```JavaScript
{
 "level":0,
 "value":"root",
 "nodes":[{
	    "level":1,
	    "value":"node1",
	    "nodes":[{
		       "level":2,
	   	       "value":"node11"
		    }]
	  },
	  {
	    "level":1,
	    "value":"node2"
	  }]
}
```
## Test
Make sure `mocha` is installed globally
```
npm install mocha -g
```
Run `npm test` to run unit test
## License
MIT
