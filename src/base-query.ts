import pgMinify, { IMinifyOptions } from "pg-minify";

import { IS_DEVELOPMENT } from "./globals.js";
import { PoolOrClient, Row, VariableType } from "./types.js";

export class DatabaseError extends Error {
	constructor() {
		super("An error occurred while querying the database");
	}
}

const MINIFY_OPTIONS: IMinifyOptions = {
	removeAll: true,
	compress: !IS_DEVELOPMENT,
};

export const baseQuery =
	(pg: PoolOrClient) => (sql: string, paramaters?: VariableType[], logSql?: boolean) => {
		try {
			const sqlMinified = pgMinify(sql, MINIFY_OPTIONS);

			if (IS_DEVELOPMENT && logSql) {
				console.log(sqlMinified);
			}

			return pg.query<Row>(sqlMinified, paramaters);
		} catch (error) {
			if (IS_DEVELOPMENT) {
				throw error;
			} else {
				throw new DatabaseError();
			}
		}
	};
