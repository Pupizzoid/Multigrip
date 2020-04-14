$(document).ready(function() {

	function fitAll() {
		if ($(window).width() <= 576) {
			$('#zoom_viewport').width(576)
		} else {
			$('#zoom_viewport').width('100%')
		}
	}

	fitAll();

	$(window).resize(fitAll);

	$('#btn_open').click(function() {
		$('body').toggleClass('active');
	})

	$('#btn_close').click(function() {
		$('body').removeClass('active');
	})

	$('#submenu').click(function(event) {
		event.preventDefault();
		$('#mobile_menu').addClass('active');
	})

	$('#btn_back').click(function() {
		$('#mobile_menu').removeClass('active');
	})

	$('.cards__item input[type="checkbox"]').each(function() {
		$(this).hide();
	})
});

