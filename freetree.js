function parse(str, settings) {
    var _settings = {
        leadingChar: '#',
        compact: false
    };

    config(_settings, settings);

    var lines = split(str);
    check(lines, _settings);
    return build(lines, _settings);
}

function config(_settings, settings) {
    var key, val;
    if (!settings)
        return;

    for (key in _settings) {
        val = settings[key];
        if (val) _settings[key] = val;
    }
}

function split(str) {
    var lines = str.split(/[\r\n]+/);

    return lines.filter(function(line) {
        return line.trim() != '';
    });
}

function check(str, _settings) {
    checkRoot(str, _settings);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function checkRoot(lines, _settings) {
    var c = escapeRegExp(_settings.leadingChar),
        firstTwoPattern = new RegExp('^' + c + '[^' + c + ']'),
        pattern = new RegExp('^' + c + '[^' + c + '].*$'),
        roots = lines.filter(function(line) {
            return pattern.test(line);
        });

    if (roots.length > 1)
        throw new Error('Only single root node is allowed!');


    if (!firstTwoPattern.test(lines[0]))
        throw new Error('The root node should be the first node!');
}

function parseLine(line, _settings) {
    var c = escapeRegExp(_settings.leadingChar),
        pattern = new RegExp('^(' + c + '+)' + '(.+)$'),
        matches = line.match(pattern),
        node = Object.create(null);

    node.level = matches[1].length - 1;
    node.value = matches[2];
    return node;
}

function build(lines, _settings) {
    var i,
        node,
        root = Object.create(null),
        stack = [],
        len = lines.length;

    for (i = 0; i < len; ++i) {
        node = parseLine(lines[i], _settings);

        if (stack.length == 0) {
            root = node;
            stack.unshift(root);
            continue;
        }

        while (stack[0].level >= node.level)
            stack.shift();

        if (!stack[0].nodes)
            stack[0].nodes = [];

        stack[0].nodes.push(node);
        stack.unshift(node);
    }

    if (_settings.compact)
        return compress(root);

    return root;
}

function compress(root) {
    var compressed = Object.create(null);
    if (root.nodes) {
        compressed[root.value] = [];
        for (var i = 0, len = root.nodes.length; i < len; ++i)
            compressed[root.value].push(compress(root.nodes[i]));
    } else
        compressed[root.value] = null;

    return compressed;
}

exports.parse = parse;