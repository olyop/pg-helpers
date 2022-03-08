import { isArray } from "lodash-es"

import { PoolOrClient } from "./types"
import { query, QueryOptionsLog } from "./query"
import { getResultExists } from "./get-result-exists"

export interface ExistsOptionsBase
	extends QueryOptionsLog {
	table: string,
	column: string,
}

const SELECT_EXISTS = `
	SELECT EXISTS (
		SELECT
			*
		FROM
			{{ table }}
		WHERE
			{{ column }} = {{ value }}
	);
`

interface ExistsQueryOptions
	extends ExistsOptionsBase {
	value: string,
}

const existsQuery =
	(client: PoolOrClient) =>
		({ log, table, column, value }: ExistsQueryOptions) =>
			query(client)(SELECT_EXISTS)({
				log,
				parse: getResultExists,
				variables: [{
					key: "table",
					value: table,
				},{
					key: "column",
					value: column,
				},{
					value,
					key: "value",
					parameterized: true,
				}],
			})
export interface ExistsOptions
	extends ExistsOptionsBase {
	value: string | string[],
}

export const exists =
	(client: PoolOrClient) =>
		async ({ value, ...input }: ExistsOptions) => {
			if (isArray(value)) {
				const res =
					await Promise.all(
						value.map(
							val => (
								existsQuery(client)({
									...input,
									value: val,
								})
							),
						),
					)
				return res.every(Boolean)
			} else {
				return existsQuery(client)({ ...input, value })
			}
		}