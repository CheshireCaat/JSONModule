function JSONPathError(message) {
    this.message = message;
    this.toString = function () {
        return 'JSONPathError: ' + message;
    }
}

function JSONPath() {
    var query = function (data, expression, output) {
        var output = output || "VALUE";
        var result = [];

        var normalize = function (expression) {
            var subx = [];
            return expression.replace(/[\['](\??\(.*?\))[\]']/g, function ($0, $1) {
                return "[#" + (subx.push($1) - 1) + "]";
            }).replace(/'?\.'?|\['?/g, ";")
                .replace(/;;;|;;/g, ";..;")
                .replace(/;$|'?\]|'$/g, "")
                .replace(/#([0-9]+)/g, function ($0, $1) {
                    return subx[$1];
                });
        }

        var asPath = function (path) {
            var x = path.split(";"), p = "$";
            for (var i = 1, n = x.length; i < n; i++)
                p += /^[0-9*]+$/.test(x[i]) ? ("[" + x[i] + "]") : ("['" + x[i] + "']");
            return p;
        }

        var asKey = function (path) {
            var x = path.split(";");
            return x[x.length - 1];
        }

        var store = function (path, value) {
            if (path) {
                switch (resultType) {
                    case "PATH":
                        result.push(asPath(path));
                        break;
                    case "KEY":
                        result.push(asKey(path));
                        break;
                    default:
                        result.push(value);
                        break;
                }
            }

            return !!path;
        }

        var trace = function (expression, val, path) {
            if (expression) {
                var x = expression.split(";"), loc = x.shift();
                x = x.join(";");
                if (val && val.hasOwnProperty(loc))
                    trace(x, val[loc], path + ";" + loc);
                else if (loc === "*")
                    walk(loc, x, val, path, function (m, l, x, v, p) {
                        trace(m + ";" + x, v, p);
                    });
                else if (loc === "..") {
                    trace(x, val, path);
                    walk(loc, x, val, path, function (m, l, x, v, p) {
                        typeof v[m] === "object" && trace("..;" + x, v[m], p + ";" + m);
                    });
                }
                else if (/,/.test(loc)) { // [name1,name2,...]
                    for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++)
                        trace(s[i] + ";" + x, val, path);
                }
                else if (/^\(.*?\)$/.test(loc)) // For script expressions like [(expression)]
                    trace(evaluate(loc, val, path.substr(path.lastIndexOf(";") + 1)) + ";" + x, val, path);
                else if (/^\?\(.*?\)$/.test(loc)) // For filter expressions likne [?(expression)]
                    walk(loc, x, val, path, function (m, l, x, v, p) {
                        if (evaluate(l.replace(/^\?\((.*?)\)$/, "$1"), v[m], m))
                            trace(m + ";" + x, v, p);
                    });
                else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
                    slice(loc, x, val, path);
            }
            else store(path, val);
        }

        var walk = function (loc, expression, value, path, callback) {
            if (value instanceof Array) {
                for (var i = 0; i < value.length; i++)
                    callback(i, loc, expression, value, path);
            }
            else if (typeof value === 'object') {
                for (var m in value)
                    if (value.hasOwnProperty(m))
                        callback(m, loc, expression, value, path);
            }
        }

        var slice = function (loc, expression, value, path) {
            if (value instanceof Array) {
                const n = value.length, parts = loc.split(':');

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
                log(x + "|" + _v + "|" + _vname);
                return $ && _v && eval(x.replace(/@/g, "_v"));
            }
            catch (e) {
                throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a"));
            }
        }

        if (expression) {
            trace(normalize(expression).replace(/^\$;/, ""), data, '$');
            return result.length ? result : undefined;
        }
    }

    var checkFormat = function (data) {
        const obj = '[object Object]';
        const arr = '[object Array]';

        if (typeof data !== 'string') return false;
        try {
            var result = JSON.parse(data);
            var type = Object.prototype.toString.call(result);
            return type === obj || type === arr;
        } catch (err) {
            return false;
        }
    }

    var changeFormat = function (data, format) {
        switch (format.toLowerCase()) {
            case 'string': {
                if (typeof data === 'object') {
                    return JSON.stringify(data);
                }
                else {
                    return undefined;
                }

                return data;
            }
            case 'json': {
                if (typeof data === 'string') {
                    if (checkFormat(data)) {
                        return JSON.parse(data);
                    }
                    else {
                        return undefined;
                    }
                }
                else {
                    return data;
                }
            }
            default: return undefined;
        }
    }

    var getValues = function (data, path, type) {
        if (typeof data === 'string') {
            data = changeFormat(data, 'json');
        }

        var json = query(data, path, type);
        return typeof json === 'undefined' ? undefined : json;
    }

    this.getCount = function (data, path) {
        if (typeof data === 'string') {
            data = changeFormat(data, 'json');
        }

        if (path != '') {
            return query(data, path).length;
        }

        return Object.keys(data).length;
    }

    this.queryValues = function (data, path) {
        var values = getValues(data, path);
        return typeof values === 'undefined' ? '' : values;
    }

    this.queryValue = function (data, path) {
        var values = getValues(data, path);
        return typeof values === 'undefined' ? '' : values[0];
    }

    this.queryKeys = function (data, path) {
        var keys = getValues(data, path, 'KEY');
        return typeof keys === 'undefined' ? '' : keys;
    }

    this.queryKey = function (data, path) {
        var keys = getValues(data, path, 'KEY');
        return typeof keys === 'undefined' ? '' : keys[0];
    }

    this.changeFormat = changeFormat;
    this.checkFormat = checkFormat;
}

const JPath = new JSONPath();