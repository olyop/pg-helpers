import { isEmpty } from "lodash-es"

import { PoolOrClient } from "../types"
import normalizeInput from "./normalize-input"
import { QueryOptions, SQLInput } from "./types"
import variablesAreProvided from "./variables-are-provided"
import determineSQLAndParams from "./determine-sql-and-params"

export * from "./types"

export const query =
	(client: PoolOrClient) =>
		(sqlInput: SQLInput) =>
			async <T>(input?: QueryOptions<T>) => {
				const { sql, log, parse, variables } =
					normalizeInput(sqlInput, input)

				if (log?.variables) {
					console.log(variables)
				}

				if (variablesAreProvided(sql, variables)) {
					const { sqlWithValues, params } =
						determineSQLAndParams(sql, variables)

					if (log?.sql) {
						console.log(sqlWithValues)
					}

					try {
						const result =
							await client.query<Record<string, unknown>>(
								sqlWithValues,
								isEmpty(params) ? undefined : params,
							)

						if (log?.result) {
							console.log(result.rows)
						}

						return parse(result)
					} catch (err) {
						if (process.env.NODE_ENV === "development") {
							throw err
						} else {
							throw new Error("Database Error")
						}
					}
				} else {
					throw new TypeError("Invalid query arguments")
				}
			}