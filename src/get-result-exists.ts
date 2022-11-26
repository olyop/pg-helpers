import { getResultRows } from "./get-result-rows";
import { Result } from "./types";

export const getResultExists = (result: Result) => getResultRows(result)[0]?.exists || false;
