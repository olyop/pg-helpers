import type { Client, Pool, PoolClient, QueryResult as ResultBase } from "pg";

export type PoolOrClient = Pool | PoolClient | Client;

export type RowBase = Record<string, unknown>;

export interface Row extends RowBase {
	count?: number;
	exists?: boolean;
}

export type Result<T extends Row = Row> = ResultBase<T>;

export type VariableType = Date | string | number | boolean | null | undefined;
