$(window.document).ready(
    function() {
        var glass = $(document.createElement('div'))
            .attr('id', 'glass')

        var glassclose = $(document.createElement('div'))
            .text('X')
            .addClass('glassclose')
            .on('click', function(e) {
                window.Glass.hide(); 
            });

        var glassContent = $(document.createElement('div'))
            .attr('id', 'glass-content');

        var workbox = $(document.createElement('div'))
            .attr('id', 'workbox')
            .append(glassclose)
            .append(glassContent);
        
        $(window.document.body).append( glass );
        $(window.document.body).append( workbox );

        window.Glass = function(){
            var show = function(content) {
                $('#glass').show();
                $('#glass-content').html(content);
                $('#workbox').show('slow');
            };

            var hide = function() {
                $('#workbox').hide();
                $('#glass').hide();
                $(window.document).trigger('glass.close');
            };

            return {
                show: show,
                hide: hide
            }
        }();
    }
);


