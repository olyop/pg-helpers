import { uniq, isNull, identity, isEmpty, isArray } from "lodash"

import { Client, Parse, Variable, QueryOptions, QueryInput } from "./types"

export const getVariableKeys =
	(sql: string) => {
		const keys: string[] = []

		// scan flags
		let inCurly = false
		let tempKey = ""
		let inVariable = false

		// scan sql
		for (const char of sql) {
			if (inVariable) {
				if (char === " ") {
					keys.push(tempKey)
					inVariable = false
					tempKey = ""
				} else {
					tempKey += char
				}
			} else if (inCurly) {
				if (char === " ") {
					inVariable = true
				} else if (char === "}") {
					inCurly = false
				}
			} else if (char === "{") {
				inCurly = true
			}
		}

		return uniq(keys)
	}

const variablesAreProvided =
	(sql: string, variables: Variable[]) => {
		const keys = getVariableKeys(sql)
		return variables
			.map(({ key, value }) => keys.includes(key) && value !== undefined)
			.every(Boolean)
	}

const determineReplaceValue =
	(params: string[]) =>
		({ value, string = true, parameterized = false }: Variable) => {
			const val = isNull(value) ? "null" : value.toString()
			if (parameterized) {
				params.push(val)
				return `$${params.length}`
			} else if (string) {
				return `'${val}'`
			} else {
				return val
			}
		}

const determineSQLAndParams =
	(sql: string, variables: Variable[]) => {
		const params: string[] = []
		const SQLWithValues = variables.reduce(
			(query, variable) => query.replace(
				new RegExp(`{{ ${variable.key} }}`, "gi"),
				determineReplaceValue(params)(variable),
			),
			sql,
		)
		return {
			params,
			SQLWithValues,
		}
	}

const normalizeInput =
	<T>(input: QueryInput<T>): QueryOptions<T> =>
		(isArray(input) ? {
			variables: input,
			parse: identity as Parse<T>,
		} : input)

export const query =
	(client: Client) =>
		(sql: string) =>
			async <T>(input: QueryInput<T>) => {
				const { parse, log, variables = [] } = normalizeInput(input)
				if (log?.var) console.log(variables)
				if (variablesAreProvided(sql, variables)) {
					const { SQLWithValues, params } =
						determineSQLAndParams(sql, variables)
					if (log?.sql) {
						console.log(SQLWithValues)
					}
					try {
						const result = await client.query(
							SQLWithValues,
							isEmpty(params) ? undefined : params,
						)
						if (log?.res) {
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