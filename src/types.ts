import type { Client, Pool, PoolClient, QueryResult as ResultBase } from "pg";

export type PoolOrClient = Pool | PoolClient | Client;

export type RowBase = Record<string, unknown>;

export interface RowSum extends RowBase {
	sum: string;
}

export interface RowCount extends RowBase {
	count: string;
}

export interface RowExists extends RowBase {
	exists: boolean;
}

export interface Row extends RowSum, RowCount, RowExists, RowBase {}

export type Result<T extends Row = Row> = ResultBase<T>;

export type VariableType = string[] | string | number | boolean | null | undefined;
