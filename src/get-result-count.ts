import { getResultRows } from "./get-result-rows";
import { Result, RowCount } from "./types";

export const getResultCount = (result: Result<RowCount>) => getResultRows(result)[0]?.count || 0;
