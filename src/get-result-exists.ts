import { getResultRows } from "./get-result-rows";
import { Result, RowExists } from "./types";

export const getResultExists = (result: Result<RowExists>) =>
	getResultRows(result)[0]?.exists || false;
