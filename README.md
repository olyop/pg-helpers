# pg-helpers
A wrapper library for the [pg](https://www.npmjs.com/package/pg) npm package.

## Installation
`npm install @oly_op/pg-helpers`

## Usage
The package exports 14 helpers which you can import individually.

`import {  query, parseTable } from "@oly_op/pg-helpers"`

## API

Query helpers:
* `query`
* `exists`
* `unique`
* `search`

Result parsing helpers:
* `parseRow`
* `parseTable`
* `getResRow`
* `getRowCount`
* `getResExists`
* `getRowCountOrNull`
* `isResEmpty`
* `convertToCamelCase`
* `convertToSnakeCase`
