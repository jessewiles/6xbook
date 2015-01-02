function BookPageModel(dayId) {
    this.dayId = dayId;
}

BookPageModel.prototype.get  = function(el) {
    var result = el.text();
    var propid = el.attr('id');
    if (this[propid] !== null && this[propid] !== undefined) {
        result = this[propid];
        if (result.length == 0) 
            result = 'Click to set theme.';

        if (el.hasClass('wltext')) {
            el.removeClass('wltext');
            el.addClass('wtext');
            el.on('focus', textSelect)
              .on('mouseup', textSelect)
              .on('blur', blurCheck);;
        }
    }
    return result;
};
BookPageModel.prototype.load = function(payload) {
    for (var item in payload) {
        this[item] = payload[item];
    }
    this.migrate();
};
BookPageModel.prototype.set = function(aid, data) {
    if (! this.addedDayToList) {
        if (window.BookList.all().indexOf(this.dayId) == -1)
            window.BookList.add(this.dayId);
        this.addedDayToList = true;
    }
    data = data.replace(/\"/gm, '&quot;');
    this[aid] = data;
    this.commit();
};
BookPageModel.prototype.remove = function(el) {
    delete this[el.attr('id')];
    this.commit();
};
BookPageModel.prototype.commit = function() {
    localStorage.setItem(window.BookPage.dayId, JSON.stringify(this));
};
BookPageModel.prototype.migrate = function() {
    for (var i = 1; i < 7; i++) {
        var _theme_id = 'theme' +i.toString();
        var _theme = this[_theme_id];
        if (_theme === undefined || _theme === null) {
            this[_theme_id] = 'Click to set theme';
        }
    }
};
function BookListModel() {
    var list = localStorage.getItem('6xpages');
    if (list !== null && list !== undefined) {
        var json = JSON.parse(list);
        for (var i = 0; i < json.length; i++) {
            this[i] = json[i];
        }
        this.length = json.length;
    }
}
BookListModel.prototype.all = function() {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        result[i] = this[i];
    }
    result.sort();
    result.reverse();
    return result;
};
BookListModel.prototype.add = function(aid) {
    var list = this.all();
    if (list.indexOf(aid) < 0) {
        list.push(aid);
        this.commit(list);
    }
};
BookListModel.prototype.commit = function(list) {
    localStorage.setItem('6xpages', JSON.stringify(list));
};

$(window.document).ready(
    function() {
        var dayId = window.location.pathname.replace(/\/[^\/]+\//, '');
        window.TodayId = dayId;

        window.BookPage = new BookPageModel(dayId);

        var lmodel = window.BookPage.data;

        if (lmodel !== null && lmodel !== undefined) {
            var json = JSON.parse(lmodel);
            window.BookPage.load(json);
        }
        else {
            if (window.bookdata !== null && window.bookdata !== undefined) {
                try {
                    var json = JSON.parse(window.bookdata);
                    window.BookPage.load(json);
                }
                catch (e) {
                    window.bookdata = window.bookdata.replace(/\n/g, '&#x0A;'); 
                    try {
                        var json = JSON.parse(window.bookdata);
                        window.BookPage.load(json);
                    }
                    catch(e) {
                        console.log(e);
                    }
                }
            }
        }

        $('.pagedata').each(
            function() {
                $(this).html(window.BookPage.get($(this)));
            } 
        );

        window.BookList = new BookListModel;
    }
);

