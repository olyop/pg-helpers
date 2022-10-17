import { Result } from "./types";
import { getResultRows } from "./get-result-rows";

export const getResultCount = (result: Result) => getResultRows(result)[0]?.count || 0;
