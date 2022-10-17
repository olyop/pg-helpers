# pg-helpers

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

pg-helpers is a wrapper library for the popular [node-postgres](https://node-postgres.com/) library (`pg` npm package). It adds many utilities including a `query` function that makes inserting variables and parameters a lot easier in my opinion. It does this by using a simple template mechanism in your SQL code that allows you to insert a variable or a parameter.

## Installation

```sh
$ npm install @oly_op/pg-helpers
```

## Usage

`@oly_op/pg-helpers` re-exports everything from `pg`.

### types

```typescript
import type { Pool, PoolClient, QueryResult as ResultBase } from "pg";

export type PoolOrClient = Pool | PoolClient;
export type Row = Record<string, unknown>;
export type Result<T = Row> = ResultBase<T>;
```

### query helpers

#### `query`

```typescript
// definition
query(client: PoolOrClient) =>
  (sql: string) =>
    <T>(input?: QueryOptions<T> | undefined) =>
      Promise<T>;

// types
export type VariableType = string | number | boolean | null

export interface Variable {
  key: string,
  value: VariableType,
  parameterized?: boolean,
}

export type VariableInput = Variable[] | Record<string, VariableType>

export type Parse<T> = (result: Result) => T

export interface QueryOptionsLog {
  sql?: boolean,
  result?: boolean,
  variables?: boolean,
}

export interface QueryOptions<T> {
  parse?: Parse<T>,
  log?: QueryOptionsLog,
  variables?: VariableInput,
}

// example #1
interface User {
  name: string,
  userID: string,
}

const getUser =
  async (userID: string) =>
    query(context.pg)(`
      SELECT
        {{ columnNames }}
      FROM
        users
      WHERE
        user_id = '{{ userID }}'
    `)({
      parse: convertFirstRowToCamelCase<User>(),
      variables: {
        userID,
        columnNames: join(["user_id", "name"]),
      },
    })

console.log((await getUser("1234")).name)
```

[downloads-image]: https://img.shields.io/npm/dm/@oly_op/pg-helpers.svg
[downloads-url]: https://npmjs.org/package/@oly_op/pg-helpers
[npm-image]: https://img.shields.io/npm/v/@oly_op/pg-helpers.svg
[npm-url]: https://npmjs.org/package/@oly_op/pg-helpers
