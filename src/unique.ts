import { ExistsQueryOptions, exists } from "./exists";
import { PoolOrClient } from "./types";

type IsUniqueOptions = ExistsQueryOptions;

export const isUnique = (pg: PoolOrClient) => async (options: IsUniqueOptions) =>
	!(await exists(pg)(options));
