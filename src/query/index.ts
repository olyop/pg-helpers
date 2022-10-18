import isEmpty from "lodash-es/isEmpty";
import pgMinify, { IMinifyOptions } from "pg-minify";

import normalizeInput from "./normalize-input";
import { PoolOrClient, RowBase } from "../types";
import { QueryOptions, SQLInput } from "./types";
import variablesAreProvided from "./variables-are-provided";
import determineSQLAndParams from "./determine-sql-and-params";

export * from "./types";

const IS_DEV = process.env.NODE_ENV === "development";

const MINIFY_OPTIONS: IMinifyOptions = {
	compress: IS_DEV,
	removeAll: IS_DEV,
};

export const query =
	(pg: PoolOrClient) =>
	(sqlInput: SQLInput) =>
	async <T>(input?: QueryOptions<T>) => {
		const { sql, log, parse, variables } = normalizeInput(sqlInput, input);

		if (log?.variables) {
			console.log(variables);
		}

		if (IS_DEV && variablesAreProvided(sql, variables)) {
			const { sqlWithValues, params } = determineSQLAndParams(sql, variables);
			const sqlWithValuesMinified = pgMinify(sqlWithValues, MINIFY_OPTIONS);

			if (log?.sql) {
				console.log(sqlWithValuesMinified);
			}

			try {
				const result = await pg.query<RowBase>(
					sqlWithValuesMinified,
					isEmpty(params) ? undefined : params,
				);

				const parsedResult = parse(result);

				if (log?.result) {
					console.log(parsedResult);
				}

				return parsedResult;
			} catch (error) {
				if (IS_DEV) {
					throw error;
				} else {
					throw new Error("Database Error");
				}
			}
		} else {
			throw new TypeError("Invalid query arguments");
		}
	};
