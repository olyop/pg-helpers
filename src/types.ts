import type { Pool, PoolClient, QueryResult as ResultBase } from "pg"

export type PoolOrClient =
	Pool | PoolClient

export type Row =
	Record<string, unknown>

export interface RowExists {
	exists: boolean,
}

export type Result<T = Row> =
	ResultBase<T>

export type ResultFunction<T> =
	(result: Result) => T