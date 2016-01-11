


$.fn.scrollView = function () {
	return this.each(function () {
		$('html, body, #content-window').animate({
			scrollTop: $(this).offset().top
		}, 450);
	});
}