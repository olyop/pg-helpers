import { query } from "./query"
import { Client } from "./types"
import { getResultExists } from "./get-result-exists"

const existsQuery =
	(client: Client) =>
		({ table, column, value }: ExistsQueryOptions) =>
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
				parse: getResultExists,
				variables: [{
					key: "table",
					value: table,
					string: false,
				},{
					key: "column",
					value: column,
					string: false,
				},{
					value,
					key: "value",
					parameterized: true,
				}],
			})

export const exists =
	(client: Client) =>
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

interface ExistsOptionsBase {
	table: string,
	column: string,
}

interface ExistsQueryOptions extends ExistsOptionsBase {
	value: string,
}

export interface ExistsOptions extends ExistsOptionsBase {
	value: string | string[],
}