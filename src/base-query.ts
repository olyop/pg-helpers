import pgMinify, { IMinifyOptions } from "pg-minify";

import { PoolOrClient, RowBase } from "./types";

export * from "./types";

const IS_DEV = process.env.NODE_ENV === "development";

const MINIFY_OPTIONS: IMinifyOptions = {
	compress: IS_DEV,
	removeAll: IS_DEV,
};

export const baseQuery = (pg: PoolOrClient) => async (sql: string, params?: string[]) => {
	try {
		const sqlMinified = pgMinify(sql, MINIFY_OPTIONS);
		return await pg.query<RowBase>(sqlMinified, params);
	} catch (error) {
		if (IS_DEV) {
			throw error;
		} else {
			throw new Error("Database Error");
		}
	}
};
