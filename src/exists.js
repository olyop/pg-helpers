import { query } from "./query";
import { getResultExists } from "./get-result-exists";
const existsQuery = (client) => ({ table, column, value }) => query(client)(`
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
        }, {
            key: "column",
            value: column,
        }, {
            value,
            key: "value",
            parameterized: true,
        }],
});
export const exists = (client) => async ({ value, ...input }) => {
    if (Array.isArray(value)) {
        const queries = value.map(val => (existsQuery(client)({
            ...input,
            value: val,
        })));
        const res = await Promise.all(queries);
        return res.every(Boolean);
    }
    else {
        return existsQuery(client)({ ...input, value });
    }
};
