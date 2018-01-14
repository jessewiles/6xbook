var CONST_ENTERTEXT = 'Click to enter text';

var textSelect = function(event) {
    var e = $(this);
    var t = e.text();
    if (t === CONST_ENTERTEXT) {
        var hl = function() {
            var range, c, selection;

            event.stopPropagation();

            e.removeClass('wltext');
            e.addClass('wtext');

            range = window.document.createRange();
            c = e.get(0).firstChild;

            range.setStart(c, 0);
            range.setEnd(c, c.data.length);

            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        };
        setTimeout(hl, 10, e);
    }
};
var blurCheck = function(event) {
    var e = $(this);
    var t = e.text();
    if (t === CONST_ENTERTEXT) {
        e.removeClass('wtext');
        e.addClass('wltext');
        BookPage.remove(e);
    }
    else if (t === '') {
        e.text(CONST_ENTERTEXT);
        e.removeClass('wtext');
        e.addClass('wltext');
        BookPage.remove(e);
    }
    else {
        BookPage.set(e.attr('id'), t);
        $.ajax({
            url: '/book/' + window.TodayId,
            type: 'POST',
            data: {
                book: localStorage.getItem(window.location.pathname.replace(/^\/[^\/]+\//, ''))
            }
        });
    }
};
$(document).ready(
    function() {
        $('#page').fadeIn('slow');
        $('.wltext').on('focus', textSelect)
                    .on('mouseup', textSelect)
                    .on('blur', blurCheck);;
    }
);

