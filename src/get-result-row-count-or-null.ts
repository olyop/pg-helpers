import { getResultRowCount } from "./get-result-row-count.js";
import { Result } from "./types.js";

export const getResultRowCountOrNull = (result: Result) => {
	const rowCount = getResultRowCount(result);
	return rowCount === 0 ? null : rowCount;
};
