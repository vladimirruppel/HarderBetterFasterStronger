// // Import jQuery module (npm i jquery)
import $ from 'jquery'
window.jQuery = $
window.$ = $

// Импорт модуля с npm
// import 'module_name'
import 'smooth-scroll'
import 'inputmask'
import Swiper from 'swiper'
import noUiSlider from 'nouislider'
import wNumb from 'wnumb'
import lightGallery from 'lightgallery'
import tippy from 'tippy.js'
import datepicker from 'js-datepicker'
import 'jquery.maskedinput'

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

function onClickActions() {
	document.addEventListener('click', (e) => {
		const target = e.target;

		// actions
	})
}

document.addEventListener('DOMContentLoaded', () => {

	files();

	onClickActions();

})

// Сюда вставлять большие скрипты
function files() {
	//=================
	//Menu
	let iconMenu = document.querySelector(".icon-menu");
	if (iconMenu != null) {
		let delay = 500;
		let menuBody = document.querySelector(".menu__body");
		iconMenu.addEventListener("click", function (e) {
			if (unlock) {
				body_lock(delay);
				iconMenu.classList.toggle("_active");
				menuBody.classList.toggle("_active");
			}
		});
	};
	function menu_close() {
		let iconMenu = document.querySelector(".icon-menu");
		let menuBody = document.querySelector(".menu__body");
		iconMenu.classList.remove("_active");
		menuBody.classList.remove("_active");
	}
	//=================
	//BodyLock
	function body_lock(delay) {
		let body = document.querySelector("body");
		if (body.classList.contains('_lock')) {
			body_lock_remove(delay);
		} else {
			body_lock_add(delay);
		}
	}
	function body_lock_remove(delay) {
		let body = document.querySelector("body");
		if (unlock) {
			let lock_padding = document.querySelectorAll("._lp");
			setTimeout(() => {
				for (let index = 0; index < lock_padding.length; index++) {
					const el = lock_padding[index];
					el.style.paddingRight = '0px';
				}
				body.style.paddingRight = '0px';
				body.classList.remove("_lock");
			}, delay);

			unlock = false;
			setTimeout(function () {
				unlock = true;
			}, delay);
		}
	}
	function body_lock_add(delay) {
		let body = document.querySelector("body");
		if (unlock) {
			let lock_padding = document.querySelectorAll("._lp");
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			}
			body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			body.classList.add("_lock");

			unlock = false;
			setTimeout(function () {
				unlock = true;
			}, delay);
		}
	}

	let tabs = document.querySelectorAll("._tabs");
	for (let index = 0; index < tabs.length; index++) {
		let tab = tabs[index];
		let tabs_items = tab.querySelectorAll("._tabs-item");
		let tabs_blocks = tab.querySelectorAll("._tabs-block");
		for (let index = 0; index < tabs_items.length; index++) {
			let tabs_item = tabs_items[index];
			tabs_item.addEventListener("click", function (e) {
				for (let index = 0; index < tabs_items.length; index++) {
					let tabs_item = tabs_items[index];
					tabs_item.classList.remove('_active');
					tabs_blocks[index].classList.remove('_active');
				}
				tabs_item.classList.add('_active');
				tabs_blocks[index].classList.add('_active');
				e.preventDefault();
			});
		}
	}

	let spollers = document.querySelectorAll("._spoller");
	let spollersGo = true;
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
			spoller.addEventListener("click", function (e) {
				if (spollersGo) {
					spollersGo = false;
					if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
						return false;
					}
					if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
						return false;
					}
					if (spoller.closest('._spollers').classList.contains('_one')) {
						let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
						for (let i = 0; i < curent_spollers.length; i++) {
							let el = curent_spollers[i];
							if (el != spoller) {
								el.classList.remove('_active');
								_slideUp(el.nextElementSibling);
							}
						}
					}
					spoller.classList.toggle('_active');
					_slideToggle(spoller.nextElementSibling);

					setTimeout(function () {
						spollersGo = true;
					}, 500);
				}
			});
		}
	}

	let _slideUp = (target, duration = 500) => {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	let _slideDown = (target, duration = 500) => {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;
		if (display === 'none')
			display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	let _slideToggle = (target, duration = 500) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (window.getComputedStyle(target).display === 'none') {
				return _slideDown(target, duration);
			} else {
				return _slideUp(target, duration);
			}
		}
	}

	let selects = document.getElementsByTagName('select');
	if (selects.length > 0) {
		selects_init();
	}
	function selects_init() {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_init(select);
		}
		//select_callback();
		document.addEventListener('click', function (e) {
			selects_close(e);
		});
		document.addEventListener('keydown', function (e) {
			if (e.code === 'Escape') {
				selects_close(e);
			}
		});
	}
	function selects_close(e) {
		const selects = document.querySelectorAll('.select');
		if (!e.target.closest('.select')) {
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_body_options = select.querySelector('.select__options');
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
	}
	function select_init(select) {
		const select_parent = select.parentElement;
		const select_modifikator = select.getAttribute('class');
		const select_selected_option = select.querySelector('option:checked');
		select.setAttribute('data-default', select_selected_option.value);
		select.style.display = 'none';

		select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

		let new_select = select.parentElement.querySelector('.select');
		new_select.appendChild(select);
		select_item(select);
	}
	function select_item(select) {
		const select_parent = select.parentElement;
		const select_items = select_parent.querySelector('.select__item');
		const select_options = select.querySelectorAll('option');
		const select_selected_option = select.querySelector('option:checked');
		const select_selected_text = select_selected_option.text;
		const select_type = select.getAttribute('data-type');

		if (select_items) {
			select_items.remove();
		}

		let select_type_content = '';
		if (select_type == 'input') {
			select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
		} else {
			select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
		}

		select_parent.insertAdjacentHTML('beforeend',
			'<div class="select__item">' +
			'<div class="select__title">' + select_type_content + '</div>' +
			'<div class="select__options">' + select_get_options(select_options) + '</div>' +
			'</div></div>');

		select_actions(select, select_parent);
	}
	function select_actions(original, select) {
		const select_item = select.querySelector('.select__item');
		const select_body_options = select.querySelector('.select__options');
		const select_options = select.querySelectorAll('.select__option');
		const select_type = original.getAttribute('data-type');
		const select_input = select.querySelector('.select__input');

		select_item.addEventListener('click', function () {
			let selects = document.querySelectorAll('.select');
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_body_options = select.querySelector('.select__options');
				if (select != select_item.closest('.select')) {
					select.classList.remove('_active');
					_slideUp(select_body_options, 100);
				}
			}
			_slideToggle(select_body_options, 100);
			select.classList.toggle('_active');
		});

		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.getAttribute('data-value');
			const select_option_text = select_option.innerHTML;

			if (select_type == 'input') {
				select_input.addEventListener('keyup', select_search);
			} else {
				if (select_option.getAttribute('data-value') == original.value) {
					select_option.style.display = 'none';
				}
			}
			select_option.addEventListener('click', function () {
				for (let index = 0; index < select_options.length; index++) {
					const el = select_options[index];
					el.style.display = 'block';
				}
				if (select_type == 'input') {
					select_input.value = select_option_text;
					original.value = select_option_value;
				} else {
					select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
					original.value = select_option_value;
					select_option.style.display = 'none';
				}
			});
		}
	}
	function select_get_options(select_options) {
		if (select_options) {
			let select_options_content = '';
			for (let index = 0; index < select_options.length; index++) {
				const select_option = select_options[index];
				const select_option_value = select_option.value;
				if (select_option_value != '') {
					const select_option_text = select_option.text;
					select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
				}
			}
			return select_options_content;
		}
	}
	function select_search(e) {
		let select_block = e.target.closest('.select ').querySelector('.select__options');
		let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
		let select_search_text = e.target.value.toUpperCase();

		for (let i = 0; i < select_options.length; i++) {
			let select_option = select_options[i];
			let select_txt_value = select_option.textContent || select_option.innerText;
			if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
				select_option.style.display = "";
			} else {
				select_option.style.display = "none";
			}
		}
	}
	function selects_update_all() {
		let selects = document.querySelectorAll('select');
		if (selects) {
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				select_item(select);
			}
		}
	}

	let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
	inputs_init(inputs);

	function inputs_init(inputs) {
		if (inputs.length > 0) {
			for (let index = 0; index < inputs.length; index++) {
				const input = inputs[index];
				const input_g_value = input.getAttribute('data-value');
				input_placeholder_add(input);
				if (input.value != '' && input.value != input_g_value) {
					input_focus_add(input);
				}
				input.addEventListener('focus', function (e) {
					if (input.value == input_g_value) {
						input_focus_add(input);
						input.value = '';
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'password');
					}
					if (input.classList.contains('_date')) {
						/*
						input.classList.add('_mask');
						Inputmask("99.99.9999", {
							//"placeholder": '',
							clearIncomplete: true,
							clearMaskOnLostFocus: true,
							onincomplete: function () {
								input_clear_mask(input, input_g_value);
							}
						}).mask(input);
						*/
					}
					if (input.classList.contains('_phone')) {
						//'+7(999) 999 9999'
						//'+38(999) 999 9999'
						//'+375(99)999-99-99'
						input.classList.add('_mask');
						Inputmask("+375 (99) 9999999", {
							//"placeholder": '',
							clearIncomplete: true,
							clearMaskOnLostFocus: true,
							onincomplete: function () {
								input_clear_mask(input, input_g_value);
							}
						}).mask(input);
					}
					if (input.classList.contains('_digital')) {
						input.classList.add('_mask');
						Inputmask("9{1,}", {
							"placeholder": '',
							clearIncomplete: true,
							clearMaskOnLostFocus: true,
							onincomplete: function () {
								input_clear_mask(input, input_g_value);
							}
						}).mask(input);
					}
					form_remove_error(input);
				});
				input.addEventListener('blur', function (e) {
					if (input.value == '') {
						input.value = input_g_value;
						input_focus_remove(input);
						if (input.classList.contains('_mask')) {
							input_clear_mask(input, input_g_value);
						}
						if (input.getAttribute('data-type') === "pass") {
							input.setAttribute('type', 'text');
						}
					}
				});
				if (input.classList.contains('_date')) {
					datepicker(input, {
						customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
						customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
						formatter: (input, date, instance) => {
							const value = date.toLocaleDateString()
							input.value = value
						},
						onSelect: function (input, instance, date) {
							input_focus_add(input.el);
						}
					});
				}
			}
		}
	}
	function input_placeholder_add(input) {
		const input_g_value = input.getAttribute('data-value');
		if (input.value == '' && input_g_value != '') {
			input.value = input_g_value;
		}
	}
	function input_focus_add(input) {
		input.classList.add('_focus');
		input.parentElement.classList.add('_focus');
	}
	function input_focus_remove(input) {
		input.classList.remove('_focus');
		input.parentElement.classList.remove('_focus');
	}
	function form_remove_error(input) {
		input.classList.remove('_error');
		input.parentElement.classList.remove('_error');

		let input_error = input.parentElement.querySelector('.form__error');
		if (input_error) {
			input.parentElement.removeChild(input_error);
		}
	}

	let sliders = document.querySelectorAll('._swiper');
	if (sliders) {
		for (let index = 0; index < sliders.length; index++) {
			let slider = sliders[index];
			if (!slider.classList.contains('swiper-bild')) {
				let slider_items = slider.children;
				if (slider_items) {
					for (let index = 0; index < slider_items.length; index++) {
						let el = slider_items[index];
						el.classList.add('swiper-slide');
					}
				}
				let slider_content = slider.innerHTML;
				let slider_wrapper = document.createElement('div');
				slider_wrapper.classList.add('swiper-wrapper');
				slider_wrapper.innerHTML = slider_content;
				slider.innerHTML = '';
				slider.appendChild(slider_wrapper);
				slider.classList.add('swiper-bild');

				if (slider.classList.contains('_swiper_scroll')) {
					let sliderScroll = document.createElement('div');
					sliderScroll.classList.add('swiper-scrollbar');
					slider.appendChild(sliderScroll);
				}
			}
			if (slider.classList.contains('_gallery')) {
				//slider.data('lightGallery').destroy(true);
			}
		}
		sliders_bild_callback();
	}

	function sliders_bild_callback(params) { }

	let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: true,
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}


	function sliders_bild_callback(params) { }

	let sliderSlider = new Swiper('.slider', {
		/*
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 800,
		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		//pagination: {
		//	el: '.slider-quality__pagging',
		//	clickable: true,
		//},
		// Arrows
		navigation: {
			nextEl: '.about__more .more__item_next',
			prevEl: '.about__more .more__item_prev',
		},
		/*
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: true,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1268: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
		},
		*/
		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
		// And if we need scrollbar
		//scrollbar: {
		//	el: '.swiper-scrollbar',
		//},
	});

	let unlock = true;

	function body_lock(delay) {
		let body = document.querySelector("body");
		if (body.classList.contains('_lock')) {
			body_lock_remove(delay);
		} else {
			body_lock_add(delay);
		}
	}
	function body_lock_remove(delay) {
		let body = document.querySelector("body");
		if (unlock) {
			let lock_padding = document.querySelectorAll("._lp");
			setTimeout(() => {
				for (let index = 0; index < lock_padding.length; index++) {
					const el = lock_padding[index];
					el.style.paddingRight = '0px';
				}
				body.style.paddingRight = '0px';
				body.classList.remove("_lock");
			}, delay);

			unlock = false;
			setTimeout(function () {
				unlock = true;
			}, delay);
		}
	}
	function body_lock_add(delay) {
		let body = document.querySelector("body");
		if (unlock) {
			let lock_padding = document.querySelectorAll("._lp");
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			}
			body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			body.classList.add("_lock");

			unlock = false;
			setTimeout(function () {
				unlock = true;
			}, delay);
		}
	}

	let popup_link = document.querySelectorAll('._popup-link');
	let popups = document.querySelectorAll('.popup');
	for (let index = 0; index < popup_link.length; index++) {
		const el = popup_link[index];
		el.addEventListener('click', function (e) {
			if (unlock) {
				let item = el.getAttribute('href').replace('#', '');
				let video = el.getAttribute('data-video');
				popup_open(item, video);
			}
			e.preventDefault();
		})
	}
	for (let index = 0; index < popups.length; index++) {
		const popup = popups[index];
		popup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__body')) {
				popup_close(e.target.closest('.popup'));
			}
		});
	}
	function popup_open(item, video = '') {
		let activePopup = document.querySelectorAll('.popup._active');
		if (activePopup.length > 0) {
			popup_close('', false);
		}
		let curent_popup = document.querySelector('.popup_' + item);
		if (curent_popup && unlock) {
			if (video != '' && video != null) {
				let popup_video = document.querySelector('.popup_video');
				popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
			}
			if (!document.querySelector('.menu__body._active')) {
				body_lock_add(500);
			}
			curent_popup.classList.add('_active');
			history.pushState('', '', '#' + item);
		}
	}
	function popup_close(item, bodyUnlock = true) {
		if (unlock) {
			if (!item) {
				for (let index = 0; index < popups.length; index++) {
					const popup = popups[index];
					let video = popup.querySelector('.popup__video');
					if (video) {
						video.innerHTML = '';
					}
					popup.classList.remove('_active');
				}
			} else {
				let video = item.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				item.classList.remove('_active');
			}
			if (!document.querySelector('.menu__body._active') && bodyUnlock) {
				body_lock_remove(500);
			}
			history.pushState('', '', window.location.href.split('#')[0]);
		}
	}
	let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
	if (popup_close_icon) {
		for (let index = 0; index < popup_close_icon.length; index++) {
			const el = popup_close_icon[index];
			el.addEventListener('click', function () {
				popup_close(el.closest('.popup'));
			})
		}
	}
	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape') {
			popup_close();
		}
	});

	const priceSlider = document.querySelector('.price__range');
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [0, 200000],
			connect: true,
			tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
			range: {
				'min': [0],
				'max': [200000]
			}
		});

		const priceStart = document.getElementById('price-start');
		const priceEnd = document.getElementById('price-end');
		priceStart.addEventListener('change', setPriceValues);
		priceEnd.addEventListener('change', setPriceValues);

		function setPriceValues() {
			let priceStartValue;
			let priceEndValue;
			if (priceStart.value != '') {
				priceStartValue = priceStart.value;
			}
			if (priceEnd.value != '') {
				priceEndValue = priceEnd.value;
			}
			priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
		}
	}

	let quantityButtons = document.querySelectorAll('.quantity__button');
	if (quantityButtons.length > 0) {
		for (let index = 0; index < quantityButtons.length; index++) {
			const quantityButton = quantityButtons[index];
			quantityButton.addEventListener("click", function (e) {
				let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
				if (quantityButton.classList.contains('quantity__button_plus')) {
					value++;
				} else {
					value = value - 1;
					if (value < 1) {
						value = 1
					}
				}
				quantityButton.closest('.quantity').querySelector('input').value = value;
			});
		}
	}
}