import { join } from "./join"
import { query } from "./query"
import { Client } from "./types"
import { parseTable } from "./parseTable"

const SELECT_DOC_SEARCH = `
	SELECT
		{{ columnNames }}
	FROM
		{{ tableName }}
	WHERE
		{{ columnName }} {{ sqlSearchType }} {{ query }}
	ORDER BY
		{{ columnName }} ASC
	LIMIT
		{{ limit }};
`

export const search =
	(client: Client) => <T>({
		value,
		exact,
		tableName,
		columnName,
		columnNames,
	}: SearchInput) =>
		query(client)({
			sql: SELECT_DOC_SEARCH,
			parse: parseTable<T>(),
			variables: [{
				string: false,
				key: "tableName",
				value: tableName,
			},{
				key: "limit",
				string: false,
				value: exact ? "1" : "10",
			},{
				string: false,
				key: "columnNames",
				value: join(columnNames),
			},{
				string: false,
				key: "sqlSearchType",
				value: exact ? "=" : "LIKE",
			},{
				string: false,
				key: "columnName",
				value: exact ? columnName : `lower(${columnName})`,
			},{
				key: "query",
				parameterized: true,
				value: exact ? value : `%${value.toLowerCase()}%`,
			}],
		})

export interface SearchInput {
	value: string,
	exact: boolean,
	tableName: string,
	columnName: string,
	columnNames: string[],
}