import { exists } from "./exists"
import { Client, IsUniqueOptions } from "./types"

export const isUnique =
	(client: Client) =>
		async ({ value, table, column }: IsUniqueOptions) => {
			const res = await exists(client)({ table, value, column })
			return !res
		}