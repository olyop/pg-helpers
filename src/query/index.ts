import { isEmpty } from "lodash-es"

import { QueryOptions } from "./types"
import { PoolOrClient } from "../types"
import normalizeInput from "./normalize-input"
import variablesAreProvided from "./variables-are-provided"
import determineSQLAndParams from "./determine-sql-and-params"

export * from "./types"

export const query =
	(pg: PoolOrClient) =>
		(sql: string) =>
			async <T>(input?: QueryOptions<T>) => {
				const { log, parse, variables } =
					normalizeInput(input)

				if (log?.variables) console.log(variables)

				if (variablesAreProvided(sql, variables)) {
					const { sqlWithValues, params } =
						determineSQLAndParams(sql, variables)

					if (log?.sql) console.log(sqlWithValues)

					try {
						const result =
							await pg.query<Record<string, unknown>>(
								sqlWithValues,
								isEmpty(params) ? undefined : params,
							)

						if (log?.result) console.log(result.rows)

						return parse(result)
					} catch (err) {
						if (process.env["NODE_ENV"] === "development") console.error(err)
						throw err
					}
				} else {
					throw new TypeError("Invalid query arguments")
				}
			}