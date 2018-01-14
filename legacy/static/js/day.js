// day.js
//
window.Day  = {
    SelectTheme: function($selection) {
        /* 
          $selection has attrs:
              data-callerid
              data-themeid
              data-number
              data-title
        */
        var _id = $selection.attr('data-callerid');
        var $caller = $('#' + _id);
        $caller.text($selection.attr('data-title'));
        BookPage.set(_id, $caller.text());
        $.ajax({
            url: '/book/' + window.TodayId,
            type: 'POST',
            data: {
                book: localStorage.getItem(window.location.pathname.replace(/^\/[^\/]+\//, ''))
            }
        });
        window.Glass.hide();
    },

    AdHocKeyHandler: function(param_event) {
        if (!param_event) param_event = window.event;
        var _code = param_event.keyCode ? param_event.keyCode : param_event.which;
        if (_code === 13) {
            var _raw_title = $(param_event.target).val();
            var _caller = $('#'+$(param_event.target).attr('data-callerid'));
            _caller.text(_raw_title);
            _title = escape(_raw_title);
            if (_title.length > 0) {
                _data = 'title=' +_title+ '&description=' +_title;
                $.ajax({
                    url: '/settings/theme/add',
                    type: 'POST',
                    data: _data
                })
                .done(
                    function(data) {
                        window.BookPage.commit();
                        Glass.hide();
                    }
                );
            }
        }
    }
};

$(window.document).ready(
    function() {
        $('.switch').on('click', function(e) {
            var _hidden = $('#east').is(':hidden');
            switch(_hidden) {
                case false:
                    $('#east').hide();
                    $('#west').show();
                    break;
                case true: 
                    $('#west').hide();
                    $('#east').show();
                    break;
                default:
                    break;
            }
        });

        //$('.alarm').on('click', function(e) { window.Glass.show('xxx'); } );
        $('.theme').on('click', function(e) { 
            var _caller_id = $(this).children('div').first().attr('id');
            var _html = [
                '<div class="addtheme">'
                  +'<input type="text" '
                         +'class="adhoc" '
                         +'id="adhoc-theme" '
                         +'name="adhoc-theme" '
                         +'value="Add theme" '
                         +'onkeypress="window.Day.AdHocKeyHandler()" '
                         +'onfocus="var f = function($this) {if ($this.val() === \'Add theme\'){$this.val(\'\');$this.css(\'color\', \'#000\');}};f($(this));" '
                         +'onblur="var f = function($this) {if ($this.val() === \'\') {$this.val(\'Add theme\');$this.css(\'color\', \'#ddd\');}};f($(this));" '
                         +'data-callerid="' +_caller_id+ '"'
                    +'/>'
                  +'</div>'
            ];
            $.ajax({
                url: '/settings/themes',
                type: 'GET',
                async: false
            })
            .done(
                function(data) {
                    for (var i = 0; i < data.themes.length; i++) {
                        var _theme = data.themes[i];
                        _html.push(
                            '<div class="selectable-theme" onclick="window.Day.SelectTheme($(this));" data-callerid="'
                            +_caller_id+
                            '" data-themeid="'
                            +_theme.id+
                            '" data-number="'
                            +_theme.number+
                            '" data-title="'
                            +_theme.title+
                            '"><span class="selectable-number">'
                            +_theme.number+ 
                            '</span> <span class="selectable-title">'
                            +_theme.title+ 
                            '</span></div>');
                    }
                }
            );
            window.Glass.show(
                window.Templating.render('#select-theme', { themes: _html.join('\n') })
            ); 
        });

        $('span[data-prev]').on('click', function(e) {
            document.location = '/day/'+ $(this).attr('data-prev');
        });
        $('span[data-next]').on('click', function(e) {
            document.location = '/day/'+ $(this).attr('data-next');
        });
    }
);
