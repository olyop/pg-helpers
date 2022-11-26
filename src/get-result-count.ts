import { getResultRows } from "./get-result-rows";
import { Result } from "./types";

export const getResultCount = (result: Result) => getResultRows(result)[0]?.count || 0;
