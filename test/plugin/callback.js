test('Global Checkbox', function() {
	var checkbox = $(table).find('thead th :checkbox');

	ok(checkbox.prop('checked', true), 'Select all rows checkbox checked');

	ok(checkbox.trigger('click'), 'Trigger checkbox event');

	$(table).find('tbody tr').each(function(index) {
		var row = $(this);

		ok(row.find(':checkbox').is(':checked'), 'Row ' + index + ' checkbox is checked');

		ok(row.hasClass('check_on'), "<tr> contains required class 'check_on'");
	});

	ok(checkbox.prop('checked', false), 'Deselect all rows checkbox checked');

	ok(checkbox.trigger('click'), 'Trigger checkbox event');

	$(table).find('tbody tr').each(function(index) {
		var row = $(this);

		ok(row.find(':checkbox').not(':checked'), 'Row ' + index + ' checkbox is unchecked');

		ok(row.hasClass('check_off'), "<tr> contains required class 'check_off'");
	});
});

test('Single Checkbox', function() {
	$(table).find('tbody tr').each(function(index) {
		var row = $(this);

		var checkbox = row.find(':checkbox');

		ok(checkbox.prop('checked', true), 'Row ' + index + ' checkbox checked');

		ok(checkbox.trigger('click'), 'Trigger checkbox event');

		ok(row.hasClass('check_on'), "<tr> contains required class 'check_on'");
	});

	$(table).find('tbody tr').each(function(index) {
		var row = $(this);

		var checkbox = row.find(':checkbox');

		ok(checkbox.prop('checked', false), 'Row ' + index + ' checkbox unchecked');

		ok(checkbox.trigger('click'), 'Trigger checkbox event');

		ok(row.hasClass('check_off'), "<tr> contains required class 'check_off'");
	});
});
