import { baseQuery } from "../base-query";
import { IS_DEVELOPMENT } from "../globals";
import { PoolOrClient } from "../types";
import determineSQLAndParams from "./determine-sql-and-params";
import normalizeInput from "./normalize-input";
import { QueryOptions, SQLInput } from "./types";
import variablesAreProvided from "./variables-are-provided";

export * from "./types";

export const query =
	(pg: PoolOrClient) =>
	(sqlInput: SQLInput) =>
	async <T>(input?: QueryOptions<T>) => {
		const { sql, log, parse, variables } = normalizeInput(sqlInput, input);

		if (IS_DEVELOPMENT && log?.variables) {
			console.log(variables);
		}

		if (variablesAreProvided(sql, variables)) {
			const { sqlWithValues, paramaters } = determineSQLAndParams(sql, variables);

			if (IS_DEVELOPMENT && log?.sql) {
				console.log(sqlWithValues);
			}

			const result = await baseQuery(pg)(sqlWithValues, paramaters);

			if (IS_DEVELOPMENT && log?.result) {
				console.log(result);
			}

			const parsedResult = parse(result);

			if (IS_DEVELOPMENT && log?.parsedResult) {
				console.log(parsedResult);
			}

			return parsedResult;
		} else {
			throw new TypeError("Invalid query arguments");
		}
	};
