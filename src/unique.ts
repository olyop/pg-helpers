import { PoolOrClient } from "./types";
import { exists, ExistsQueryOptions } from "./exists";

type IsUniqueOptions = ExistsQueryOptions;

export const isUnique = (pg: PoolOrClient) => async (options: IsUniqueOptions) =>
	!(await exists(pg)(options));
