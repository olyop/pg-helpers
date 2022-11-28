import { getResultExists } from "../get-result-exists";
import { importSQL } from "../import-sql";
import { QueryOptionsLog, query } from "../query";
import { PoolOrClient } from "../types";

const SELECT_EXISTS = await importSQL(import.meta.url)("select-exists");

export interface ExistsOptionsBase extends QueryOptionsLog {
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
				table: [table, [false]],
				column: [column, [false]],
				value: [value, [false, true]],
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
