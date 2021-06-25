import type {
	Pool,
	PoolClient,
	QueryResult as ResultBase,
} from "pg"

export type Client =
	Pool | PoolClient

export type Parse<T> =
	(res: Result) => T

export type Row =
	Record<string, unknown>

export type Result<T = Row> =
	ResultBase<T>

export interface SearchOptions {
	value: string,
	exact: boolean,
	tableName: string,
	columnName: string,
	columnNames: string[],
}

export interface IsUniqueOptions {
	value: string,
	table: string,
	column: string,
}

export interface QueryOptionsLog {
	var?: boolean,
	sql?: boolean,
	res?: boolean,
}

export interface QueryOptions<T> {
	parse?: Parse<T>,
	log?: QueryOptionsLog,
	variables?: VariableInput,
}

export interface Variable {
	key: string,
	string?: boolean,
	value: VariableType,
	parameterized?: boolean,
}

export type VariableType = string | number | boolean | null

export type VariableInput = Variable[] | Record<string, VariableType>