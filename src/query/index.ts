import pgMinify, { IMinifyOptions } from "pg-minify";

import { baseQuery } from "../base-query";
import { IS_DEVELOPMENT } from "../globals";
import { PoolOrClient } from "../types";
import determineSQLAndParams from "./determine-sql-and-params";
import normalizeOptions from "./normalize-options";
import { QueryOptions, SQLInput } from "./types";
import variablesAreProvided from "./variables-are-provided";

export * from "./types";

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
