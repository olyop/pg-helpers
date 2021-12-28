import type { Pool, PoolClient, QueryResult as ResultBase } from "pg"

export type PoolOrClient =
	Pool | PoolClient

export interface Row extends Record<string, unknown>{
	exists?: boolean,
}

export type Result<T = Row> =
	ResultBase<T>