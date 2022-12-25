import { getResultExists } from "../get-result-exists.js";
import { importSQL } from "../import-sql.js";
import { QueryOptionsLog, query } from "../query/index.js";
import { PoolOrClient } from "../types.js";

const SELECT_EXISTS = await importSQL(import.meta.url)("select-exists");

export interface ExistsOptionsBase extends Partial<QueryOptionsLog> {
	table: string;
	column: string;
}

export interface ExistsQueryOptions extends ExistsOptionsBase {
	value: string;
}

const existsQuery =
	(client: PoolOrClient) =>
	({ table, column, value, ...log }: ExistsQueryOptions) =>
		query(client)(SELECT_EXISTS)({
			...log,
			parse: getResultExists,
			variables: {
				table: [table],
				column: [column],
				value: [value, [true]],
			},
		});

export interface ExistsOptions extends ExistsOptionsBase {
	value: string | string[];
}

export const exists =
	(client: PoolOrClient) =>
	async ({ value, ...input }: ExistsOptions) => {
		if (Array.isArray(value)) {
			const response = await Promise.all(
				value.map(valueTwo =>
					existsQuery(client)({
						...input,
						value: valueTwo,
					}),
				),
			);
			return response.every(Boolean);
		} else {
			return existsQuery(client)({ ...input, value });
		}
	};
