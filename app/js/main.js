(function ($) {
	"use strict";

	$(".test-page__choice-dot").on('click', function(){
		$(".test-page__choice.active").removeClass('active');
		$(this).parent().addClass('active');
	});

	$(".menu__search input").keyup(function () {
		if ($(this).val().length > 3) {
			$('.menu').addClass('search-active');
		} else {
			$('.menu').removeClass('search-active');
		}
	});

	$(".header__burger").on('click', function () {
		$('body').toggleClass('no-scroll');
		$(this).toggleClass('active');
		$(".menu").toggleClass('active');
	});

	$(".popup__acceptance").on('click', function () {
		$(this).toggleClass('active');
	});

	$(".popup .button").on('click', function () {
		$(".popup__form").hide();
		$(".popup__complete").show();
	});

	var slickMainFrame = {
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		fade: true,
		asNavFor: '.offer-screen__slide-images'
	};
	var slickNav = {
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		fade: true
	};

	$('.offer-screen__slider').slick(slickMainFrame);
	$('.offer-screen__slide-images').slick(slickNav);

	$('.video-analytics__slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		responsive: [{
			breakpoint: 960,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	});

	$('.course__slider').slick({
		slidesToShow: 15,
		slidesToScroll: 5,
		arrows: true,
		dots: false,
		responsive: [{
			breakpoint: 960,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			}
		}]
	});

	function cloneWars() {
		$(".slick-cloned").each(function () {
			$(this).find('a[data-fancybox]').removeAttr("data-fancybox");
			$(this).removeAttr("data-fancybox");
		})
	}

	$(window).on('load', function () {
		cloneWars();
	});

	$('.show-popup').on('click', function (e) {
		e.preventDefault();
		var popup = $(this).attr('data-popup');
		$('body').addClass('no-scroll');
		$('.popup__content.active').removeClass('active');
		$('.popup, .popup__content--' + popup).addClass('active');
	});

	$('.popup, .popup__close').on('click', function (e) {
		$('.popup').removeClass('active');
		$('body').removeClass('no-scroll');
	});

	$('.popup__content').on('click', function (e) {
		e.stopPropagation();
	});

	$('input[type="tel"]').inputmask('+7(999)999-99-99');

	$('img.svg').each(function () {
		var $img = jQuery(this),
			imgID = $img.attr('id'),
			imgClass = $img.attr('class'),
			imgURL = $img.attr('src'),
			imgWidth = $img.attr('width'),
			imgHeight = $img.attr('height');

		$.get(imgURL, function (data) {
			var $svg = jQuery(data).find('svg');
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}
			if (typeof imgWidth !== 'undefined') {
				$svg = $svg.attr('width', imgWidth);
			}
			if (typeof imgHeight !== 'undefined') {
				$svg = $svg.attr('height', imgHeight);
			}
			$svg = $svg.removeAttr('xmlns:a');
			$img.replaceWith($svg);
		}, 'xml');
	});

})(jQuery);