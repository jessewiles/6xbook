// templating.js
//

$(window.document).ready(
    function() {
        var Cache = {};
        window.Templating = {
            render: function(aid, values) {
                if (Cache[aid] === undefined || Cache[aid] === null) {
                    Cache[aid] = new window.Templating.Template(aid);
                }
                return Cache[aid].apply(values);
            },
            Template: function(aid) {
                this.text = $(aid).html();
                this.apply = function(replacements, escapeHtml /*optional*/) {
                    var result = unescape(this.text);
                    if (replacements !== null && replacements !== undefined) {
                        var matches = result.match(/(\$\{[^\}]+\})/gm);

                        var wstring = result;
                        if (matches !== null) {
                            for (var i = 0; i < matches.length; i++) {
                                var _match = matches[i].replace('$', '\\$').replace('{', '\\{').replace('}', '\\}');
                                var _key = _match.substring(4, _match.length - 2); // get the key less the markup meta chars
                                var _replacement = (replacements[_key] !== undefined) ? replacements[_key] : '';

                                if (escapeHtml) {
                                    _replacement = _replacement.replace(/&/gm, '&amp;')
                                                               .replace(/</gm, '&lt;')
                                                               .replace(/>/gm, '&gt;')
                                                               .replace(/\"/gm, '&quot;');
                                }
                                wstring = wstring.replace(new RegExp(_match, 'gm'), _replacement);
                            }
                        }

                        result = wstring;
                    }
                    return result;
                };
            }
        };
    }
);

