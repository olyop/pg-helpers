import { PoolOrClient } from "./types"
import { exists, ExistsOptionsBase } from "./exists"

export interface IsUniqueOptions
	extends ExistsOptionsBase {
	value: string,
}

export const isUnique =
	(client: PoolOrClient) =>
		async ({ value, table, column, log }: IsUniqueOptions) =>
			!(await exists(client)({ log, table, value, column }))