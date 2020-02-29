/**
 * Check if the object has 'string' type or not.
 * @param {Object} obj Object to check.
 * @returns Object has string type.
 */
var isString = function (obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
};

/**
 * Check if the object has 'object' type or not.
 * @param {Object} obj Object to check.
 * @returns Object has object type.
 */
var isObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

/**
 * Check if the object has 'array' type or not.
 * @param {Object} obj Object to check.
 * @returns Object has array type.
 */
var isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

function JSONPath() {

    this.normalize = function (path) {
        var subx = [];

        path = path.indexOf('..') === 0 ? ('$' + path) : path;
        path = path.indexOf('$.') !== 0 ? ('$.' + path) : path;

        return path
            .replace(/[\['](\??\(.*?\))[\]']/g, function (_$0, $1) {
                return "[#" + (subx.push($1) - 1) + "]";
            })
            .replace(/'?\.'?|\['?/g, ";")
            .replace(/;;;|;;/g, ";..;")
            .replace(/;$|'?\]|'$/g, "")
            .replace(/#([0-9]+)/g, function (_$0, $1) {
                return subx[$1];
            });
    };

    this.query = function (obj, expression, output) {
        var output = output || 'value';
        var cache = [];

        var asPath = function (path) {
            var x = path.split(';'), p = '$';
            for (var i = 1, n = x.length; i < n; i++) {
                p += (/^[0-9*]+$/).test(x[i]) ? ('[' + x[i] + ']') : ("['" + x[i] + "']");
            }
            return p;
        };

        var asKey = function (path) {
            var x = path.split(";");
            return x[x.length - 1];
        };

        var store = function (path, val) {
            switch (output) {
                case 'path':
                    cache.push(asPath(path));
                    break;
                case 'key':
                    cache.push(asKey(path));
                    break;
                default:
                    cache.push(val);
                    break;
            }
        };

        var trace = function (expression, val, path) {
            if (expression) {
                var x = expression.split(";"), loc = x.shift();
                x = x.join(";");
                if (val && val.hasOwnProperty(loc))
                    trace(x, val[loc], path + ";" + loc);
                else if (loc === "*")
                    walk(loc, x, val, path, function (m, _l, x, v, p) {
                        trace(m + ";" + x, v, p);
                    });
                else if (loc === "..") {
                    trace(x, val, path);
                    walk(loc, x, val, path, function (m, _l, x, v, p) {
                        typeof v[m] === "object" && trace("..;" + x, v[m], p + ";" + m);
                    });
                }
                else if (/,/.test(loc)) {
                    // For sequence like [name1,name2,...]
                    for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++)
                        trace(s[i] + ";" + x, val, path);
                }
                else if (/^\(.*?\)$/.test(loc)) {
                    // For script expressions like [(expression)]
                    trace(evaluate(loc, val, path.substr(path.lastIndexOf(";") + 1)) + ";" + x, val, path);
                }
                else if (/^\?\(.*?\)$/.test(loc)) {
                    // For filter expressions like [?(expression)]
                    walk(loc, x, val, path, function (m, l, x, v, p) {
                        if (evaluate(l.replace(/^\?\((.*?)\)$/, "$1"), v[m], m))
                            trace(m + ";" + x, v, p);
                    });
                }
                else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) {
                    // For python-style slice like [start:end:step]
                    slice(loc, x, val, path);
                }
            }
            else store(path, val);
        }

        var walk = function (loc, expression, value, path, callback) {
            if (isArray(value)) {
                for (var i = 0; i < value.length; i++)
                    callback(i, loc, expression, value, path);
            }
            else if (isObject(value)) {
                for (var m in value) {
                    if (value.hasOwnProperty(m))
                        callback(m, loc, expression, value, path);
                }
            }
        }

        var slice = function (loc, expression, value, path) {
            if (isArray(value)) {
                var n = value.length, parts = loc.split(':');

                var start = (parts[0] && parseInt(parts[0])) || 0;
                var step = (parts[2] && parseInt(parts[2])) || 1;
                var end = (parts[1] && parseInt(parts[1])) || n;

                start = (start < 0) ? Math.max(0, start + n) : Math.min(n, start);
                end = (end < 0) ? Math.max(0, end + n) : Math.min(n, end);

                for (var i = start; i < end; i += step) {
                    trace(i + ';' + expression, value, path);
                }
            }
        }

        var evaluate = function (x, _v, _vname) {
            try {
                return _v && eval(x.replace(/@/g, "_v"));
            }
            catch (e) {
                throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a"));
            }
        }

        if (expression && obj) {
            trace(this.normalize(expression).replace(/^\$;/, ""), obj, '$');
            return cache.length ? cache : false;
        }
    }
}

/**
 * Change format from string to JSON or vice versa.
 * @param {Object|String} obj Selected string or JSON object.
 * @param {String} format Selected format for converting.
 * @returns {Object|String} Converted object or string.
 */
JSONPath.prototype.changeFormat = function (obj, format) {
    switch (format.toLowerCase()) {
        case 'string': return convertToString(obj);
        case 'json': return convertToObject(obj);
        default: return obj;
    }
};

/**
 * @private
 * Converts object to string.
 * @param {String|Object} obj Object or string to convert.
 * @returns Converted object.
 */
var convertToString = function (obj) {
    return isObject(obj) ? JSON.stringify(obj) : obj;
};

/**
 * @private
 * Converts string to object.
 * @param {String|Object} obj Object or string to convert.
 * @returns Converted string.
 */
var convertToObject = function (obj) {
    return isString(obj) ? JSON.parse(obj) : obj;
}

/**
 * Check that string has a valid JSON format.
 * @param {String} obj Selected string.
 * @returns {boolean} String validity.
 */
JSONPath.prototype.checkFormat = function (obj) {
    try {
        var json = JSON.parse(obj);
        return isObject(json)
            || isArray(json);
    } catch (e) {
        return false;
    }
};

/**
 * Change nested object property using string path.
 * @param {Object|String} obj Selected string or JSON object.
 * @param {String} path Selected object query string.
 * @returns {Object|String} Modified object or string.
 */
JSONPath.prototype.change = function (obj, path, val) {
    path = this.normalize(path).split(';');
    path.shift();

    var result = baseChange(convertToObject(obj), path, val);
    return isString(obj) ? convertToString(result) : result;
};

/**
 * @private
 * Base function for changing nested object property using string path.
 * @param {Object|String} obj Selected string or JSON object.
 * @param {String} path Selected object query string.
 * @returns {Object|String} Modified object or string.
 */
var baseChange = function (obj, path, value) {
    if (!isObject(obj)) return obj;
    if (!isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];

    var last = path.slice(0, -1).reduce(function (a, c, i) {
        return Object(a[c]) === a[c]
            ? a[c]
            : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1]
                ? []
                : {}
    }, obj);

    last[path[path.length - 1]] = value;
    return obj;
};

/**
 * Remove nested object property using string path.
 * @param {Object|String} obj Selected string or JSON object.
 * @param {String} path Selected object query string.
 * @returns {Object|String} Modified object or string.
 */
JSONPath.prototype.remove = function (obj, path) {
    path = this.normalize(path).split(';');
    path.shift();

    var result = baseRemove(convertToObject(obj), path);
    return isString(obj) ? convertToString(result) : result;
};

/**
 * @private
 * Base function for removing nested object property using string path.
 * @param {Object|String} obj Selected string or JSON object.
 * @param {String} path Selected object query string.
 * @returns {Object|String} Modified object or string.
 */
var baseRemove = function (obj, path) {
    if (!isObject(obj)) return obj;
    if (!isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];

    var last = path.slice(0, -1).reduce(function (a, c, i) {
        return Object(a[c]) === a[c]
            ? a[c]
            : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1]
                ? []
                : {}
    }, obj);

    delete last[path[path.length - 1]];
    return obj;
};

/**
 * Get number of elements with selected path.
 * @param {Object|String} obj Selected string or JSON object.
 * @param {String} path Selected JSONPath query string.
 * @returns {number} Number of elements.
 */
JSONPath.prototype.count = function (obj, path) {
    var jsonObj = convertToObject(obj);
    if (path) {
        var keys = this.query(jsonObj, path);
        return keys === false ? 0 : keys.length;
    }
    return Object.keys(jsonObj).length;
};

/**
 * Query values with selected path and return array of matching values.
 * @param {Object|String} obj Selected string or JSON object.
 * @param {String} path Selected JSONPath query string.
 * @returns {Object} Array of matching values.
 */
JSONPath.prototype.values = function (obj, path) {
    var values = this.query(convertToObject(obj), path);
    return values === false ? '' : values;
};

/**
 * Query values with selected path and return first matching value.
 * @param {Object|String} obj Selected string or JSON object.
 * @param {String} path Selected JSONPath query string.
 * @returns {Object} First matching value.
 */
JSONPath.prototype.value = function (obj, path) {
    var values = this.values(obj, path);
    return !isArray(values) ? '' : values[0];
};

/**
 * Query keys with selected path and return array of matching keys.
 * @param {Object|String} obj Selected string or JSON object.
 * @param {String} path Selected JSONPath query string.
 * @returns {Array} Array of matching keys.
 */
JSONPath.prototype.keys = function (obj, path) {
    var keys = this.query(convertToObject(obj), path, 'key');
    return keys === false ? '' : keys;
};

/**
 * Query keys with selected path and return first matching key.
 * @param {Object|String} obj Selected string or JSON object.
 * @param {String} path Selected JSONPath query string.
 * @returns {Object} First matching key.
 */
JSONPath.prototype.key = function (obj, path) {
    var keys = this.keys(obj, path);
    return !isArray(keys) ? '' : keys[0];
};

const JPath = new JSONPath();