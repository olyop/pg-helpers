import { PoolOrClient } from "./types"
import { query, QueryOptionsLog } from "./query"
import { getResultExists } from "./get-result-exists"

const existsQuery =
	(client: PoolOrClient) =>
		({ log, table, column, value }: ExistsQueryOptions) =>
			query(client)(`
				SELECT EXISTS (
					SELECT
						*
					FROM
						{{ table }}
					WHERE
						{{ column }} = {{ value }}
				);
		`)({
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

interface ExistsOptionsBase {
	table: string,
	column: string,
	log?: QueryOptionsLog,
}

interface ExistsQueryOptions extends ExistsOptionsBase {
	value: string,
}

export interface ExistsOptions extends ExistsOptionsBase {
	value: string | string[],
}

export const exists =
	(client: PoolOrClient) =>
		async ({ value, ...input }: ExistsOptions) => {
			if (Array.isArray(value)) {
				const queries = value.map(val => (
					existsQuery(client)({
						...input,
						value: val,
					})
				))
				const res = await Promise.all(queries)
				return res.every(Boolean)
			} else {
				return existsQuery(client)({ ...input, value })
			}
		}