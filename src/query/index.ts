import pgMinify, { IMinifyOptions } from "pg-minify";

import { baseQuery } from "../base-query.js";
import { IS_DEVELOPMENT } from "../globals.js";
import { PoolOrClient } from "../types.js";
import determineSQLAndParams from "./determine-sql-and-params.js";
import normalizeOptions from "./normalize-options.js";
import { QueryOptions, SQLInput } from "./types.js";
import variablesAreProvided from "./variables-are-provided.js";

export * from "./types.js";

const MINIFY_OPTIONS: IMinifyOptions = {
	removeAll: true,
	compress: !IS_DEVELOPMENT,
};

export const query = (pg: PoolOrClient) => (sqlInput: SQLInput) => {
	const sqlAsString = sqlInput.toString();
	const sql = pgMinify(sqlAsString, MINIFY_OPTIONS);
	return async <T = void>(input?: QueryOptions<T>) => {
		const { parse, variables, ...log } = normalizeOptions<T>(input);

		if (IS_DEVELOPMENT && log.logSql) {
			console.log(sqlAsString);
		}

		if (IS_DEVELOPMENT && log.logVariables) {
			console.log(variables);
		}

		const variablesAreProvidedResult = IS_DEVELOPMENT ? variablesAreProvided(sql, variables) : true;

		if (typeof variablesAreProvidedResult === "string") {
			throw new TypeError(`Invalid query arguments: ${variablesAreProvidedResult}`);
		}

		const { sqlWithValues, paramaters } = determineSQLAndParams(sql, variables);

		if (IS_DEVELOPMENT && log.logParsedSql) {
			console.log(sqlWithValues);
		}

		const result = await baseQuery(pg)(sqlWithValues, paramaters);

		if (IS_DEVELOPMENT && log.logResult) {
			console.log(result);
		}

		const parsedResult = parse(result);

		if (IS_DEVELOPMENT && log.logParsedResult) {
			console.log(parsedResult);
		}

		return parsedResult;
	};
};
