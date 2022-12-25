import { ExistsQueryOptions, exists } from "./exists/index.js";
import { PoolOrClient } from "./types.js";

type IsUniqueOptions = ExistsQueryOptions;

export const isUnique = (pg: PoolOrClient) => async (options: IsUniqueOptions) =>
	!(await exists(pg)(options));
