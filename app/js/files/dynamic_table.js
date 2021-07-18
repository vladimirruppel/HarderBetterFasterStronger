function dynamicTable() {
	let columnData = [ // данные о колонках
		{
			employee: "Петр Иванович",
			tipsAmount: "1010,00 руб.",
			rating: "5,0",
			reviewsCount: "225",
			positiveReviewsCount: 35,
			negativeReviewsCount: 251,
			tipsAverageAmount: "157,10 руб."
		},
		{
			employee: "Дмитрий Иванович",
			tipsAmount: "11000,00 руб.",
			rating: "3,2",
			reviewsCount: "502",
			positiveReviewsCount: 789,
			negativeReviewsCount: 1,
			tipsAverageAmount: "157,00 руб."
		},
		{
			employee: "Владимир Иванович",
			tipsAmount: "1000,54 руб.",
			rating: "3,0",
			reviewsCount: "225",
			positiveReviewsCount: 110,
			negativeReviewsCount: 53,
			tipsAverageAmount: "160,00 руб."
		},
		{
			employee: "Сергей Иванович",
			tipsAmount: "1000,00 руб.",
			rating: "4,0",
			reviewsCount: "752",
			positiveReviewsCount: 79,
			negativeReviewsCount: 220,
			tipsAverageAmount: "159,00 руб."
		},
		{
			employee: "Владимир Иванович",
			tipsAmount: "1000,54 руб.",
			rating: "3,0",
			reviewsCount: "225",
			positiveReviewsCount: 110,
			negativeReviewsCount: 53,
			tipsAverageAmount: "160,00 руб."
		},
		{
			employee: "Сергей Иванович",
			tipsAmount: "1000,00 руб.",
			rating: "4,0",
			reviewsCount: "752",
			positiveReviewsCount: 79,
			negativeReviewsCount: 220,
			tipsAverageAmount: "159,00 руб."
		},
	];

	buildTable(columnData);

	// th.yes - колонки, нуждающиеся в фильтрации
	$('th.yes').on('click', function () {
		let order = $(this).attr('data-order'); // обязательный атрибут для добавления
		let column = $(this).attr('data-column'); // обязательный атрибут для добавления

		switch (order) {
			case "none": {
				$(this).parent().children().each(function () {
					$(this).attr('data-order', 'none');
				})
				$(this).attr('data-order', "desc");
				columnData = columnData.sort((a, b) => a[column] < b[column] ? 1 : -1)
				break;
			}
			case "desc": {
				$(this).parent().children().each(function () {
					$(this).attr('data-order', 'none');
				})
				$(this).attr('data-order', "asc");
				columnData = columnData.sort((a, b) => a[column] > b[column] ? 1 : -1)
				break;
			}
			case "asc": {
				$(this).parent().children().each(function () {
					$(this).attr('data-order', 'none');
				})
				$(this).attr('data-order', "desc");
				columnData = columnData.sort((a, b) => a[column] < b[column] ? 1 : -1)
				break;
			}
		}

		buildTable(columnData);
	})

	function buildTable(data) {
		let table = document.getElementById('tableBody');
		if (table != null)
			table.innerHTML = '';
		for (let i = 0; i < data.length; i++) {
			let row = // кастомизировать в зависимости от таблицы
				`<tr>
				<td class="column-settings">
					<div class="column-settings__manage"><img src="images/dist/manage-icon.svg"></div>
					<div class="column-settings__menu">
						<button class="column-settings__watch-button">Просмотр</button>
						<button class="column-settings__fire-button">Уволить</button>
					</div>
				</td>
				<td>${data[i].employee}</td>
				<td>${data[i].tipsAmount}</td>
				<td>${data[i].rating}</td>
				<td>${data[i].reviewsCount}</td>
				<td>${data[i].positiveReviewsCount}</td>
				<td>${data[i].negativeReviewsCount}</td>
				<td>${data[i].tipsAverageAmount}</td>
			</tr>`

			if (table != null)
				table.innerHTML += row;
		}
	}
}