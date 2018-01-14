$(window.document).ready(
    function() {
        window.Settings = function() {
            /*  defines:               */
            /*      changePassword     */
            /*      changeGMT          */
            /*      changeNotify       */
            /*      changeAlarm        */
            /*      changeThemeClick   */
            /*      changeTheme        */
            /*      addThemeClick      */
            /*      addTheme           */
            /*      deleteTheme        */
            /*      refreshThemes      */
            /*                         */
            var changePassword, 
                changeGMT,
                changeNotify,
                changeAlarm,
                changeThemeClick,
                changeTheme,
                addTheme,
                deleteTheme,
                refreshThemes;

            // changePassword
            //
            changePassword = function() {
                var _old,
                    _new,
                    _confirm,
                    _data;

                _old = escape($('#old-password').val());
                _new = escape($('#new-password').val());
                _confirm = escape($('#confirm-new-password').val());
                _data = '_old=' +_old+ '&_new=' +_new+ '&_confirm=' +_confirm; 

                $.ajax({
                    url: '/login', 
                    type: 'PUT',
                    data: _data
                })
                .done(
                    function(data) {
                        if (data.delete_session) {
                            $('.message').fadeIn(1000).text(data.message).delay(1000).fadeOut(3000);
                            setTimeout(function() {document.location = data.redirect;}, 3000);
                        }
                        else {
                            $('.message').text(data.message).fadeIn(500).delay(1000).fadeOut(3000);
                        }
                    }
                );
                
            };

            // changeGMT
            //
            changeGMT = function(newValue) {
                $.ajax({
                    url: '/settings/gmt',
                    type: 'PUT',
                    data: { gmt: newValue }
                })
                .done(
                    function(data) {
                        $('.top-message').text(data.message).fadeIn(500).delay(1000).fadeOut(3000); 
                    }
                );
            };

            // changeNotify
            //
            changeNotify = function(newValue) {
                $.ajax({
                    url: '/settings/notify',
                    type: 'PUT',
                    data: {notify: newValue}
                })
                .done(
                    function(data) {
                        $('.top-message').text(data.message).fadeIn(500).delay(1000).fadeOut(3000);
                    }
                );
            };

            // changeAlarm
            //
            changeAlarm = function(_id, newValue) {
                var matches = _id.match(/alarm-([1-6])-(.*)/);
                var _order_id = matches[1];
                var _column = matches[2];
                $.ajax({
                    url: '/settings/alarm',
                    type: 'PUT',
                    data: {order_id: _order_id, column: _column, new_value: newValue}
                })
                .done(
                    function(data) {
                        $('.top-message').text(data.message).fadeIn(500).delay(1000).fadeOut(3000);
                    }
                );
            };

            // changeThemeClick
            //
            changeThemeClick = function() {
                var _id = $(this).attr('id').substring(6);
                $.ajax({
                    url: '/settings/theme/' + _id,
                    type: 'GET',
                }).done(
                    function(data) {
                        Glass.show(
                            $('#change-theme').html()
                                              .replace('${theme-title}', data.title)
                                              .replace('${theme-description}', data.description)
                                              .replace('${theme-order-id}', data.orderid)
                        );
                    }
                );
            };

            // changeTheme
            //
            changeTheme = function() {
                var _title,
                    _desc,
                    _order_id,
                    _data;

                _title = escape($('#theme-title').val());
                _description = escape($('#theme-description').val());
                _order_id = escape($('#theme-order-id').val());
                _data = '_title=' +_title+ '&_description=' +_description+ '&_order_id=' + _order_id;

                $.ajax({
                    url: '/settings/theme/' +_order_id,
                    type: 'PUT',
                    data: _data
                })
                .done(
                    function(data) {
                        Glass.hide();
                        $('.top-message').text(data.message).fadeIn(500).delay(1000).fadeOut(3000);
                    }
                );
            };

            // addThemeClick
            //
            addThemeClick = function(data) {
                Glass.show($('#add-theme').html());
            };

            // addTheme
            //
            addTheme = function() {
                var _title,
                    _desc,
                    _order_id,
                    _data;

                var _title = escape($('#theme-title').val());
                var _description = escape($('#theme-description').val());
                _data = 'title=' +_title+ '&description=' +_description;

                $.ajax({
                    url: '/settings/theme/add',
                    type: 'POST',
                    data: _data
                })
                .done(
                    function(data) {
                        Glass.hide();
                        Settings.refreshThemes();
                        $('.top-message').text(data.message).fadeIn(500).delay(1000).fadeOut(3000);
                    }
                );
            };

            // deleteTheme
            //
            deleteTheme = function(tid) {
                $.ajax({
                    url: '/settings/theme/' + tid,
                    type: 'DELETE'
                })
                .done(
                    function(data) {
                        Settings.refreshThemes();
                    }
                );
            };
            
            // refreshThemes
            //
            refreshThemes = function() {
                $.ajax({
                    url: '/settings/themes'
                })
                .done(
                    function(data) {
                        var _buffer = ['<div class="title"> My Themes</div>'];
                        var _template = $('#refresh-themes').html();
                        for (var i = 0; i < data.themes.length; i++) {
                            var _theme = data.themes[i];
                            var _line = _template.replace(/\$\{index\}/g, (i + 1).toString()).replace('${title}', _theme.title);
                            _buffer.push(_line);
                        }
                        _buffer.push('<div class="addable"> Add theme </div>');

                        $('#themes').hide().html(_buffer.join('\n')).fadeIn(1000);

                        $('.theme').on('click', Settings.changeThemeClick);
                        $('.addable').on('click', function(data) {
                            Glass.show($('#add-theme').html());
                        });
                        $('.delete').on('click', function(e) {
                            Settings.deleteTheme($(this).attr('id').replace('delete-', ''));
                        });
                    }
                );
            };

            /* exports: */
            /*     changePassword     */
            /*     changeGMT          */
            /*     changeNotify       */
            /*     changeAlarm        */
            /*     changeThemeClick   */
            /*     changeTheme        */
            /*     addThemeClick      */
            /*     addTheme           */
            /*     deleteTheme        */
            /*     refreshThemes      */
            /*                        */
            return {
                changePassword: changePassword,
                changeGMT: changeGMT,
                changeNotify: changeNotify,
                changeAlarm: changeAlarm,
                changeThemeClick: changeThemeClick,
                changeTheme: changeTheme,
                addThemeClick: addThemeClick,
                addTheme: addTheme,
                deleteTheme: deleteTheme,
                refreshThemes: refreshThemes
            }
        }();

        /* Bind events */
        /*             */
        $('#change-password-link').on('click', function() {
            Glass.show($('#change-password').html());
        });

        $('.theme').on('click', Settings.changeThemeClick);
        $('.addable').on('click', Settings.addThemeClick);
        $('.delete').on('click', function(e) {
            Settings.deleteTheme($(this).attr('id').replace('delete-', ''));
        });

        $('select').change( 
            function() {
                var _id = $(this).attr('id');
                
                if ($(this).attr('id').indexOf('alarm') > -1) {
                    Settings.changeAlarm(_id, $(this).val());
                }
                else if ($(this).attr('id').indexOf('gmt') > -1) {
                    Settings.changeGMT($(this).val());
                }
                else if ($(this).attr('id').indexOf('notify') > -1) {
                    Settings.changeNotify($(this).val());
                }
            }
        );


    }
);
