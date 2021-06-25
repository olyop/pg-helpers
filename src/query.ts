import {
	uniq,
	isNull,
	isEmpty,
	isArray,
	identity,
	isUndefined,
} from "lodash"

import {
	Parse,
	Client,
	Variable,
	QueryOptions,
	VariableInput,
} from "./types"

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
	<T>(input?: QueryOptions<T>) =>
		(isUndefined(input) ? {
			parse: identity as Parse<T>,
		} : input)

const normalizeVariables =
	(variables?: VariableInput) => (
		isUndefined(variables) ?
			[] : (
				isArray(variables) ?
					variables :
					Object
						.entries(variables)
						.map<Variable>(({ 0: key, 1: value }) => ({ key, value }))
			)
	)

export const query =
	(client: Client) =>
		(sql: string) =>
			async <T>(input?: QueryOptions<T>) => {
				const normalizedInput = normalizeInput(input)
				const { log, parse, variables } = normalizedInput
				const normalizedVariables = normalizeVariables(variables)
				if (log?.var) console.log(variables)
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