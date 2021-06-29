import { Result } from "../types"

export type VariableType = string | number | boolean | null

export interface Variable {
	key: string,
	value: VariableType,
	parameterized?: boolean,
}

export type VariableInput = Variable[] | Record<string, VariableType>

export type Parse<T> = (result: Result) => T

export interface QueryOptionsLog {
	sql?: boolean,
	result?: boolean,
	variables?: boolean,
}

export interface QueryOptions<T> {
	parse?: Parse<T>,
	log?: QueryOptionsLog,
	variables?: VariableInput,
}