import { readFile } from "node:fs/promises";

import { getResultExists } from "../get-result-exists";
import { QueryOptionsLog, query } from "../query";
import { PoolOrClient } from "../types";

const importSQL = (folderName: string) => (filename: string) => {
	const url = new URL(`${filename}.sql`, folderName);
	return readFile(url, "utf8");
};

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
	({ log, table, column, value }: ExistsQueryOptions) =>
		query(client)(SELECT_EXISTS)({
			log,
			parse: getResultExists,
			variables: {
				table,
				column,
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
