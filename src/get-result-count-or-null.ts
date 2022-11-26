import { getResultRows } from "./get-result-rows";
import { Result } from "./types";

export const getResultCountOrNull = (result: Result) => getResultRows(result)[0]?.count || null;
