import type { Client, Pool, PoolClient, QueryResult as ResultBase } from "pg";

export type PoolOrClient = Pool | PoolClient | Client;

export interface Row extends Record<string, unknown> {
	count?: number;
	exists?: boolean;
}

export type Result<T extends Row = Row> = ResultBase<T>;
