function JSONPathError(message) {
    this.message = message;
    this.toString = function () {
        return 'JSONPathError: ' + message;
    }
}

function JSONPath() {

   var checkFormat = function (data) {
      try {
            JSON.parse(data);
            return true;
        }
        catch (e) {
            return false;
        }
    }

    var changeFormat = function (data, format) {
        switch (format.toLowerCase()) {
            case 'string': {
                if (typeof data !== 'string') {
                    return JSON.stringify(data);
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
            default: throw new JSONPathError("Invalid format type.");
        }
    }

    var getValues= function(data, path) {
        data = changeFormat(data, 'json');

        if (path !== '') {
            var json = jsonPath(data, path);
            return typeof json === 'undefined' ? undefined : json;
        }

        return data;
    }

    this.getCount = function (data, path) {
        if (typeof data === 'string') {
            data = changeFormat(data, 'json');
        }

        if (path != '') {
            return jsonPath(data, path).length;
        }

        return Object.keys(data).length;
    }

    this.queryValues = function (data, path) {
        var values = getValues(data, path);
        return typeof values === 'undefined' ? 'undefined' : values;
    }

    this.queryValue = function (data, path) {
        var values = getValues(data, path);
        /* 
            If path is empty, should I return the first value from the object, 
            the object itself or give an error?
        */
        return typeof values === 'undefined' ? 'undefined' : values[0];
    }

    this.checkFormat = checkFormat;
    this.changeFormat = changeFormat;
}

const JPath = new JSONPath();

function jsonPath(data, expression, args) {
    var parser = {
        resultType: args && args.resultType || "VALUE",
        result: [],

        normalize: function (expression) {
            var subx = [];
            return expression.replace(/[\['](\??\(.*?\))[\]']/g, function ($0, $1) {
                return "[#" + (subx.push($1) - 1) + "]";
            }).replace(/'?\.'?|\['?/g, ";")
                .replace(/;;;|;;/g, ";..;")
                .replace(/;$|'?\]|'$/g, "")
                .replace(/#([0-9]+)/g, function ($0, $1) {
                    return subx[$1];
                });
        },

        asPath: function (path) {
            var x = path.split(";"), p = "$";
            for (var i = 1, n = x.length; i < n; i++)
                p += /^[0-9*]+$/.test(x[i]) ? ("[" + x[i] + "]") : ("['" + x[i] + "']");
            return p;
        },

        asKey: function (path) {
            var x = path.split(";");
            return x[x.length - 1];
        },

        store: function (path, value) {
            if (path) {
                switch (parser.resultType) {
                    case "PATH":
                        parser.result[parser.result.length] = parser.asPath(path);
                        break;
                    case "KEY":
                        parser.result[parser.result.length] = parser.asKey(path);
                        break;
                    default:
                        parser.result[parser.result.length] = value;
                        break;
                }
            }

            return !!path;
        },

        trace: function (expression, val, path) {
            if (expression) {
                var x = expression.split(";"), loc = x.shift();
                x = x.join(";");
                if (val && val.hasOwnProperty(loc))
                    parser.trace(x, val[loc], path + ";" + loc);
                else if (loc === "*")
                    parser.walk(loc, x, val, path, function (m, l, x, v, p) {
                        parser.trace(m + ";" + x, v, p);
                    });
                else if (loc === "..") {
                    parser.trace(x, val, path);
                    parser.walk(loc, x, val, path, function (m, l, x, v, p) {
                        typeof v[m] === "object" && parser.trace("..;" + x, v[m], p + ";" + m);
                    });
                }
                else if (/,/.test(loc)) { // [name1,name2,...]
                    for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++)
                        parser.trace(s[i] + ";" + x, val, path);
                }
                else if (/^\(.*?\)$/.test(loc)) // [(expression)]
                    parser.trace(parser.eval(loc, val, path.substr(path.lastIndexOf(";") + 1)) + ";" + x, val, path);
                else if (/^\?\(.*?\)$/.test(loc)) // [?(expression)]
                    parser.walk(loc, x, val, path, function (m, l, x, v, p) {
                        if (parser.eval(l.replace(/^\?\((.*?)\)$/, "$1"), v[m], m))
                            parser.trace(m + ";" + x, v, p);
                    });
                else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
                    parser.slice(loc, x, val, path);
            }
            else
                parser.store(path, val);
        },

        walk: function (loc, expression, value, path, callback) {
            if (value instanceof Array) {
                for (var i = 0, n = value.length; i < n; i++)
                    if (i in value)
                        callback(i, loc, expression, value, path);
            }
            else if (typeof value === "object") {
                for (var m in value)
                    if (value.hasOwnProperty(m))
                        callback(m, loc, expression, value, path);
            }
        },

        slice: function (loc, expression, value, path) {
            const sliceToken = /^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g;

            if (value instanceof Array) {
                var len = value.length, start = 0, end = len, step = 1;
                loc.replace(sliceToken,
                    function ($0, $1, $2, $3) {
                        start = parseInt($1 || start);
                        end = parseInt($2 || end);
                        step = parseInt($3 || step);
                    }
                );
                start = (start < 0) ? Math.max(0, start + len) : Math.min(len, start);
                end = (end < 0) ? Math.max(0, end + len) : Math.min(len, end);
                for (var i = start; i < end; i += step) {
                    parser.trace(i + ';' + expression, value, path);
                }
            }
        },

        eval: function (x, _v, _vname) {
            try {
                return $ && _v && eval(x.replace(/@/g, "_v"));
            }
            catch (e) {
                throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a"));
            }
        }
    };

    if (expression) {
        parser.trace(parser.normalize(expression).replace(/^\$;?/, ""), data, '$');
        return parser.result.length ? parser.result : undefined;
    }
}