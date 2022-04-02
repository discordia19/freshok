'use strict';
'use strict';

(() => {
	const BODY_SELECTOR = '.body';
	const SCROLL_OFF_CLASS = 'scroll-off'; 

	const toggleClass = (elementSelector, className) => {
		let elements = document.querySelectorAll(elementSelector);

		elements.forEach((element) => {
			element.classList.toggle(className);
		});
	};

	// Search

	const searchformBtn = document.querySelector('.searchform__button');

	searchformBtn.addEventListener('click', (event) => (event.preventDefault()));

	// Cart
	
	const CART_SELECTOR = '.cart';
	const CART_DISABLE_CLASS = 'cart--disable';

	const toggleCart = () => {
		toggleClass(CART_SELECTOR, CART_DISABLE_CLASS);
		toggleClass(BODY_SELECTOR, SCROLL_OFF_CLASS);
	}

	const openCartBtn = document.querySelector('.header__cartlink');
	const closeCartBtn = document.querySelector('.cart__close');

	openCartBtn.addEventListener('click', toggleCart);
	closeCartBtn.addEventListener('click', toggleCart);

	// Cart counter

	

	// Catalog

	const CATALOG_DISABLE_CLASS = 'catalog__menu--disable'
	const CATALOG_BTN_CLASS = 'catalog__button--active'
	const CATALOG_SELECTOR = '.catalog__menu';
	const CATALOG_BTN_SELECTOR = '.catalog__button'

	const toggleCatalog = () => {
		toggleClass(CATALOG_BTN_SELECTOR, CATALOG_BTN_CLASS);
		toggleClass(CATALOG_SELECTOR, CATALOG_DISABLE_CLASS);
	};

	const toggleCatalogBtn = document.querySelector('.catalog__button');
	toggleCatalogBtn.addEventListener('click', toggleCatalog);


})();