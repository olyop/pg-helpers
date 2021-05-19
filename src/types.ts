import type { Pool, PoolClient, QueryResult } from "pg"

export type Client = Pool | PoolClient

export type QueryRes<T = Record<string, unknown>> = QueryResult<T>

export interface Variable {
	key: string,
	string?: boolean,
	parameterized?: boolean,
	value: string | number | boolean | null,
}

export interface QueryInputLog {
	var?: boolean,
	sql?: boolean,
	res?: boolean,
	err?: boolean,
}

export interface QueryInput<T> {
	sql: string,
	parse?: Parse<T>,
	log?: QueryInputLog,
	variables?: Variable[],
}

export type Parse<T> = (res: QueryRes) => T

export type Query<T> = (input: string | QueryInput<T>) => Promise<T>