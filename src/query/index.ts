import { isEmpty } from "lodash"

import { QueryOptions } from "./types"
import { PoolOrClient } from "../types"
import normalizeInput from "./normalize-input"
import normalizeVariables from "./normalize-variables"
import variablesAreProvided from "./variables-are-provided"
import determineSQLAndParams from "./determine-sql-and-params"

export * from "./types"

export const query =
	(client: PoolOrClient) =>
		(sql: string) =>
			async <T>(input?: QueryOptions<T>) => {
				const normalizedInput = normalizeInput(input)
				const { log, parse, variables } = normalizedInput
				const normalizedVariables = normalizeVariables(variables)
				if (log?.variables) {
					console.log(variables)
				}
				if (variablesAreProvided(sql, normalizedVariables)) {
					const { SQLWithValues, params } =
						determineSQLAndParams(sql, normalizedVariables)
					if (log?.sql) {
						console.log(SQLWithValues)
					}
					try {
						const result = await client.query(
							SQLWithValues,
							isEmpty(params) ? undefined : params,
						)
						if (log?.result) {
							console.log(result.rows)
						}
						if (parse) {
							return parse(result)
						} else {
							return (result as unknown) as T
						}
					} catch (err) {
						// eslint-disable-next-line node/no-process-env
						if (process.env.NODE_ENV === "development") {
							console.error(err)
						}
						throw err
					}
				} else {
					throw new TypeError("Invalid query arguments")
				}
			}