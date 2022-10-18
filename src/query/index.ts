import { PoolOrClient } from "../types";
import { baseQuery } from "../base-query";
import normalizeInput from "./normalize-input";
import { QueryOptions, SQLInput } from "./types";
import variablesAreProvided from "./variables-are-provided";
import determineSQLAndParams from "./determine-sql-and-params";

export * from "./types";

export const query =
	(pg: PoolOrClient) =>
	(sqlInput: SQLInput) =>
	async <T>(input?: QueryOptions<T>) => {
		const { sql, log, parse, variables } = normalizeInput(sqlInput, input);

		if (log?.variables) {
			console.log(variables);
		}

		if (variablesAreProvided(sql, variables)) {
			const { sqlWithValues, params } = determineSQLAndParams(sql, variables);

			if (log?.sql) {
				console.log(sqlWithValues);
			}

			const result = await baseQuery(pg)(sqlWithValues, params);

			const parsedResult = parse(result);

			if (log?.result) {
				console.log(parsedResult);
			}

			return parsedResult;
		} else {
			throw new TypeError("Invalid query arguments");
		}
	};
