let step = 15;

$(function () {
	$('.item-create__time-input').mask('99:99') // jquery maskedinput lib
})

$('.item-create__input-next').on('click', function () {
	let input = $(this).parent().children('.item-create__time-input');
	let inputValue = input.val();

	let hours = inputValue.substring(0, 2);
	let minutes = inputValue.substring(3, 5);

	if ((60 - minutes) <= step) {
		hours = Number(hours) + 1;
		minutes = (Number(minutes) + step) - 60;
	}
	else {
		minutes = Number(minutes) + step;
	}

	if (String(hours).length === 1) {
		hours = '0' + String(hours)
	}

	if (String(minutes).length === 1) {
		minutes = '0' + String(minutes)
	}

	if (Number(hours) >= 24) {
		hours = '00'
	}

	input.val(`${hours}:${minutes}`);
})

$('.item-create__input-prev').on('click', function () {
	let input = $(this).parent().children('.item-create__time-input');
	let inputValue = input.val();

	let hours = inputValue.substring(0, 2);
	let minutes = inputValue.substring(3, 5);

	if (minutes < step) {
		if (Number(hours) === 0) {
			hours = 23;
		}
		else {
			hours = Number(hours) - 1;
		}

		minutes = (Number(minutes) - step) + 60;
	}
	else {
		minutes = Number(minutes) - step;
	}

	if (String(hours).length === 1) {
		hours = '0' + String(hours)
	}

	if (String(minutes).length === 1) {
		minutes = '0' + String(minutes)
	}

	input.val(`${hours}:${minutes}`);
})