import { getResultRows } from "./get-result-rows";
import { Result } from "./types";

export const getResultExistsOrNull = (result: Result) => getResultRows(result)[0]?.exists || null;
