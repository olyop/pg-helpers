import { getResultRows } from "./get-result-rows";
import { Result, RowExists } from "./types";

export const getResultExistsOrNull = (result: Result<RowExists>) =>
	getResultRows(result)[0]?.exists || null;
