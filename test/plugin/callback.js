test('Global Checkbox', function() {
  var checkbox = document.querySelector(table).querySelector('thead th input[type=checkbox]');

  checkbox.checked = true;

  ok('Select all rows checkbox checked');

  var click = new Event('click');

  ok(checkbox.dispatchEvent(click), 'Trigger checkbox click event');

  var rows = document.querySelector(table).querySelector('tbody tr');

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];

    ok(row.querySelector('input[type=checkbox]').checked === true, 'Row ' + i + ' checkbox is checked');

    ok(row.classList.contains('check_on'), "<tr> contains required class 'check_on'");
  }

  checkbox.checked = false;

  ok('Deselect all rows checkbox checked');

  ok(checkbox.dispatchEvent(click), 'Trigger checkbox event');

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];

    ok(row.querySelector('input[type=checkbox]').checked === false, 'Row ' + i + ' checkbox is unchecked');

    ok(row.classList.contains('check_off'), "<tr> contains required class 'check_off'");
  }
});

test('Single Checkbox', function() {
  var rows = document.querySelector(table).querySelectorAll('tbody tr');

  var click = new Event('click');

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];

    var checkbox = row.querySelector('input[type=checkbox]');

    checkbox.checked = true;

    ok('Row ' + i + ' checkbox checked');

    ok(checkbox.dispatchEvent(click), 'Trigger checkbox click event');

    ok(row.classList.contains('check_on'), "<tr> contains required class 'check_on'");
  }

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];

    var checkbox = row.querySelector('input[type=checkbox]');

    checkbox.checked = false

    ok('Row ' + i + ' checkbox unchecked');

    ok(checkbox.dispatchEvent(click), 'Trigger checkbox click event');

    ok(row.classList.contains('check_off'), "<tr> contains required class 'check_off'");
  }
});

test('Select Menu', function() {
  var menu = document.querySelector('select.options');

  next['event1'] = true;

  menu.value = 1;

  ok("Change menu 'Callback 1' option with no rows selected");

  var change = new Event('change'),
      click  = new Event('click');

  ok(menu.dispatchEvent(change), 'Trigger menu change event');

  equal(window.alert.message, 'callback1(rows=0)', "Window alert message expected is 'callback1(rows=0)'");

  var count1 = 0;

  var rows = document.querySelector(table).querySelector('tbody tr');

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i],
        sel = Math.random() >= 0.5;

    if (sel) {
      var checkbox = row.querySelector('input[type=checkbox]');

      checkbox.checked = true;

      ok('Row ' + i + ' checkbox checked');

      ok(checkbox.dispatchEvent(click), 'Trigger checkbox click event');

      ok(row.classList.contains('check_on'), "<tr> contains required class 'check_on'");

      count1++;
    }
  }

  menu.value = 1;

  ok("Change menu 'Callback 1' option with " + count1 + " rows selected");

  var result1 = 'callback1(rows=' + count1 + ')';

  equal(window.alert.message, result1, "Window alert message expected is '" + result1 + "'");

  next['event1'] = false;

  var rows = document.querySelector(table).querySelector('tbody tr');

  for (var i = 0; i < rows.length; i++) {
    rows[i].querySelector('input[type=checkbox]').checked = false;
  }

  next['event2'] = true;

  menu.value = 2;

  ok("Change menu 'Callback 2' option with no rows selected");

  ok(menu.dispatchEvent(change), 'Trigger menu change event');

  equal(window.alert.message, 'callback2(rows=0)', "Window alert message expected is 'callback2(rows=0)'");

  var count2 = 0;

  var rows = document.querySelector(table).querySelector('tbody tr');

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i],
        sel = Math.random() >= 0.5;

    if (sel) {
      var checkbox = row.querySelector('input[type=checkbox]');

      checkbox.checked = true;

      ok('Row ' + i + ' checkbox checked');

      ok(checkbox.dispatchEvent(click), 'Trigger checkbox click event');

      checkbox.checked = true;

      ok(row.classList.contains('check_on'), "<tr> contains required class 'check_on'");

      count2++;
    }
  }

  menu.value = 2;

  ok("Change menu 'Callback 2' option with " + count2 + " rows selected");

  var result2 = 'callback2(rows=' + count2 + ')';

  ok(menu.dispatchEvent(change), 'Trigger menu change event');

  equal(window.alert.message, result2, "Window alert message expected is '" + result2 + "'");

  next['event2'] = false;

  var rows = document.querySelector(table).querySelector('tbody tr');

  for (var i = 0; i < rows.length; i++) {
    rows[i].querySelector('input[type=checkbox]').checked = false;
  }
});

test('Select Menu Sort', function() {
  var menu = document.querySelector('select.options');

  next['event1'] = true;

  menu.value = 1;

  ok("Change menu 'Callback 1' option with no rows selected");

  var change = new Event('change'),
      click  = new Event('click');

  ok(menu.dispatchEvent(change), 'Trigger menu change event');

  equal(window.alert.message, 'callback1(rows=0)', "Window alert message expected is 'callback1(rows=0)'");

  var count1 = 0;

  var rows = document.querySelector(table).querySelector('tbody tr');

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i],
        sel = Math.random() >= 0.5;

    if (sel) {
      var checkbox = row.querySelector('input[type=checkbox]');

      checkbox.checked = true;

      ok('Row ' + i + ' checkbox checked');

      ok(checkbox.dispatchEvent(click), 'Trigger checkbox click event');

      checkbox.checked = true;

      ok(row.classList.contains('check_on'), "<tr> contains required class 'check_on'");

      count1++;
    }
  }

  menu.value = 1;   /// NUXY

  ok("Change menu 'Callback 1' option with " + count1 + " rows selected");

  var result1 = 'callback1(rows=' + count1 + ')';

  ok(menu.dispatchEvent(change), 'Trigger menu change event');

  var title = document.querySelector(table).querySelector('th[title="Column A"]');

  ok(title.dispatchEvent(click), "Click sort event 'descending'");

  menu.value = 1;

  ok("Change menu 'Callback 1' option with no rows selected");

  var result2 = 'callback1(rows=0)';

  ok(menu.dispatchEvent(change), 'Trigger menu change event');

  next['event1'] = false;

  var rows = document.querySelector(table).querySelector('tbody tr');

  for (var i = 0; i < rows.length; i++) {
    rows[i].querySelector('input[type=checkbox]').checked = false;
  }

  next['event2'] = true;

  menu.value = 2;

  ok("Change menu 'Callback 2' option with no rows selected");

  ok(menu.dispatchEvent(change), 'Trigger menu change event');

  equal(window.alert.message, 'callback2(rows=0)', "Window alert message expected is 'callback2(rows=0)'");

  var count2 = 0;

  var rows = document.querySelector(table).querySelector('tbody tr');

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i],
        sel = Math.random() >= 0.5;

    if (sel) {
      var checkbox = row.querySelector('input[type=checkbox]');

      checkbox.checked = true;

      ok('Row ' + i + ' checkbox checked');

      ok(checkbox.dispatchEvent(click), 'Trigger checkbox click event');

      ok(row.classList.contains('check_on'), "<tr> contains required class 'check_on'");

      count2++;
    }
  }

  menu.value = 2;

  ok("Change menu 'Callback 2' option with " + count2 + " rows selected");

  var result3 = 'callback2(rows=' + count2 + ')';

  ok(menu.dispatchEvent(change), 'Trigger menu change event');

  equal(window.alert.message, result3, "Window alert message expected is '" + result3 + "'");

  var title = document.querySelector(table).querySelector('th[title="Column A"]');

  ok(title.dispatchEvent(click), "Click sort event 'ascending'");

  menu.value = 2;

  ok("Change menu 'Callback 2' option with no rows selected");

  var result4 = 'callback2(rows=0)';

  ok(menu.dispatchEvent(change), 'Trigger menu change event');

  equal(window.alert.message, result4, "Window alert message expected is '" + result4 + "'");

  next['event2'] = false;

  var rows = document.querySelector(table).querySelector('tbody tr');

  for (var i = 0; i < rows.length; i++) {
    rows[i].querySelector('input[type=checkbox]').checked = false;
  }
});

test('Post-processing', function() {
  next['event3'] = true;

  var change = new Event('change'),
      click  = new Event('click'),
      hover  = new Event('hover');

  ok(document.querySelector(table).dispatchEvent(hover), 'Trigger table hover event');

  var result3 = 'post-process(table)';

  equal(window.alert.message, result3, "Window alert message expected is '" + result3 + "'");

  next['event3'] = false;
  next['event4'] = true;

  var cols = document.querySelector(table).querySelectorAll('tbody td[title]');

  for (var i = 0; i < cols.length; i++) {
    var col = cols[i];

    ok(col.dispatchEvent(click), "Trigger column '" + col.textContent + "' click event");

    var result4 = 'post-process(value=' + col.textContent + ')';

    equal(window.alert.message, result4, "Window alert message expected is '" + result4 + "'");
  }

  next['event4'] = false;
  next['event5'] = true;

  var menu = document.querySelector('select.options');

  menu.value = 1;

  ok(menu.dispatchEvent(change), 'Trigger menu change event');

  var result5 = 'post-process(menu)';

  equal(window.alert.message, result5, "Window alert message expected is '" + result5 + "'");

  next['event5'] = false;
});
