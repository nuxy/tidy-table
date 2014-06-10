test('Sort Column A', function() {
	var col = 'th[title="Column A"]';

	ok($(table).find(col).trigger('click'), "Click event 'descending'");

	ok($(table).find(col).hasClass('sort_desc'), "<th> contains required class 'sort_desc'");

	equal($(table).find('tr:nth-child(1) > td:nth-child(2)').text(), 'Row 3A', "First column expected is 'Row 3A'");

	ok($(table).find(col).trigger('click'), "Click event 'ascending'");
	
	ok($(table).find(col).hasClass('sort_asc'), "<th> contains required class 'sort_asc'");

	equal($(table).find('tr:nth-child(1) > td:nth-child(2)').text(), 'Row 1A', "First column expected is 'Row 1A'");
});

test('Sort Column B', function() {
	var col = 'th[title="Column B"]';

	ok($(table).find(col).trigger('click'), "Click event 'descending'");

	ok($(table).find(col).hasClass('sort_desc'), "<th> contains required class 'sort_desc'");

	equal($(table).find('tr:nth-child(1) > td:nth-child(3)').text(), 'Row 3B', "First column expected is 'Row 3B'");

	ok($(table).find(col).trigger('click'), "Click event 'ascending'");

	ok($(table).find(col).hasClass('sort_asc'), "<th> contains required class 'sort_asc'");

	equal($(table).find('tr:nth-child(1) > td:nth-child(3)').text(), 'Row 1B', "First column expected is 'Row 1B'");
});

test('Sort Column C', function() {
	var col = 'th[title="Column C"]';

	ok($(table).find(col).trigger('click'), "Click event 'descending'");

	ok($(table).find(col).hasClass('sort_desc'), "<th> contains required class 'sort_desc'");

	equal($(table).find('tr:nth-child(1) > td:nth-child(4)').text(), 'Row 3C', "First column expected is 'Row 3C'");

	ok($(table).find(col).trigger('click'), "Click event 'ascending'");

	ok($(table).find(col).hasClass('sort_asc'), "<th> contains required class 'sort_asc'");

	equal($(table).find('tr:nth-child(1) > td:nth-child(4)').text(), 'Row 1C', "First column expected is 'Row 1C'");
});
