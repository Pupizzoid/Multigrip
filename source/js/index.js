$(document).ready(function() {

	$('.slider__list').slick({
		dots: true,
		prevArrow: $('.slider__btn.slider__btn--prev'),
		nextArrow: $('.slider__btn.slider__btn--next'),
		dotsClass: 'slider__dots',
		infinite: true,
		speed: 300,
		// autoplaySpeed: 30000,
		// autoplay: true,
		arrows: true
	});

	let symptomsData = {
		throat: false,
		temperature: false,
		immunity: false,
		nose: false
	};


	function onCheckboxChange() {
		const symptom = $(this).prop("name");
		symptomsData[symptom] = $(this).is(':checked');
		if (symptomsData[symptom]) {
			$(this).parent().addClass('active');
			$('*[data-symptoms="' + symptom + '"]').each(function() {
				$(this).parent().addClass('choice');
			});
		} else {
			$(this).parent().removeClass('active');
			$('*[data-symptoms="' + symptom + '"]').each(function() {
				console.log(	$(this).parent())
				$(this).parent().removeClass('choice');
			});
		}
		localStorage.setItem('symptoms', JSON.stringify(symptomsData));
	}


	function restoreData() {
		let data = JSON.parse(localStorage.getItem('symptoms'));
		if (data == null) {
			localStorage.setItem('symptoms', JSON.stringify(symptomsData));
			return;
		}
		symptomsData = data;
		for (let key in symptomsData) {
			if (!symptomsData.hasOwnProperty(key)) {
				continue;
			}
			if (symptomsData[key]) {
				const symptomCheckbox = $('.points__item input[type="checkbox"][name="' + key + '"]');
				symptomCheckbox.prop('checked', true);
				symptomCheckbox.parent().addClass('active');
				onCheckboxChange.call(symptomCheckbox);
			}
		}
	}

	$('.points__item input[type="checkbox"]').each(function() {
		$(this).hide();
		$(this).change(onCheckboxChange);
	})
	restoreData();

});

