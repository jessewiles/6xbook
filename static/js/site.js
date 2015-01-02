var Site = {};
var now = new Date();
Site.gmt = now.toString()
              .match(/GMT([^\s]+)/)[1]
              .replace(/00$/, '')
              .replace('-0', '-')
              .replace('+0', '+');

$(window.document).ready(
    function() {
        $('.flash').fadeIn(1000).delay(2000).fadeOut(2000);
    }
);
