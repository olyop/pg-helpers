import { Client } from "./types"
import { exists } from "./exists"

export const isUnique =
	(client: Client) =>
		async ({ value, table, column }: IsUniqueInput) => {
			const res = await exists(client)({ table, value, column })
			return !res
		}

export interface IsUniqueInput {
	value: string,
	table: string,
	column: string,
}