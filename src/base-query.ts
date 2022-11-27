import pgMinify, { IMinifyOptions } from "pg-minify";

import { IS_DEVELOPMENT } from "./globals";
import { PoolOrClient, Row, VariableType } from "./types";

export class DatabaseError extends Error {
	constructor() {
		super("An error occurred while querying the database");
	}
}

const MINIFY_OPTIONS: IMinifyOptions = {
	removeAll: true,
	compress: !IS_DEVELOPMENT,
};

export const baseQuery = (pg: PoolOrClient) => async (sql: string, paramaters?: VariableType[]) => {
	try {
		const sqlMinified = pgMinify(sql, MINIFY_OPTIONS);
		return await pg.query<Row>(sqlMinified, paramaters);
	} catch (error) {
		if (IS_DEVELOPMENT) {
			throw error;
		} else {
			throw new DatabaseError();
		}
	}
};
