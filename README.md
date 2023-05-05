# tidy-table [![Bower version](https://badge.fury.io/bo/tidy-table.svg)](https://badge.fury.io/bo/tidy-table) [![Build Status](https://api.travis-ci.com/nuxy/tidy-table.svg?branch=master)](https://app.travis-ci.com/github/nuxy/tidy-table)

Create a HTML table that can be sorted, selected, and post-processed using a simple callback.

[<img src="https://nuxy.github.io/tidy-table/preview.gif" alt="tidy-table" />](https://nuxy.github.io/tidy-table)

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

### Unsupported releases

To install deprecated versions use [Bower](http://bower.io).

### v3 (no dependencies)

    $ bower install tidy-table#3

### v2 (requires [jQuery 1.8.3](http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js))

Compatible with Firefox 3.6, Chrome, Safari 5, Opera, and Internet Explorer 7+ web browsers.

    $ bower install tidy-table#2

## Usage

There are two ways you can use this package.  One is by including the JavaScript/CSS sources directly.  The other is by importing the module into your component.

### Script include

After you [build the distribution sources](#cli-options) the set-up is fairly simple..

```html
<script type="text/javascript" src="path/to/tidy-table.min.js"></script>
<link rel="stylesheet" href="path/to/tidy-table.min.css" media="all" />

<script type="text/javascript">
  var tidyTable = tidyTable(container, settings, options);
</script>
```

### Module import

If your using a modern framework like [Aurelia](https://aurelia.io), [Angular](https://angular.io), [React](https://reactjs.org), or [Vue](https://vuejs.org)

```javascript
import TidyTable from 'tidy-table';
import 'tidy-table/dist/tidy-table.css';

const tidyTable = new TidyTable(container, settings, options);
```

## Developers

### CLI options

Run [ESLint](https://eslint.org) on project sources:

    $ npm run lint

Transpile ES6 sources (using [Babel](https://babeljs.io)) and minify to a distribution:

    $ npm run build

Run [WebdriverIO](https://webdriver.io) E2E tests:

    $ npm run test

## Contributions

If you fix a bug, or have a code you want to contribute, please send a pull-request with your changes. (Note: Before committing your code please ensure that you are following the [Node.js style guide](https://github.com/felixge/node-style-guide))

## Versioning

This package is maintained under the [Semantic Versioning](https://semver.org) guidelines.

## License and Warranty

This package is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose.

_tidy-table_ is provided under the terms of the [MIT license](http://www.opensource.org/licenses/mit-license.php)

## Author

[Marc S. Brooks](https://github.com/nuxy)
