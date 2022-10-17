import { Result } from "./types";
import { getResultRowCount } from "./get-result-row-count";

export const getResultRowCountOrNull = (result: Result) => {
	const rowCount = getResultRowCount(result);
	return rowCount === 0 ? null : rowCount;
};
