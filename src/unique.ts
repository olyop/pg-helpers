import { PoolOrClient } from "./types"
import { exists, ExistsQueryOptions } from "./exists"

type IsUniqueOptions =
	ExistsQueryOptions

export const isUnique =
	(client: PoolOrClient) =>
		async ({ value, table, column, log }: IsUniqueOptions) =>
			!(await exists(client)({ log, table, value, column }))