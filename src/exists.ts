import { query } from "./query"
import { Client } from "./types"
import { getResExists } from "./getResExists"

const EXISTS_COLUMN = `
	SELECT EXISTS (
		SELECT
			*
		FROM
			{{ table }}
		WHERE
			{{ column }} = {{ value }}
	);
`

const existsQuery =
	(client: Client) =>
		({ table, column, value }: ExistsQueryInput) =>
			query(client)<boolean>()({
				sql: EXISTS_COLUMN,
				parse: getResExists,
				variables: [{
					value,
					key: "value",
					parameterized: true,
				},{
					key: "table",
					value: table,
					string: false,
				},{
					key: "column",
					value: column,
					string: false,
				}],
			})

export const exists =
	(client: Client) =>
		async ({ value, ...input }: ExistsInput) => {
			if (Array.isArray(value)) {
				const queries = value.map(val => existsQuery(client)({ ...input, value: val }))
				const res = await Promise.all(queries)
				return res.every(Boolean)
			} else {
				return existsQuery(client)({ ...input, value })
			}
		}

export interface ExistsInput {
	table: string,
	column: string,
	value: string | string[],
}

interface ExistsQueryInput extends ExistsInput {
	value: string,
}