import { exists } from "./exists"
import { PoolOrClient } from "./types"

export interface IsUniqueOptions {
	value: string,
	table: string,
	column: string,
}

export const isUnique =
	(client: PoolOrClient) =>
		async ({ value, table, column }: IsUniqueOptions) => {
			const res = await exists(client)({ table, value, column })
			return !res
		}