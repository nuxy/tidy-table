# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.0] - 2023-05-04

### Changed

The following items are **breaking changes** and not supported in prior releases.

- Updated future releases to be installed via [NPM](https://npmjs.com) vs [Bower](https://bower.io) (legacy only).
- Refactored instance arguments `new TidyTable(container, settings, options)`
- Renamed TR className/CSS selector `sort-desc`, `sort-asc` to `arrow-up`, `arrow-down`
- Replaced GIF images with SVG equivalent (renamed) `arrow-up.svg`, `arrow-down.svg`
- Replaced [QUnit](https://qunitjs.com) testing with [WebdriverIO](https://webdriver.io) framework.
- Integrated [Babel](https://babeljs.io) transpilation build process.

## [4.0.4] - 2023-05-12

### Changed

### Demo

- Fixed menu alignment in Chrome.
- Expand table to 100% width.

## [4.0.5] - 2023-08-07

NPM dependency security updates.

### Documentation

- Added [React](https://github.com/nuxy/react-tidy-table)/[Vue](https://github.com/nuxy/vue-tidy-table) install examples.

## [4.0.6] - 2023-10-06

### Changed

- Replaced/removed deprecated dependencies

## [4.0.7] - 2024-02-08

- Added third-party (got) audit override

## [4.0.8] - 2024-02-21

- Removed Unsupported releases section
- Deleted legacy branch

## [4.0.9] - 2024-02-29

NPM security update ([CVE-2023-42282](https://github.com/advisories/GHSA-78xj-cgh5-2h22))

## Updated

- Replaced Travis-CI with Github workflow

## [4.0.10] - 2024-07-04

- Upgraded `@wdio` CLI local-runner, outdated NPM packages
- NPM security updates ([ws override](https://github.com/advisories/GHSA-3h5v-q93c-6h6q))
