module('Tidy-Table', {
	setup : function() {
		$('#qunit-fixture')
			.TidyTable({
				enableCheckbox : true,
				enableMenu     : true
			},
			{
				columnTitles : ['Column A','Column B','Column C'],
				columnValues : [
					['Row 1A','Row 1B','Row 1C'],
					['Row 2A','Row 2B','Row 2C'],
					['Row 3A','Row 3B','Row 3C']
				],
				menuOptions : [
					['- Action -', null],
					['Callback 1', { callback : doSomething1 }],
					['Callback 2', { callback : doSomething2 }]
				]
			});

		function doSomething1(rows) {
			alert('callback1(rows=' + rows.length + ')');
		}

		function doSomething2(rows) {
			alert('callback2(rows=' + rows.length + ')');
		}
	},
	teardown : function() {
		// do nothing - preserve element structure
	}
});

test('Generate HTML', function() {
	ok($('#qunit-fixture').find(table), 'Table elements created');
});
