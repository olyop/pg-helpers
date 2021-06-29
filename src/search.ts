import { join } from "./join"
import { query } from "./query"
import { PoolOrClient } from "./types"
import { convertTableToCamelCase } from "./convert-table-to-camel-case"

export interface SearchOptions {
	value: string,
	exact: boolean,
	tableName: string,
	columnName: string,
	columnNames: string[],
}

export const search =
	(client: PoolOrClient) => <T>({
		value,
		exact,
		tableName,
		columnName,
		columnNames,
	}: SearchOptions) =>
		query(client)(`
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
	`)({
			parse: convertTableToCamelCase<T>(),
			variables: [{
				key: "tableName",
				value: tableName,
			},{
				key: "columnNames",
				value: join(columnNames),
			},{
				key: "limit",
				value: exact ? "1" : "10",
			},{
				key: "searchType",
				value: exact ? "=" : "LIKE",
			},{
				key: "query",
				parameterized: true,
				value: exact ? value : `%${value.toLowerCase()}%`,
			},{
				key: "columnName",
				value: exact ? columnName : `lower(${columnName})`,
			}],
		})