import { Result } from "../types"

export type SQLInput =
	string | Buffer

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

export interface QueryLog {
	sql?: boolean,
	result?: boolean,
	variables?: boolean,
}

export interface QueryOptionsLog {
	log?: QueryLog,
}

export interface QueryOptionsParse<T> {
	parse: Parse<T>,
}

export interface QueryOptionsVariables<V> {
	variables?: V,
}

export interface QueryOptions<T>
	extends
	QueryOptionsLog,
	Partial<QueryOptionsParse<T>>,
	QueryOptionsVariables<VariableInput> {}