/*
 *  Tidy Table
 *  Generate a sortable HTML table from JSON
 *
 *  Copyright 2012, Marc S. Brooks (http://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  Dependencies:
 *    jquery.js
 */

(function($) {
	var methods = {
		init : function(options, values, callback) {

			// default options
			var settings = $.extend({
				enableCheckbox : false
			}, options);

			return this.each(function() {
				var $this = $(this),
					data  = $this.data();

				if ( $.isEmptyObject(data) ) {
					$(this).data({
						container : $this,
						headers   : values.columnTitles,
						values    : values.columnValues,
						callback  : callback,
						options   : settings,
					});
				}
			});
		},

		destroy : function() {
			return this.each(function() {
				$(this).removeData();
			});
		},

		generate : function() {
			return this.each(function() {
				var $this = $(this),
					data  = $this.data();

				createTable(data);
			});
		}
	};

	$.fn.TidyTable = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1) );
		}
		else
		if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		else {
			$.error('Method ' +  method + ' does not exist on jQuery.TidyTable');
		}
	};

	/*
	 * Create HTML table elements
	 */
	function createTable(data, num, order) {

		// create reusable elements
		var table = $('<table></table>').addClass('tidy_table');
		var thead = $('<thead></thead>');
		var tbody = $('<tbody></tbody>');
		var row   = $('<tr></tr>');

		// define table globals
		table.mousedown(function() { return false });
		table.mouseover(function() { return false });

		var cols = data.headers;

		// .. <THEAD>
		for (var i = 0; i < cols.length; i++) {
			var col = $('<th></th>');
			col.append(cols[i]);
			row.append(col);

			var col_class;

			// determine column the result order
			if (order == 'desc' || !order) {
				col_class = 'sort_desc';
				col.order = 'asc';
			}
			else {
				col_class = 'sort_asc';
				col.order = 'desc';
			}

			// highlight the selected column
			if (num == i) {
				col.addClass(col_class);
			}

			// attach sorting event to each column
			col.bind('click', {
				col_number : i,
				sort_order : col.order
			},
			function(event) {
				sortByColumn(data, event.data.col_number, event.data.sort_order);
			});
		}

		thead.append(row);

		var vals = data.values;

		// .. <TBODY>
		for (var j = 0; j < vals.length; j++) {
			var row = $('<tr></tr>');

			for (var k = 0; k < vals[j].length; k++) {
				var row_name  = vals[j][0];
				var col_value = vals[j][k];

				var col = $('<td></td>')
					.append(col_value);

				row.append(col);

				if (data.callback) {

					// attach event to each column
					col.bind('click', {
						row_name  : row_name,
						col_value : col_value
					},
					function(event) {
						data.callback(event.data.row_name, event.data.col_value);
					});
				}
			}

			tbody.append(row);
		}

		table.append(thead);
		table.append(tbody);

		// append check boxes to the beginning each row
		if (data.options.enableCheckbox) {
			var rows = table.find('tr');

			rows.each(function(index) {
				row = $(this);

				var input = $('<input></input>')
					.attr('type','checkbox');

				var col;

				// first row is always the header
				if (index == 0) {
					col = $('<th></th>');

					// attach event to check all boxes
					input.click(function() {
						toggleSelRows(rows);
					});
				}
				else {
					col = $('<td></td>');

					// attach event to each checkbox
					input.bind('click', {
						box_number : index,
					},
					function(event) {
						toggleSelRows(rows, event.data.box_number);
					});
				}

				col.append(input);

				// insert before the first cell
				row.prepend(col);
			});
		}

		// if table exists, replace it
		var elm = data.container;
		if (elm) {
			if (elm.children() ) {
				elm.children().remove();
			}

			elm.append(table);
		}
	}

	/*
	 * Select/Deselect (input checkbox and row highlight)
	 */
	function toggleSelRows(rows, num) {
		var checked = null;

		rows.each(function(index) {
			var row = $(this);

			var input = row.children().find('input');

			// update all rows
			if (num == null) {
				if (index == 0) {
					checked = (input.is(':checked') ) ? true : false;
					return;
				}

				if (checked) {
					row.removeClass('check_off').addClass('check_on');
					input.attr('checked', true);
				}
				else {
					row.removeClass('check_on').addClass('check_off');
					input.attr('checked', false);
				}
			}

			// update selected row
			else {
				if (input.is(':checked')) {
					row.removeClass('check_off').addClass('check_on');
					input.attr('checked', true);
				}
				else {
					row.removeClass('check_on').addClass('check_off');
					input.attr('checked', false);
				}
			}
		});
	}

	/*
	 * Display the results ordered by selected column
	 */
	function sortByColumn(data, num, order) {
		var reverse = (order == 'desc') ? -1 : 1;

		// sort the JSON object by bucket number
		data.values.sort(function(a, b) {
			var str1 = a[num].replace(/$|%|#/g, '');
			var str2 = b[num].replace(/$|%|#/g, '');

			if (isNaN(str1) ) {
				return [reverse * cmpAny(str1, str2)] >
				       [reverse * cmpAny(str2, str1)] ? -1 : 1;
			}
			else {
				return [reverse * cmpInt(str1, str2)];
			}
		});

		createTable(data, num, order);
	}

	/*
	 * Generic string comparison functions
	 */
	function cmpAny(a, b) {
		return (a > b) ? 1 : (a < b) ? -1 : 0;
	}

	function cmpInt(a, b) {
		return b - a;
	}
})(jQuery);
