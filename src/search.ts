import { join } from "./join"
import { query } from "./query"
import { Client, SearchOptions } from "./types"
import { convertTableToCamelCase } from "./convert-table-to-camel-case"

const SQL = `
	SELECT
		{{ columnNames }}
	FROM
		{{ tableName }}
	WHERE
		{{ columnName }} {{ searchType }} {{ query }}
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
	}: SearchOptions) =>
		query(client)(SQL)({
			parse: convertTableToCamelCase<T>(),
			variables: [{
				string: false,
				key: "tableName",
				value: tableName,
			},{
				string: false,
				key: "columnNames",
				value: join(columnNames),
			},{
				key: "limit",
				string: false,
				value: exact ? "1" : "10",
			},{
				string: false,
				key: "searchType",
				value: exact ? "=" : "LIKE",
			},{
				key: "query",
				parameterized: true,
				value: exact ? value : `%${value.toLowerCase()}%`,
			},{
				string: false,
				key: "columnName",
				value: exact ? columnName : `lower(${columnName})`,
			}],
		})