import { Result } from "./types";
import { getResultRows } from "./get-result-rows";

export const getResultCountOrNull = (result: Result) => getResultRows(result)[0]?.count || null;
