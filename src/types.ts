import type { Pool, PoolClient, QueryResult as ResultBase } from "pg"

export type PoolOrClient =
	Pool | PoolClient

export type Row =
	Record<string, unknown>

export type Result<T = Row> =
	ResultBase<T>