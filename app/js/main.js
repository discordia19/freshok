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
	const openCart = document.querySelector('.header__user-link--cartlink');
	new Cart(cart, openCart);

	// Menu 

	class Menu {
		constructor(elem, openBtn) {
			this._elem = elem;
			this._open = openBtn;
			elem.onclick = this.onClick.bind(this);
			openBtn.onclick = this.onClick.bind(this);
		}

		toggleMenu() {
			console.log('inToggle')
			this._elem.classList.toggle('menu--disable');
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

	const menu = document.querySelector('.menu');
	const openMenu = document.querySelector('.header__burger');
	new Menu(menu, openMenu);


	// Search

	const searchformBtn = document.querySelector('.form__button');
	const showSearchBtn = document.querySelector('.header__user-link--search');

	searchformBtn.addEventListener('click', (event) => (event.preventDefault()));
	showSearchBtn.addEventListener('click', (event) => {
		const search = document.querySelector('.header__form');

		search.classList.toggle('header__form--active');
	});

	// Catalog

	document.addEventListener('click', (event) => {
		const inCatalog = (target) => {
			return !target.className.includes('catalogue') && target.className.includes('catalog');
		}

		let catalog = document.querySelector('.catalog__menu');

		if (event.target.dataset.actionId === 'toggleCatalog' ||
			!catalog.classList.contains('catalog__menu--disable') && !inCatalog(event.target)) {

			let button = document.querySelector('.catalog__button');

			catalog.classList.toggle('catalog__menu--disable');
			button.classList.toggle('catalog__button--active');
		}
	});

	// Home page

	if (location.pathname === '/') {
		// import Swiper styles

		const swiper = new Swiper('.promo', {
			loop: false,
			slideClass: 'promo__slide',
			wrapperClass: 'promo__wrapper',

			navigation: {
				nextEl: '.promo__arrow--next',
				prevEl: '.promo__arrow--prev',
				disabledClass: 'promo__arrow--disable'
			},

			pagination: {
				el: '.promo__pagination',
				type: 'bullets',
				bulletClass: 'promo__bullet',
				bulletActiveClass: 'promo__bullet--active',
			},

			a11y: {
				firstSlideMessage: 'Первая акция',
				prevSlideMessage: 'Предыдущая акция',
				nextSlideMessage: 'Следующая акция',
				lastSlideMessage: 'Последняя акция'
			}
		});

		const partnersSwiper = new Swiper('.partners__slider', {
			loop: false,
			slideClass: 'partners__item',
			wrapperClass: 'partners__list',
			slidesPerView: 6,

			// navigation: {
			// 	nextEl: '.promo__pagination--next',
			// 	prevEl: '.promo__pagination--prev',
			// 	disabledClass: 'promo__pagination--disable'
			// },

			breakpoints: {
				0: {
					slidesPerView: 2
				},
				560: {
					slidesPerView: 4
				},
				800: {
					slidesPerView: 6
				},
				972: {
					slidesPerView: 6
				},
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
	}



	// Cards

	if (location.pathname === '/' || location.pathname.includes('/catalogue.html')) {
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


				if (curAmount > 0) {
					itemsCountDisplay.value = --curAmount;

					if (curAmount == 0) itemsCountDisplay.style.backgroundColor = '#EBEBEB';
				}
			}

			add(event) {
				const target = event.target;

				const itemsCountDisplay = target.previousElementSibling;
				let curAmount = itemsCountDisplay.value;


				if (curAmount < 99) {
					if (curAmount === '0') {
						itemsCountDisplay.style.backgroundColor = '#E0EDCF';
					}

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
	}


	// Catalogue page

	if (location.pathname.includes('/catalogue.html')) {

		// Filter menu

		class Filter {
			constructor(elem, openBtn) {
				this._elem = elem;
				this._open = openBtn;
				elem.onclick = this.onClick.bind(this);
				openBtn.onclick = this.onButtonClick.bind(this);
			}
	
			toggleFilter() {
				console.log('inToggle')
				this._elem.classList.toggle('filters--disable');
				document.body.classList.toggle('scroll-off');
			}
	
			onButtonClick(event) {
				console.log('hello')
				let action = event.target.dataset.action;
				if (action) {
					this[action](event);
				}
			}

			onClick(event) {
				if (document.documentElement.clientWidth < 1170) {
					console.log('work')
					let action = event.target.dataset.action;
					if (action) {
						this[action](event);
					}
				}
			}
		}

		const filterElem = document.querySelector('.filters');
		const filterBtn = document.querySelector('.catalogue__filter-btn--openfilters');

		const filter = new Filter(filterElem, filterBtn);


		// Slider filter

		const MIN_PRICE = 0;
		const MAX_PRICE = 1200;

		const minInput = document.querySelector('.filters__price--min');
		const maxInput = document.querySelector('.filters__price--max');

		const currentMin = +minInput.value || 100;
		const currentMax = +maxInput.value || 1000;

		var slider = document.querySelector('.filters__slider');

		noUiSlider.create(slider, {
			start: [currentMin, currentMax],
			connect: true,
			range: {
				'min': [MIN_PRICE, 5],
				'max': MAX_PRICE
			}
		});

		slider.noUiSlider.on('update', (values, handle) => {
			[minInput, maxInput][handle].value = Math.round(values[handle]);
		})

		// listening inputs

		minInput.addEventListener('change', function () {
			let min = this.value;

			if (this.value < currentMin) min = currentMin;

			if (this.value > currentMax) min = currentMax;

			slider.noUiSlider.set([this.value, null]);
		});

		maxInput.addEventListener('change', function () {
			let max = this.value;

			if (this.value < currentMin) min = currentMin;

			if (this.value > currentMax) min = currentMax;

			slider.noUiSlider.set([null, this.value]);
		});

		// Filter items (categories, price, brand)

		class FilterItems {
			constructor(element, disableButton) {
				this.element = element;
				this.disableButton = disableButton;

				element.onclick = this.onClick.bind(this);
				disableButton.onclick = this.onClick.bind(this);
			}

			toggleFilterItems() {
				this.disableButton.classList.toggle('filters__name--disabled');

				this.element.classList.toggle('filters__items--disabled');
			}

			onClick(event) {
				console.log(event);
				let action = event.target.dataset.action;
				this[action]();
			}
		}

		const targetLists = document.querySelectorAll('.filters__items');
		const targetButtons = document.querySelectorAll('.filters__name');

		let elemsArray = Array.from(targetLists);
		let buttonsArray = Array.from(targetButtons);

		let filterItems = elemsArray.map((element, idx) => ([element, buttonsArray[idx]]));


		filterItems.forEach(([elem, toggleBtn]) => (new FilterItems(elem, toggleBtn)));
	}

	// Catalogue sort buttons

	class SortButton {
		constructor(gridButton, listButton) {
			this.STATE = 'grid';
			this.gridButton = gridButton;
			this.gridButtonSvgUses = Array.from(gridButton.querySelectorAll('.catalogue__use'));
			console.log(this.gridButtonSvgUses[0]);

			this.listButton = listButton;
			this.listButtonSvgUses = Array.from(listButton.querySelectorAll('.catalogue__use'));

			console.log(gridButton)
			console.log(listButton)

			gridButton.onclick = this.disableList.bind(this);
			listButton.onclick = this.enableList.bind(this);
		}

		disableList() {
			if (this.STATE !== 'grid') {
				this.gridButtonSvgUses.forEach((use) => {
					use.classList.toggle('catalogue__use--disabled');
				});
				this.listButtonSvgUses.forEach((use) => {
					use.classList.toggle('catalogue__use--disabled');
				});

				const horizontalCards = Array.from(document.querySelectorAll('.card--horizontal'));

				horizontalCards.forEach((elem) => (elem.classList.remove('card--horizontal')));

				const horizontalGrid = Array.from(document.querySelectorAll('.catalogue__list--horizontal'));

				horizontalGrid.forEach((elem) => (elem.classList.remove('catalogue__list--horizontal')));

				this.STATE = 'grid';
			}
		}

		enableList() {
			if (this.STATE !== 'list') {
				this.gridButtonSvgUses.forEach((use) => {
					use.classList.toggle('catalogue__use--disabled');
				});
				this.listButtonSvgUses.forEach((use) => {
					use.classList.toggle('catalogue__use--disabled');
				});

				const horizontalCards = Array.from(document.querySelectorAll('.card'));

				horizontalCards.forEach((elem) => (elem.classList.add('card--horizontal')));

				const horizontalGrid = Array.from(document.querySelectorAll('.catalogue__list'));

				horizontalGrid.forEach((elem) => (elem.classList.add('catalogue__list--horizontal')));

				this.STATE = 'list';
			}
		}
	}

	const [listBtn, gridBtn] = document.querySelectorAll('.catalogue__filter-btn--view');
	const sortButtons = new SortButton(gridBtn, listBtn);

	// Filter view control

	window.addEventListener('resize', () => {
		console.log('resize');

		if (document.documentElement.clientWidth < 800) {
			sortButtons.disableList();
		}
	});


})();