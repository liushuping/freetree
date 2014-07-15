freetree
========

A node module for creating tree data structure from text input

## code examples
```JavaScript
var freetree = require('freetree');
var str = '#abc\r\n##def\r\n##xyz';
var ds = freetree.parse(str);
```
now, `console.log(JSON.stringify(ds))` will output below
```JavaScript
```
