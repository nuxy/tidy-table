# tidy-table [![npm version](https://badge.fury.io/js/tidy-table.svg)](https://badge.fury.io/js/tidy-table) [![](https://img.shields.io/npm/dm/tidy-table)](https://www.npmjs.com/package/tidy-table)

Create a HTML table that can be sorted, selected, and post-processed using a simple callback.

![Preview](https://raw.githubusercontent.com/nuxy/tidy-table/master/package.gif)

Checkout the [demo](https://nuxy.github.io/tidy-table) for examples of use.

## Features

- Extensible HTML/CSS interface.
- Compatible with all modern desktop and mobile web browsers.
- Fully responsive layout with touch event support.
- Easy to set-up and customize.
- Customizable callback functions for post-processing selected results.
- Post-process options for manipulating table/column/menu elements.
- Fast and lightweight (JavaScript plug-in *only 4 kB)

## Dependencies

- [Node.js](https://nodejs.org)

## Installation

Install the package into your project using [NPM](https://npmjs.com), or download the [sources](https://github.com/nuxy/tidy-table/archive/master.zip).

    $ npm install tidy-table

### Alternative

To add to an existing [React](https://reactjs.org) or [Vue](https://vuejs.org) project you can install this package using [YARN](https://yarnpkg.com).

#### React

    $ yarn add react-tidy-table

#### Vue

    $ yarn add vue-tidy-table

## Usage

There are two ways you can use this package.  One is by including the JavaScript/CSS sources directly.  The other is by importing the module into your component.

### Script include

After you [build the distribution sources](#cli-options) the set-up is fairly simple..

```html
<script type="text/javascript" src="path/to/tidy-table.min.js"></script>
<link rel="stylesheet" href="path/to/tidy-table.min.css" media="all" />

<script type="text/javascript">
  tidyTable(container, settings, options);
</script>
```

### Module import

If your using a modern framework like [Aurelia](https://aurelia.io), [Angular](https://angular.io), [React](https://reactjs.org), or [Vue](https://vuejs.org)

```javascript
import TidyTable from 'tidy-table';
import 'tidy-table/dist/tidy-table.css';

const tidyTable = new TidyTable(container, settings, options);
```

### HTML markup

```html
<div id="tidy-table"></div>
```

### Example

```javascript
const options = {
  enableCheckbox: true,
  enableMenu:     true,
  reverseSortDir: true,
  responsive:     true
};

const settings = {
  columnTitles: ['Rank', 'Programming Language', 'Ratings Jan 2012', 'Delta Jan 2012', 'Status'],
  columnValues: [
    ['1', 'Java', '17.479%', '-0.29%', 'A'],
    ['2', 'C', '16.976%', '+1.15%', 'A'],
    ['3', 'C#', '8.781%', '+2.55%', 'A'],
    ['4', 'C++', '8.063%', '-0.72%', 'A'],
    ['5', 'Objective-C', '6.919%', '+3.91%','A']
  ],

  // Add menu options to bind result events.
  menuOptions: [
    ['- Action -', null],
    ['Callback 1', {callback: (rows) => {}}],
    ['Callback 2', {callback: (rows) => {}}]
  ],

  // Post-process rendered HTML output.
  postProcess: {
    table:  (HTMLTableElement)     => {},
    column: (HTMLTableCellElement) => {},
    menu:   (HTMLTableElement)     => {}
  },

  // Pre-process column values before sort.
  sortByPattern: function(colNum, val) {
    if (colNum !== 1) return val;

    return val?.replace(/\$|%|#/g, '');
  }
};

const container = document.getElementById('tidy-table');

const tidyTable = new TidyTable(container, settings, options);
```

## Table options

Overriding defaults can be done using the following options:

| Option         | Description                                    | Default |
|----------------|------------------------------------------------|---------|
| enableCheckbox | Add checkbox functionality to table output.    | false   |
| enableMenu     | Add select menu options to alter table output. | false   |
| reverseSortDir | Change the sorting arrow image direction.      | false   |
| responsive     | Enable/disable responsive layout support.      | false   |

## Post-processing examples

There are times where you may need to customize the table result behavior. This can be achieved using `postProcess` hooks.

### Hide the second column of table results

```javascript
function callback(table) {
  const cols = table.querySelectorAll('th:nth-child(2), td:nth-child(2)');

  for (let i = 0; i < cols.length; i++) {
    cols[i].style.display = 'none';
  }
}
```

### Create text field on column click event

```javascript
function callback(col) {
  col.addEventListener('click', function() {
    if (!this.querySelector('form')) {
      const form = document.createElement('form');
      form.addEventListener('submit', function() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/path/to/script');
        xhr.send(null);
      });

      const field = document.createElement('input');
      field.setAttribute('type', 'text');
      field.setAttribute('value', this.textContent);

      const button = document.createElement('input');
      button.setAttribute('type', 'submit');

      form.appendChild(field).appendChild(button);

      this.removeChild(this.firstChild);
      this.appendChild(form);
    });
  }
}
```

### Hide select menu when cookie doesn't exist

```javascript
function callback(menu) {
  if (!getCookie('session')) {
    menu.style.display = 'none';
  }
}
```

## Design template

The Illustrator [template](https://github.com/nuxy/tidy-table/blob/develop/images/arrow.ai) used to create the sort arrows has been provided with this package for reference.

## Developers

### CLI options

Run [ESLint](https://eslint.org) on project sources:

    $ npm run lint

Transpile ES6 sources (using [Babel](https://babeljs.io)) and minify to a distribution:

    $ npm run build

Run [WebdriverIO](https://webdriver.io) E2E tests:

    $ npm run test

## Unsupported releases

To install deprecated versions use [Bower](http://bower.io) or download the package [by tag](https://github.com/nuxy/tidy-table/tags).

### v3 (no dependencies)

    $ bower install tidy-table#3

### v2 (requires [jQuery 1.8.3](http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js))

Compatible with Firefox 3.6, Chrome, Safari 5, Opera, and Internet Explorer 7+ web browsers.

    $ bower install tidy-table#2

## Contributions

If you fix a bug, or have a code you want to contribute, please send a pull-request with your changes. (Note: Before committing your code please ensure that you are following the [Node.js style guide](https://github.com/felixge/node-style-guide))

## Versioning

This package is maintained under the [Semantic Versioning](https://semver.org) guidelines.

## License and Warranty

This package is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose.

_tidy-table_ is provided under the terms of the [MIT license](http://www.opensource.org/licenses/mit-license.php)

## Author

[Marc S. Brooks](https://github.com/nuxy)
