import { Result } from "../types"

export type VariableType =
	string | number | boolean | null

export interface Variable {
	key: string,
	value: VariableType,
	parameterized?: boolean,
}

export type VariableInput =
	Variable[] | Record<string, VariableType>

export type Parse<T> =
	(result: Result) => T

export interface QueryOptionsLogOptions {
	sql?: boolean,
	result?: boolean,
	variables?: boolean,
}

export interface QueryOptionsLog {
	log?: QueryOptionsLogOptions,
}

export interface QueryOptionsParse<T> {
	parse: Parse<T>,
}

export interface QueryOptionsVariables<V> {
	variables?: V,
}

export interface QueryOptionsNormalized<T>
	extends
	QueryOptionsLog,
	QueryOptionsParse<T>,
	QueryOptionsVariables<Variable[]> {}

export interface QueryOptions<T>
	extends
	QueryOptionsLog,
	Partial<QueryOptionsParse<T>>,
	QueryOptionsVariables<VariableInput> {}