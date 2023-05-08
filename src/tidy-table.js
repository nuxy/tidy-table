/**
 *  tidy-table
 *  Create a HTML table that can be sorted, selected and
 *  post-processed using a simple callback.
 *
 *  Copyright 2012-2023, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * @param {Element} container
 *   Containing HTML element.
 *
 * @param {Object} settings
 *   Table settings.
 *
 * @param {Object} options
 *   Configuration overrides (optional).
 */
function TidyTable(container, settings, options = {}) {
  const self = this;

  const defaults = {
    enableCheckbox: false,
    enableMenu:     false,
    reverseSortDir: false,
    responsive:     false
  };

  (function() {
    self.options = Object.assign(defaults, options);

    const {columnTitles, columnValues} = settings;

    if (columnTitles.length && columnValues.length) {
      renderTable();
    } else {
      throw new Error('Failed to initialize (missing settings)');
    }
  })();

  /**
   * Render a new table instance.
   */
  function renderTable() {
    const table = createTableElm();

    // Post-process table results HTML object.
    if (typeof settings.postProcess?.table === 'function') {
      settings.postProcess.table(table);
    }

    // Replace the element, if already exists.
    const block = container.querySelector('.tidy-table table');

    if (block) {
      block.parentNode.replaceChild(table, block);
    } else {

      // Generate select menu elements.
      if (self.options.enableMenu) {
        container.appendChild(createMenuElm('options'));
      }

      container.classList.add('tidy-table');
      container.appendChild(table);
    }

    // Enable/disable responsive layout support.
    if (defaults.responsive) {
      container.classList.add('responsive');
    }
  }

  /**
   * Create table elements.
   *
   * @return {Element}
   */
  function createTableElm() {
    const table = document.createElement('table');
    table.appendChild(createTableHeaderElm());
    table.appendChild(createTableBodyElm());

    // Append check boxes to beginning each row.
    if (self.options.enableCheckbox) {
      const rows = table.querySelectorAll('tr');

      for (let i = 0; i < rows.length; i++) {
        const input = createCheckboxElm();

        let col;

        // First row is always the header.
        if (i === 0) {
          col = document.createElement('th');

          // Attach event to check all boxes.
          input.addEventListener('click', function() {
            toggleSelRows(rows);
          });
        }
        else {
          col = document.createElement('td');

          // Attach events to each checkbox.
          input.addEventListener('click', function(index) {
            toggleSelRows(rows, index);
          }.bind(null, i), false);
        }

        col.appendChild(input);

        // Insert before first cell.
        rows[i].insertBefore(col, rows[i].firstChild);
      }
    }

    return table;
  }

  /**
   * Create table body elements.
   *
   * @return {Element}
   */
  function createTableBodyElm() {
    const tbody = document.createElement('tbody');

    const vals = settings.columnValues;

    for (let i = 0; i < vals.length; i++) {
      const row = document.createElement('tr');

      for (let j = 0; j < vals[i].length; j++) {
        const val = vals[i][j];

        const col = document.createElement('td');
        col.appendChild(document.createTextNode(val));
        col.setAttribute('title', val);
        row.appendChild(col);

        // Post-process table column HTML object.
        if (typeof settings.postProcess?.column === 'function') {
          settings.postProcess.column(col);
        }
      }

      tbody.appendChild(row);
    }

    return tbody;
  }

  /**
   * Create table header elements.
   *
   * @return {Element}
   */
  function createTableHeaderElm() {
    const thead = document.createElement('thead');
    const row   = document.createElement('tr');

    const titles = settings.columnTitles;

    let sortOrder = self.sortOrder;

    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];

      const col = document.createElement('th');
      col.appendChild(document.createTextNode(title));
      col.setAttribute('title', title);

      row.appendChild(col);

      if (self.selected === i) {
        let className;

        // Determine column result order.
        if (!self.options.reverseSortDir) {
          if (sortOrder === 'asc' || !sortOrder) {
            className = 'arrow-up';
            sortOrder = 'desc';
          }
          else {
            className = 'arrow-up';
            sortOrder = 'asc';
          }
        }
        else {
          if (sortOrder === 'desc' || !sortOrder) {
            className = 'arrow-down';
            sortOrder = 'asc';
          }
          else {
            className = 'arrow-up';
            sortOrder = 'desc';
          }
        }

        // Highlight selected column.
        col.classList.add(className);
      }

      // Attach column sorting events.
      col.addEventListener('click', function(index) {
        self.sortOrder = (self.selected === i) ? sortOrder : 'asc';

        sortByColumn(index, sortOrder);

        self.selected = index;

        renderTable();
      }.bind(null, i), false);
    }

    thead.appendChild(row);

    return thead;
  }

  /**
   * Create checkbox element.
   *
   * @returns {Element}
   */
  function createCheckboxElm() {
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');

    return input;
  }

  /**
   * Create select menu element.
   *
   * @returns {Element}
   */
  function createMenuElm(name) {

    // Create reusable elements.
    const select = document.createElement('select');
    select.classList.add(name);

    // Listen for select menu events.
    select.addEventListener('change', function() {

      // Execute callback.
      const callback = settings.menuOptions[this.value][1].callback;

      if (typeof callback === 'function') {
        callback(getCheckedAsObj());
      }

      this.value = 0;
    });

    // .. Options
    for (let i = 0; i < settings.menuOptions.length; i++) {
      const option = document.createElement('option');
      option.text  = settings.menuOptions[i][0];
      option.value = i;

      select.appendChild(option);
    }

    // Post-process select menu HTML object.
    if (typeof settings.postProcess?.menu === 'function') {
      settings.postProcess.menu(select);
    }

    return select;
  }

  /**
   * Return selected row values as array of objects.
   *
   * @returns {Array<Object>}
   */
  function getCheckedAsObj() {
    const rows = container.querySelectorAll('tbody > tr');
    const objs = [];

    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i].childNodes;

      // If the row checkbox is selected.
      if (cols[0].firstChild.checked) {
        const row = [];

        // Simulate an associative array.
        for (let j = 1; j < cols.length; j++) {
          row[j - 1] = cols[j].textContent;
        }

        objs.push(row);
      }
    }

    return objs;
  }

  /**
   * Select/Deselect (input checkbox and row highlight).
   */
  function toggleSelRows(rows, num) {
    let checked;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      const input = row.querySelector('input[type=checkbox]');

      // Update all rows.
      if (!num) {
        if (i === 0) {
          checked = input.checked;
          continue;
        }

        if (checked) {
          row.classList.replace('check-off', 'check-on') || row.classList.add('check-on');
          input.checked = true;
        }
        else {
          row.classList.replace('check-on', 'check-off');
          input.checked = false;
        }
      }

      // Update selected row.
      else {
        if (i === 0) {
          continue;
        }

        if (input.checked === true) {
          row.classList.replace('check-off', 'check-on') || row.classList.add('check-on');
          input.checked = true;
        }
        else {
          row.classList.replace('check-on', 'check-off');
          input.checked = false;
        }
      }
    }
  }

  /**
   * Display results ordered by selected column.
   */
  function sortByColumn(num, order) {
    let sortByPattern = settings.sortByPattern;

    if (typeof sortByPattern !== 'function') {
      sortByPattern = function(val) {
        return val?.replace(/\$|%|#/g, '');
      };
    }

    const reverse = (order === 'desc') ? -1 : 1;

    // Sort object by array index.
    settings.columnValues.sort(function(a, b) {
      const str1 = sortByPattern(a[num]);
      const str2 = sortByPattern(b[num]);

      if (isNaN(str1)) {
        return [reverse * cmpAny(str1, str2)] >
               [reverse * cmpAny(str2, str1)] ? -1 : 1;
      }

      return [reverse * cmpInt(str1, str2)];
    });
  }

  /**
   * Generic string comparison functions.
   */
  function cmpAny(a, b) {
    return (a > b) ? 1 : (a < b) ? -1 : 0;
  }

  function cmpInt(a, b) {
    return b - a;
  }

  return self;
}

/**
 * Set global/exportable instance, where supported.
 */
window.tidyTable = function(container, settings, options) {
  return new TidyTable(container, settings, options);
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TidyTable;
}
