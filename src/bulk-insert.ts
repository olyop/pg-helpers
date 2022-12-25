import { snakeCase } from "lodash-es";

import { baseQuery } from "./base-query.js";
import { PoolOrClient, VariableType } from "./types.js";

export const bulkInsert =
	(pg: PoolOrClient) =>
	async <T>({ data, table, columns, log }: BulkInsertOptions<T>) => {
		let sql = `INSERT INTO ${table}`;

		// Define columns
		sql += ` (${columns.map(({ key }) => snakeCase(key.toString())).join(", ")}) `;

		// Add values
		sql += " VALUES ";

		// Loop over all rows
		for (const [rowIndex, row] of data.entries()) {
			sql += "(";

			// Loop over all columns
			for (const [columnIndex, column] of columns.entries()) {
				const value = row[column.key];
				sql += `'${value as string}'`;
				if (columnIndex !== columns.length - 1) {
					sql += ",";
				}
			}

			sql += ")";

			if (rowIndex !== data.length - 1) {
				sql += ",";
			}
		}

		sql += ";";

		if (log) {
			console.log(sql);
		}

		await baseQuery(pg)(sql);
	};

interface Column<T> {
	key: keyof T;
	itemToValue: (item: T) => VariableType;
}

interface BulkInsertOptions<T> {
	data: T[];
	log?: boolean;
	table: string;
	columns: Column<T>[];
}
