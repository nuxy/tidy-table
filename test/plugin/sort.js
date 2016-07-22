test('Sort Column A', function() {
  var col = 'th[title="Column A"]';

  var click = new Event('click');

  ok(document.querySelector(table).querySelector(col).dispatchEvent(click), "Click event 'descending'");

  ok(document.querySelector(table).querySelector(col).classList.contains('sort_desc'), "<th> contains required class 'sort_desc'");

  equal(document.querySelector(table).querySelector('tr:nth-child(1) > td:nth-child(2)').textContent, 'Row 4A', "1st column expected is 'Row 4A'");
  equal(document.querySelector(table).querySelector('tr:nth-child(2) > td:nth-child(2)').textContent, 'Row 3A', "2nd column expected is 'Row 3A'");
  equal(document.querySelector(table).querySelector('tr:nth-child(3) > td:nth-child(2)').textContent, 'Row 2A', "3rd column expected is 'Row 2A'");
  equal(document.querySelector(table).querySelector('tr:nth-child(4) > td:nth-child(2)').textContent, 'Row 1A', "4th column expected is 'Row 1A'");

  ok(document.querySelector(table).querySelector(col).dispatchEvent(click), "Click event 'ascending'");

  ok(document.querySelector(table).querySelector(col).classList.contains('sort_asc'), "<th> contains required class 'sort_asc'");

  equal(document.querySelector(table).querySelector('tr:nth-child(1) > td:nth-child(2)').textContent, 'Row 1A', "1st column expected is 'Row 1A'");
  equal(document.querySelector(table).querySelector('tr:nth-child(2) > td:nth-child(2)').textContent, 'Row 2A', "2nd column expected is 'Row 2A'");
  equal(document.querySelector(table).querySelector('tr:nth-child(3) > td:nth-child(2)').textContent, 'Row 3A', "3rd column expected is 'Row 3A'");
  equal(document.querySelector(table).querySelector('tr:nth-child(4) > td:nth-child(2)').textContent, 'Row 4A', "4th column expected is 'Row 4A'");
});

test('Sort Column B', function() {
  var col = 'th[title="Column B"]';

  var click = new Event('click');

  ok(document.querySelector(table).querySelector(col).dispatchEvent(click), "Click event 'descending'");

  ok(document.querySelector(table).querySelector(col).classList.contains('sort_desc'), "<th> contains required class 'sort_desc'");

  equal(document.querySelector(table).querySelector('tr:nth-child(1) > td:nth-child(3)').textContent, 'Row 4B', "1st column expected is 'Row 4B'");
  equal(document.querySelector(table).querySelector('tr:nth-child(2) > td:nth-child(3)').textContent, 'Row 3B', "2nd column expected is 'Row 3B'");
  equal(document.querySelector(table).querySelector('tr:nth-child(3) > td:nth-child(3)').textContent, 'Row 2B', "3rd column expected is 'Row 2B'");
  equal(document.querySelector(table).querySelector('tr:nth-child(4) > td:nth-child(3)').textContent, 'Row 1B', "4th column expected is 'Row 1B'");

  ok(document.querySelector(table).querySelector(col).dispatchEvent(click), "Click event 'ascending'");

  ok(document.querySelector(table).querySelector(col).classList.contains('sort_asc'), "<th> contains required class 'sort_asc'");

  equal(document.querySelector(table).querySelector('tr:nth-child(1) > td:nth-child(3)').textContent, 'Row 1B', "1st column expected is 'Row 1B'");
  equal(document.querySelector(table).querySelector('tr:nth-child(2) > td:nth-child(3)').textContent, 'Row 2B', "2nd column expected is 'Row 2B'");
  equal(document.querySelector(table).querySelector('tr:nth-child(3) > td:nth-child(3)').textContent, 'Row 3B', "3rd column expected is 'Row 3B'");
  equal(document.querySelector(table).querySelector('tr:nth-child(4) > td:nth-child(3)').textContent, 'Row 4B', "4th column expected is 'Row 4B'");
});

test('Sort Column C', function() {
  var col = 'th[title="Column C"]';

  var click = new Event('click');

  ok(document.querySelector(table).querySelector(col).dispatchEvent(click), "Click event 'descending'");

  ok(document.querySelector(table).querySelector(col).classList.contains('sort_desc'), "<th> contains required class 'sort_desc'");

  equal(document.querySelector(table).querySelector('tr:nth-child(1) > td:nth-child(4)').textContent, 'Row 4C', "1st column expected is 'Row 4C'");
  equal(document.querySelector(table).querySelector('tr:nth-child(2) > td:nth-child(4)').textContent, 'Row 3C', "2nd column expected is 'Row 3C'");
  equal(document.querySelector(table).querySelector('tr:nth-child(3) > td:nth-child(4)').textContent, 'Row 2C', "3rd column expected is 'Row 2C'");
  equal(document.querySelector(table).querySelector('tr:nth-child(4) > td:nth-child(4)').textContent, 'Row 1C', "4th column expected is 'Row 1C'");

  ok(document.querySelector(table).querySelector(col).dispatchEvent(click), "Click event 'ascending'");

  ok(document.querySelector(table).querySelector(col).classList.contains('sort_asc'), "<th> contains required class 'sort_asc'");

  equal(document.querySelector(table).querySelector('tr:nth-child(1) > td:nth-child(4)').textContent, 'Row 1C', "1st column expected is 'Row 1C'");
  equal(document.querySelector(table).querySelector('tr:nth-child(2) > td:nth-child(4)').textContent, 'Row 2C', "2nd column expected is 'Row 2C'");
  equal(document.querySelector(table).querySelector('tr:nth-child(3) > td:nth-child(4)').textContent, 'Row 3C', "3rd column expected is 'Row 3C'");
  equal(document.querySelector(table).querySelector('tr:nth-child(4) > td:nth-child(4)').textContent, 'Row 4C', "4th column expected is 'Row 4C'");
});
