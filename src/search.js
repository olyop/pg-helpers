import { join } from "./join";
import { query } from "./query";
import { convertTableToCamelCase } from "./convert-table-to-camel-case";
export const search = (client) => ({ value, exact, tableName, columnName, columnNames, }) => query(client)(`
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
    parse: convertTableToCamelCase(),
    variables: [{
            key: "tableName",
            value: tableName,
        }, {
            key: "columnNames",
            value: join(columnNames),
        }, {
            key: "limit",
            value: exact ? "1" : "10",
        }, {
            key: "searchType",
            value: exact ? "=" : "LIKE",
        }, {
            key: "query",
            parameterized: true,
            value: exact ? value : `%${value.toLowerCase()}%`,
        }, {
            key: "columnName",
            value: exact ? columnName : `lower(${columnName})`,
        }],
});
