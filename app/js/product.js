'use strict';

import { Fancybox } from "/js/fancybox.min.js";

// // import { Fancybox, Carousel } from "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.esm.js";

// console.log('hello');

// const myCarousel = new Carousel(document.querySelector(".carousel"), {
// 'slidesPerPage' : 1,
// 'center' : true,
// 'infinite' : false,
// 'fill' : false,
// Dots: false,
// 'initialPage' : 0,
// 'slidesPerPage' : 1,
// 'width' : '100%'

// });

{
	const productSwiper = new Swiper('.product__slider', {
		loop: false,
		wrapperClass: 'product__wrapper',
		slideClass: 'product__slide',
		slidesPerView: 1,

		navigation: {
			nextEl: '.product__arrow--next',
			prevEl: '.product__arrow--prev'
		},
	});

	Fancybox.bind('[data-fancybox="gallery-1"]', {
		Toolbar: false,

		Image: {
			zoom: false,
			click: false,
			wheel: "slide",
		  },
	}); 
}
