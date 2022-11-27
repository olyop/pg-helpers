import { readFile } from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { getResultExists } from "../get-result-exists";
import { QueryOptionsLog, query } from "../query";
import { PoolOrClient } from "../types";

export const importSQL = (importMetaURL: string) => (filename: string) => {
	const folderPath = dirname(fileURLToPath(importMetaURL));
	const filePath = path.join(folderPath, `${filename}.sql`);
	return readFile(filePath, "utf8");
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
				value: [value, [false, true]],
				table: [column, [false, false]],
				column: [column, [false, false]],
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
