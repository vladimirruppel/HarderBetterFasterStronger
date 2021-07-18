function validation() {
	document.forms.register.noValidate = true; // Отключаем HTML5-валидацию
	// -------------------------------------------------------------------------
	// A. АНОНИМНАЯ ФУНКЦИЯ, ЗАПУСКАЕМАЯ СОБЫТИЕМ SUBMIT 
	// -------------------------------------------------------------------------
	$('.form').on('submit', function (e) {      // При отправке формы
		var elements = this.elements;            // Коллекция элементов формы
		var valid = {};                          // Объект valid
		var isValid;                             // isValid: проверяет элементы формы
		var isFormValid;                         // isFormValid: проверяет всю форму

		// УНИВЕРСАЛЬНЫЕ ПРОВЕРКИ (вызывает функцию за пределами обработчика событий)
		var i;
		for (i = 0, l = elements.length; i < l; i++) {
			// Вызываются validateRequired() и validateTypes()
			isValid = validateRequired(elements[i]) && validateTypes(elements[i]);
			if (!isValid) {                    // Если не пройдены обе проверки
				showErrorMessage(elements[i]);   // Выводим сообщения об ошибках
			} else {                           // В противном случае
				removeErrorMessage(elements[i]); // Удаляем сообщения об ошибках
			}                                  // Конец инструкции if
			valid[elements[i].id] = isValid;   // Добавляем элемент в объект valid
		}                                    // Конец цикла

		// ИНДИВИДУАЛЬНАЯ ВАЛИДАЦИЯ
		if (!validateBio()) {                // Вызываем validateBio(), если некорректное
			showErrorMessage(document.getElementById('bio')); // Выводим сообщение об ошибке
			valid.bio = false;                 // Обновляем объект valid - элемент некорректен
		} else {                             // В противном случае
			removeErrorMessage(document.getElementById('bio')); // Удаляем ошибку
		}

		// пароль (здесь вы можете кэшировать пароль в переменной)
		if (!validatePassword()) {          // Вызываем validatePassword(), и если ввод ошибочен,
			showErrorMessage(document.getElementById('password')); // отображаем сообщение об ошибке
			valid.password = false;           // Обновляем объект valid - данный элемент ошибочен
		} else {                            // В противном случае удаляем сообщение об ошибке
			removeErrorMessage(document.getElementById('password'));
		}

		// родительское согласие (здесь вы можете кэшировать родительское согласие в переменной)
		if (!validateParentsConsent()) {     // Вызываем validateParentalConsent(), и если ввод ошибочен,
			showErrorMessage(document.getElementById('parents-consent')); // отображаем сообщение об ошибке
			valid.parentsConsent = false;      // Обновляем объект valid - это ошибка
		} else {                             // В противном случае удаляем сообщение об ошибке
			removeErrorMessage(document.getElementById('parents-consent'));
		}

		// ПРОЙДЕНА ЛИ ПРОВЕРКА / МОЖНО ЛИ ОТПРАВЛЯТЬ ФОРМУ?
		// Перебираем объект valid, при обнаружении ошибок присваиваем isFormValid значение false
		for (var field in valid) {          // Проверяем свойства объекта valid
			if (!valid[field]) {              // Если свойство некорректное
				isFormValid = false;            // Присваиваем false переменной isFormValid
				break;                          // Останавливаем цикл, найдена ошибка
			}                                 // В противном случае
			isFormValid = true;               // Форма корректна и готова к отправке
		}


		// Если форма не прошла проверку, отменяем ее отправку
		if (!isFormValid) {                 // Если переменная isFormValid не равна true
			e.preventDefault();               // Предотвращаем отправку формы
		}

	});                                   // Конец обработчика событий
	//  КОНЕЦ: анонимная функция вызывается кнопкой отправки формы


	// -------------------------------------------------------------------------
	// Б. ИНИЦИАЦИЯ ОБЩИХ ПРОВЕРОК
	// -------------------------------------------------------------------------

	// ПРОВЕРКА, ОБЯЗАТЕЛЬНО ЛИ ПОЛЕ К ЗАПОЛНЕНИЮ, И СОДЕРЖИТ ЛИ ОНО ЗНАЧЕНИЕ
	// Зависит от isRequired() и isEmpty(), как показано ниже, и setErrorMessage - показано далее.
	function validateRequired(el) {
		if (isRequired(el)) {                           // Является ли этот элемент обязательным?
			var valid = !isEmpty(el);                     // Есть ли значение(true / false)?
			if (!valid) {                                 // Если переменная valid равна false
				setErrorMessage(el, 'Поле необходимо заполнить');  // Выводим сообщение об ошибке
			}
			return valid;                                 // Возвращаем переменную valid (true / false)
		}
		return true;                                    // Если поле необязательное, все в порядке
	}

	// ПРОВЕРКА, ОБЯЗАТЕЛЕН ЛИ ЭЛЕМЕНТ
	// Вызывается функцией validateRequired()
	function isRequired(el) {
		return ((typeof el.required === 'boolean') && el.required) ||
			(typeof el.required === 'string');
	}

	// ПРОВЕРКА, ПУСТ ЛИ ЭЛЕМЕНТ (или значение идентично тексту заполнителя)
	// Браузеры с поддержкой HTML5 допускают ввод значения, идентичного тексту заполнителя, но в этом случае, это не следует делать
	// Вызывается функцией validateRequired()
	function isEmpty(el) {
		return !el.value || el.value === el.placeholder;
	}

	// ПРОВЕРКА, СООТВЕТСТВКЕТ ЛИ ВВЕДЕННОЕ ЗНАЧЕНИЕ ТИПУ ЭЛЕМЕНТА
	// Зависит от объекта validateType (показано в конце IIFE-функции)
	function validateTypes(el) {
		if (!el.value) return true;                     // Если у элемента нет значения, возвращаем true
		// Если оно есть, получаем его с помощью .data()
		var type = $(el).data('type') || el.getAttribute('type');  // Или получаем тип поля ввода
		if (typeof validateType[type] === 'function') { // Является ли тип методом объекта валидации?
			return validateType[type](el);                // Если да, смотрим, можно ли его валидировать
		} else {                                        // Если нет,
			return true;                                  // Возвращаем true, потому что его нельзя проверить
		}
	}

	// -------------------------------------------------------------------------
	// В. ВЫПОЛНЕНИЕ ОБЩИХ ПРОВЕРОК 
	// -------------------------------------------------------------------------

	
	function validateParentsConsent() {
		var parentsConsent = document.getElementById('parents-consent');
		var consentContainer = document.getElementById('consent-container');
		var valid = true;                          // Переменной valid присваивается true
		if (consentContainer.className.indexOf('hide') === -1) { // Если флажок видим
			valid = parentsConsent.checked;          // Обновляем valid: флажок установлен или нет
			if (!valid) {                            // Если нет, устанавливаем сообщение об ошибке
				setErrorMessage(parentsConsent, 'Требуется согласие родителей');
			}
		}
		return valid;                               // Указываем на то, прошел ли элемент проверку
	}

	// Проверка, что объем текста биографии не превышает 140 символов
	function validateBio() {
		var bio = document.getElementById('bio');  // Сохраняем ссылку на поле bio
		var valid = bio.value.length <= 140;       // bio <= 140?
		if (!valid) { 							   // Если нет, устанавливаем сообщение об ошибке
			setErrorMessage(bio, 'Объем текста превышает 140 символов');
		}
		return valid;							   // Возвращаем значение типа Boolean
	}

	// Проверка, что значения паролей в обоих полях идентичны и содержат не менее 8 символов
	function validatePassword() {
		var password = document.getElementById('password'); // Сохраняем ссылку на элемент
		var valid = password.value.length >= 8;				// Если его значение >= 8 символам
		if (!valid) {										// Если нет, устанавливаем сообщение об ошибке
			setErrorMessage(password, 'Пароль должен состоять из не менее 8 символов');
		}
		return valid;										// Возвращаем true / false
	}



	// -------------------------------------------------------------------------
	// Г. ФУНКЦИИ ДЛЯ ПОЛУЧЕНИЯ / УСТАНОВКИ / ОТОБРАЖЕНИЯ / УДАЛЕНИЯ СООБЩЕНИЙ ОБ ОШИБКАХ
	// -------------------------------------------------------------------------

	function setErrorMessage(el, message) {
		$(el).data('errorMessage', message);                 // Сохраняем сообщение об ошибке внутри элемента
	}

	function getErrorMessage(el) {
		return $(el).data('errorMessage') || el.title;       // Получаем сообщение об ошибке или заголовок элемента
	}

	function showErrorMessage(el) {
		var $el = $(el);                                     // Находим элемент с ошибкой
		var errorContainer = $el.siblings('.error.message'); // Есть ли в нем другие ошибки?

		if (!errorContainer.length) {                         // Если ошибок не найдено
			// Создаем элемент span для хранения сообщения и добавляем его после поля с ошибкой
			errorContainer = $('<span class="error message"></span>').insertAfter($el);
		}
		errorContainer.text(getErrorMessage(el));             // Добавляем сообщение об ошибке
	}

	function removeErrorMessage(el) {
		var errorContainer = $(el).siblings('.error.message'); // Получаем родственные элементы формы, используемые для хранения сообщения об ошибке
		errorContainer.remove();                               // Удаляем элемент, содержащий сообщение об ошибке
	}



	// -------------------------------------------------------------------------
	// Д. ОБЪЕКТ, ПРОВЕРЯЮЩИЙ ТИП ДАННЫХ 
	// -------------------------------------------------------------------------

	// Проверка правильности введенных данных или, в противном случае,  отображение сообщения об ошибке
	// Возвращает true если все верно, в противном случае - возвращает false
	var validateType = {
		email: function (el) {                                 // Создаем метод email
			var valid = /[^@]+@[^@]+/.test(el.value);            // Сохраняем результат проверки в valid
			if (!valid) {                                        // Если valid не равна true
				setErrorMessage(el, 'Проверьте правильность адреса'); // Устанавливаем сообщение об ошибке
			}
			return valid;                                        // Возвращаем переменную valid
		},
		number: function (el) {                                // Создаем метод number()
			var valid = /^\d+$/.test(el.value);                  // Сохраняем результат проверки в valid
			if (!valid) {
				setErrorMessage(el, 'Введите допустимый номер');
			}
			return valid;
		},
		date: function (el) {                                  // Создаем метод date()
			// Сохраняем результат проверки в valid
			var valid = /^(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(el.value);
			if (!valid) {                                        // Если valid не равна true
				setErrorMessage(el, 'Введите допустимую дату');  // Устанавливаем сообщение об ошибке
			}
			return valid;                                        // Возвращаем переменную valid
		}
	};

};