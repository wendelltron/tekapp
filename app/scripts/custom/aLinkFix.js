'use strict';
$(document).on('click', 'a:not(.local)', function (ev) {
    ev.preventDefault();
    window.open($(ev.target).attr('href'), '_system');
});