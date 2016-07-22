module('Tidy-Table', {
  setup: function() {
    document.getElementById('qunit-fixture')
      .TidyTable({
        enableCheckbox: true,
        enableMenu:     true,
        reverseSortDir: true
      },
      {
        columnTitles: ['Column A', 'Column B', 'Column C'],
        columnValues: [
          ['Row 1A', 'Row 1B', 'Row 1C'],
          ['Row 2A', 'Row 2B', 'Row 2C'],
          ['Row 3A', 'Row 3B', 'Row 3C'],
          ['Row 4A', 'Row 4B', 'Row 4C']
        ],
        menuOptions: [
          ['- Action -', null],
          ['Callback 1', { callback: doSomething1 }],
          ['Callback 2', { callback: doSomething2 }]
        ],
        postProcess: {
          table:  doSomething3,
          column: doSomething4,
          menu:   doSomething5
        }
      });

    function doSomething1(rows) {
      if (next['event1']) {
        window.alert('callback1(rows=' + rows.length + ')');
      }
    }

    function doSomething2(rows) {
      if (next['event2']) {
        window.alert('callback2(rows=' + rows.length + ')');
      }
    }

    function doSomething3(table) {
      table.addEventListener('hover', function() {
        if (next['event3']) {
          window.alert('post-process(table)');
        }
      });
    }

    function doSomething4(col) {
      col.addEventListener('click', function() {
        if (next['event4']) {
          window.alert('post-process(value=' + this.textContent + ')');
        }
      });
    }

    function doSomething5(menu) {
      menu.addEventListener('change', function() {
        if (next['event5']) {
          window.alert('post-process(menu)');
        }
      });
    }
  },
  teardown: function() {
    // Do nothing - preserve element structure
  }
});

test('Generate HTML', function() {
  ok(document.getElementById('qunit-fixture').querySelector(table), 'Table elements created');
});
