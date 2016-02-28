/**
 *  Tidy Table
 *  Create a HTML table from JSON that can be sorted, selected
 *  and post-processed using a simple callback.
 *
 *  Copyright 2012-2016, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

(function() {
  "use strict";

  var table = null;

  /**
   * @namespace TidyTable
   */
  var methods = {

    /**
     * Create new instance of Tidy-Table
     *
     * @memberof TidyTable
     * @method init
     *
     * @example
     * document.getElementById('container').TidyTable(settings, config);
     *
     * @param {Object} settings
     * @param {Object} config
     *
     * @returns {Object} DOM element
     */
    "init": function(settings, config) {
      var _self = this,
          data  = _self.data;

      // Default settings
      var defaults = {
        enableCheckbox: false,
        enableMenu:     false,
        reverseSortDir: false,
        responsive:     false
      };

      if (arguments.length > 1) {
        Object.assign(defaults, settings);
      }
      else {
        config = settings;
      }

      // Config defaults
      config = Object.assign({
        sortByPattern: function(col_num, val) {
          if (col_num && val) {
            return String(val).replace(/$|%|#/g, '');
          }
        }
      }, config);

      if (typeof data === 'undefined') {
        _self.data = {
          settings: defaults,
          config:   config
        };
      }

      // Responsive layout?
      if (defaults.responsive) {
        _self.className = 'tidy_table media';
      }

      return _self.TidyTable('_createTable');
    },

    /**
     * Perform cleanup
     *
     * @memberof TidyTable
     * @method destroy
     *
     * @example
     * document.getElementById('container').TidyTable('destroy');
     */
    "destroy": function() {
      this.remove();
    },

    /**
     * Create HTML table elements.
     *
     * @memberof TidyTable
     * @method _createTable
     * @private
     *
     * @param {String|undefined} num
     * @param {String|undefined} order
     *
     * @returns {Object} DOM element
     */
    "_createTable": function(num, order) {
      var _self = this,
          data  = _self.data;

      // Create reusable elements.
      table = document.createElement('table');
      table.className = 'tidy_table';

      var thead  = document.createElement('thead'),
          tbody  = document.createElement('tbody'),
          titles = null;

      // .. <THEAD>
      (function() {
        titles = data.config.columnTitles;

        var row = document.createElement('tr');

        for (var i = 0; i < titles.length; i++) {
          var title = titles[i];

          var col = document.createElement('th');
          col.appendChild(document.createTextNode(title));
          col.setAttribute('title', title);

          row.appendChild(col);

          var col_class;

          // Determine column result order.
          if (!data.settings.reverseSortDir) {
            if (order == 'asc' || !order) {
              col_class = 'sort_asc';
              col.order = 'desc';
            }
            else {
              col_class = 'sort_desc';
              col.order = 'asc';
            }
          }
          else {
            if (order == 'desc' || !order) {
              col_class = 'sort_asc';
              col.order = 'asc';
            }
            else {
              col_class = 'sort_desc';
              col.order = 'desc';
            }
          }

          // Highlight selected column.
          if (num == i) {
            col.className = col_class;
          }

          col.index = i;

          // Attach sorting event to each column.
          col.addEventListener('click', function() {
            _self.TidyTable('_sortByColumn', this.index, ((num == this.index) ? this.order : 'asc'));
          }, false);
        }

        thead.appendChild(row);
      })();

      // .. <TBODY>
      (function() {
        var vals = data.config.columnValues,
            col  = null;

        for (var j = 0; j < vals.length; j++) {

          // Create the row.
          var row = document.createElement('tr');

          for (var k = 0; k < vals[j].length; k++) {
            var val = vals[j][k];

            // Create the column.
            col = document.createElement('td');
            col.appendChild(document.createTextNode(val));
            col.setAttribute('title', val);

            row.appendChild(col);

            // Post-process table column HTML object.
            if (data.config.postProcess && (typeof data.config.postProcess.column === "function")) {
              data.config.postProcess.column(col);
            }
          }

          tbody.appendChild(row);
        }

        table.appendChild(thead);
        table.appendChild(tbody);

        // Append check boxes to beginning each row.
        if (data.settings && data.settings.enableCheckbox) {
          var rows = table.querySelectorAll('tr');

          for (var i = 0; i < rows.length; i++) {
            var input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.index = i;

            // First row is always the header.
            if (i === 0) {
              col = document.createElement('th');

              // Attach event to check all boxes.
              input.addEventListener('click', function() {
                _self.TidyTable('_toggleSelRows', rows);
              });
            }
            else {
              col = document.createElement('td');

              // Attach event to each checkbox.
              input.addEventListener('click', function() {
                _self.TidyTable('_toggleSelRows', rows, this.index);
              });
            }

            col.appendChild(input);

            // Insert before first cell.
            rows[i].insertBefore(col, rows[i].firstChild);
          }
        }
      })();

      // Post-process table results HTML object.
      if (data.config.postProcess && (typeof data.config.postProcess.table === "function")) {
        data.config.postProcess.table(table);
      }

      var block = _self.querySelector('table.tidy_table');

      // If table exists, perform an in-place update of the element.
      if (block) {
        block.parentNode.replaceChild(table, block);
      }

      // Generate table/menu elements.
      else {
        if (data.settings && data.settings.enableMenu) {
          _self.appendChild( _self.TidyTable('_createMenu', 'options') );
        }

        _self.appendChild(table);
      }

      return table;
    },

    /**
     * Create HTML select menu element
     *
     * @memberof TidyTable
     * @method _createMenu
     * @private
     *
     * @param {String} name
     *
     * @returns {Object} DOM element
     */
    "_createMenu": function(name) {
      var _self = this,
          data  = _self.data;

      // Create reusable elements.
      var select = document.createElement('select');
      select.className = 'tidy_table ' + name;

      // Listen for select menu events.
      select.addEventListener('change', function() {
        var elm = this;

        // Execute callback.
        var callback = data.config.menuOptions[elm.value][1].callback;

        if (typeof callback === 'function') {
          callback( _self.TidyTable('_getCheckedAsObj') );
        }

        elm.value = 0;
      });

      // .. Options
      for (var i = 0; i < data.config.menuOptions.length; i++) {
        var option = document.createElement('option');
        option.text  = data.config.menuOptions[i][0];
        option.value = i;

        select.appendChild(option);
      }

      // Post-process select menu HTML object.
      if (data.config.postProcess && (typeof data.config.postProcess.menu === 'function')) {
        data.config.postProcess.menu(select);
      }

      return select;
    },

    /**
     * Return selected row values as an array.
     *
     * @memberof TidyTable
     * @method _getCheckedAsObj
     * @private
     *
     * @returns {Array}
     */
    "_getCheckedAsObj": function() {
      var _self = this,
          rows  = _self.querySelectorAll('tbody > tr'),
          objs  = [];

      for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].childNodes;

        // If the row checkbox is selected.
        if (cols[0].firstChild.checked) {
          var row = [];

          // Simulate an associative array.
          for (var j = 1; j < cols.length; j++) {
            row[j - 1] = cols[j].textContent;
          }

          objs.push(row);
        }
      }

      return objs;
    },

    /**
     * Select/Deselect (input checkbox and row highlight).
     *
     * @memberof TidyTable
     * @method _toggleSelRows
     * @private
     *
     * @param {Object} rows DOM element
     * @param {Number} num
     */
    "_toggleSelRows": function(rows, num) {
      var checked = null;

      for (var i = 0; i < rows.length; i++) {
        var row   = rows[i],
            input = row.querySelector('input[type=checkbox]');

        // Update all rows.
        if (!num) {
          if (i === 0) {
            checked = input.checked;
            continue;
          }

          if (checked) {
            row.className = (row.className) ? row.className.replace(/check_off/, 'check_on') : 'check_on';
            input.checked = true;
          }
          else {
            row.className = row.className.replace(/check_on/, 'check_off');
            input.checked = false;
          }
        }

        // Update selected row.
        else {
          if (i === 0) {
            continue;
          }

          if (input.checked === true) {
            row.className = (row.className) ? row.className.replace(/check_off/, 'check_on') : 'check_on';
            input.checked = true;
          }
          else {
            row.className = row.className.replace(/check_on/, 'check_off');
            input.checked = false;
          }
        }
      }
    },

    /**
     * Display results ordered by selected column.
     *
     * @memberof TidyTable
     * @method _sortByColumn
     * @private
     *
     * @param {Number} num
     * @param {Number} order
     */
    "_sortByColumn": function(num, order) {
      var _self = this,
          data  = _self.data;

      if (typeof data.config.sortByPattern === 'function') {
        var reverse = (order == 'desc') ? -1 : 1;

        // Sort JSON object by bucket number.
        data.config.columnValues.sort(function(a, b) {
          var str1 = data.config.sortByPattern(num, a[num]),
              str2 = data.config.sortByPattern(num, b[num]);

          if (isNaN(str1)) {
            return [reverse * cmpAny(str1, str2)] >
                   [reverse * cmpAny(str2, str1)] ? -1 : 1;
          }
          else {
            return [reverse * cmpInt(str1, str2)];
          }
        });
      }

      _self.TidyTable('_createTable', num, order);
    }
  };

  Element.prototype.TidyTable = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    else
    if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    }
    else {
      throw new Error('Method ' +  method + ' does not exist in TidyTable');
    }
  };

  /**
   * Generic string comparison functions.
   *
   * @protected
   *
   * @param {String} a
   * @param {String} b
   *
   * @returns {Number}
   */
  function cmpAny(a, b) {
    return (a > b) ? 1 : (a < b) ? -1 : 0;
  }

  function cmpInt(a, b) {
    return b - a;
  }
})();
