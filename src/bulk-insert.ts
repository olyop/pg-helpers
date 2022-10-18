import snakeCase from "lodash-es/snakeCase";

import { PoolOrClient, VariableType } from "./types";
import { baseQuery } from "./base-query";

export const bulkInsert =
	(pg: PoolOrClient) =>
	async <T>(rows: T[], { table, columns }: BulkInsertOptions<T>) => {
		let sql = `INSERT INTO ${table}`;

		// Define columns
		sql += ` (${columns.map(({ key }) => snakeCase(key.toString())).join(", ")}) `;

		// Add values
		sql += " VALUES ";

		// Loop over all rows
		for (const [rowIndex, row] of rows.entries()) {
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

			if (rowIndex !== rows.length - 1) {
				sql += ",";
			}
		}

		sql += ";";

		await baseQuery(pg)(sql);
	};

interface Column<T> {
	key: keyof T;
	itemToValue: (item: T) => VariableType;
}

interface BulkInsertOptions<T> {
	columns: Column<T>[];
	table: string;
}
