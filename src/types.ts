import type { Client, Pool, PoolClient, QueryResult as ResultBase } from "pg";

export type PoolOrClient = Pool | PoolClient | Client;

export type RowBase = Record<string, unknown>;

export interface RowCount extends RowBase {
	count?: number;
}

export interface RowExists extends RowBase {
	exists?: boolean;
}

export interface Row extends RowCount, RowExists, RowBase {}

export type Result<T extends RowBase = RowBase> = ResultBase<T>;

export type VariableType = string | number | boolean | null | undefined;
