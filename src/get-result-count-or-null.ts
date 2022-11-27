import { getResultRows } from "./get-result-rows";
import { Result, RowCount } from "./types";

export const getResultCountOrNull = (result: Result<RowCount>) =>
	getResultRows(result)[0]?.count || null;
