var _settings = {
    leadingChar: '#'
};

function parse(str, settings) {
    var lines = split(str);
    check(lines);
    return build(lines);
}

function config(settings) {
    var key, val;
    if (!settings) {
	return;
    }

    for (key in _settings) {
	val = settings[key];
	if (val) {
	    _settings[key] = val;
	}
    }
}

function split(str) {
    var lines = str.split(/[\r\n]+/);

    return lines.filter(function(line) {
	return line.trim() != '';
    });
}

function check(str) {
    checkRoot(str);
}

function checkRoot(lines) {
    var c = _settings.leadingChar,
	firstTwoPattern = new RegExp('^' + c + '[^' + c + ']');
	pattern = new RegExp('^' + c + '[^' + c + '].*$'),
	roots = lines.filter(function(line) {
	    return pattern.test(line);
	});
    
    if (roots.length > 1) {
	throw new Error('Only single root node is allowed!');
    }

    if (!firstTwoPattern.test(lines[0])) {
	throw new Error('The root node should be the first node!');
    }    
}

function parseLine(line) {
    var c = _settings.leadingChar,
	pattern = new RegExp('^(' + c + '+)' + '(.+)$'),
	matches = line.match(pattern);

    return {
	level: matches[1].length - 1,
	value: matches[2]
    }
}	

function build(lines) {
    var i, 
	node,
	root = {},
	stack = [],
	len = lines.length;

    for (i = 0; i < len; ++i) {
	node = parseLine(lines[i]);

	if (stack.length == 0) {
	    root = node;
            stack.unshift(root);
	    continue;
	}

	while(stack[0].level >= node.level) {
            stack.shift();
	}

	if (!stack[0].nodes) {
	    stack[0].nodes = [];
	}

	stack[0].nodes.push(node);
	stack.unshift(node);
    }

    return root;
}

exports.parse = parse;
