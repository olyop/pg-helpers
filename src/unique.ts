import { exists } from "./exists"
import { PoolOrClient } from "./types"

export interface IsUniqueOptions {
	value: string,
	table: string,
	column: string,
}

export const isUnique =
	(pg: PoolOrClient) =>
		async ({ value, table, column }: IsUniqueOptions) => {
			const res = await exists(pg)({ table, value, column })
			return !res
		}