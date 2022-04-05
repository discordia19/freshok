'use strict';

(() => {
	
	// Cart

	class Cart {
		constructor(elem, openBtn) {
			this._elem = elem;
			this._open = openBtn;
			elem.onclick = this.onClick.bind(this);
			openBtn.onclick = this.onClick.bind(this);
		}

		updateTotalPrice() {
			const totalPriceDisplay = document.querySelector('.cart__summary');
			const prices = document.querySelectorAll('.cart__curr-summary');
			let totalPrice = 0;

			for (let price of prices) {
				console.log(price);
				totalPrice += parseInt(price.innerHTML);
			}

			totalPriceDisplay.innerHTML = totalPrice;
		}

		subtract(event) {
			const target = event.target;

			const itemsCountDisplay = target.nextElementSibling;
			const itemsPriceDisplay = target.parentNode.nextElementSibling;
			let itemPrice = parseInt(target.parentElement.parentElement.previousElementSibling.lastElementChild.innerHTML);

			let itemsCount = itemsCountDisplay.innerHTML;

			if (itemsCount > 1) {
				itemsCountDisplay.innerHTML = --itemsCount;
				itemsPriceDisplay.innerHTML = itemsCount * itemPrice;
				this.updateTotalPrice();
			}
		}

		add(event) {
			const target = event.target;

			const itemsCountDisplay = target.previousElementSibling;
			const itemsPriceDisplay = target.parentNode.nextElementSibling;


			let itemPrice = parseInt(target.parentElement.parentElement.previousElementSibling.lastElementChild.innerHTML);
			let itemsCount = itemsCountDisplay.innerHTML;

			if (itemsCount < 99) {
				itemsCountDisplay.innerHTML = ++itemsCount;
				itemsPriceDisplay.innerHTML = itemsCount * itemPrice;
				this.updateTotalPrice();
			}
		}

		toggleCart() {
			console.log('inToggle')
			this._elem.classList.toggle('cart--disable');
			document.body.classList.toggle('scroll-off');
		}

		onClick(event) {
			console.log('hello')
			let action = event.target.dataset.action;
			if (action) {
				this[action](event);
			}
		}
	}

	const cart = document.querySelector('.cart');
	const openCart = document.querySelector('.header__cartlink');
	new Cart(cart, openCart);

	// Search

	const searchformBtn = document.querySelector('.form__button');

	searchformBtn.addEventListener('click', (event) => (event.preventDefault()));

	// Catalog

	document.addEventListener('click', (event) => {
		if (event.target.dataset.actionId === 'catalog') {
			let catalog = document.querySelector('.catalog__menu');
			let button = document.querySelector('.catalog__button');

			catalog.classList.toggle('catalog__menu--disable');
			button.classList.toggle('catalog__button--active');
		}
	});

	// import Swiper styles

	const swiper = new Swiper('.promo', {
		loop: false,
		slideClass: 'promo__slide',
		wrapperClass: 'promo__wrapper',

		navigation: {
			nextEl: '.promo__pagination--next',
			prevEl: '.promo__pagination--prev',
			disabledClass: 'promo__pagination--disable'
		},

		a11y: {
			firstSlideMessage: 'Первая акция',
			prevSlideMessage: 'Предыдущая акция',
			nextSlideMessage: 'Следующая акция',
			lastSlideMessage: 'Последняя акция'
		}
	});

	// mixitup

	var mixer = mixitup('.top__cards');
})();