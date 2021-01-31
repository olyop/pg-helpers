import type { Pool, PoolClient, QueryResult } from "pg"

export type Client = Pool | PoolClient

export type QueryRes<T = Record<string, unknown>> = QueryResult<T>

export type Parse<T> = (res: QueryRes) => T

export interface Variable {
	key: string,
	string?: boolean,
	parameterized?: boolean,
	value: string | number | boolean | null,
}