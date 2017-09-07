'use strict';

$(document).ready(function() {
	
	var count = parseFloat($('.js-count').attr('data-count')/10);

	for (var i = 0; i < 10; i++) {
		$('.js-count-inner').append('<span></span>');
		var countWidth = parseFloat($('.js-count-inner span').width() + 3.7);
		$('.js-shown').css('width', count*countWidth + 'px')

	}

	$(".js-ellipsis").dotdotdot({
		watch: "window"
	});

});