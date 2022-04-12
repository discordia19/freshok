'use strict';

(() => {
	// Card name shortening

	const textContentShortening = (cssQuery, MAX_LENGTH) => {
		const textElements = document.querySelectorAll(cssQuery);

		textElements.forEach((textElement) => {
			const currentText = textElement.textContent;

			if (currentText.length > MAX_LENGTH) {
				textElement.textContent = `${currentText.substring(0, (currentText[MAX_LENGTH - 1] === ' ') ? (MAX_LENGTH - 3) : (MAX_LENGTH - 2))}${String.fromCharCode(8230)}`;
			} 
		});
	};

	textContentShortening('.card__name-link', 83);
	textContentShortening('.smallcard__name-link', 55);	


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
	const openCart = document.querySelector('.header__cartlink--cartlink');
	new Cart(cart, openCart);

	// Cards
	
	class Card {
		constructor(elem) {
			this._elem = elem;
			this._favorite = elem.querySelector('.card__favorite');
			elem.onclick = this.onClick.bind(this);
		}

		subtract(event) {
			const target = event.target;

			const itemsCountDisplay = target.nextElementSibling;
			let curAmount = itemsCountDisplay.value; 

			if (curAmount === '') return;

			if (curAmount > 1) {
				itemsCountDisplay.value = --curAmount;
			}
		}

		add(event) {
			const target = event.target;

			const itemsCountDisplay = target.previousElementSibling;
			let curAmount = itemsCountDisplay.value; 
			
			if (curAmount === '') {
				itemsCountDisplay.value = 1;
				itemsCountDisplay.style.backgroundColor = '#E0EDCF';
			}

			if (curAmount < 99) {
				itemsCountDisplay.value = ++curAmount;
			}
		}

		toggleFavorite(event) {
			this._favorite.classList.toggle('card__favorite--enable');
		}

		onClick(event) {
			let action = event.target.dataset.action;
			if (action) {
				this[action](event);
			}
		}
	}

	const cards = document.querySelectorAll('.card');
	cards.forEach((card) => {
		new Card(card);
	})

	// Search

	const searchformBtn = document.querySelector('.form__button');

	searchformBtn.addEventListener('click', (event) => (event.preventDefault()));

	// Catalog

	document.addEventListener('click', (event) => {
		let catalog = document.querySelector('.catalog__menu');

		if (event.target.dataset.actionId === 'toggleCatalog' || 
				!catalog.classList.contains('catalog__menu--disable') && !event.target.className.includes('catalog')) {

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
	let topContainer = document.querySelector('[data-ref="container-1"]');
	let promotionsContainer = document.querySelector('[data-ref="container-2"]');

	let config = {
		controls: {
			scope: 'local'
		}
	}

	var mixerTop = mixitup(topContainer, config);
	var mixerPromotions = mixitup(promotionsContainer, config);
})();