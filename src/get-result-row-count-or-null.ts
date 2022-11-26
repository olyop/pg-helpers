import { getResultRowCount } from "./get-result-row-count";
import { Result } from "./types";

export const getResultRowCountOrNull = (result: Result) => {
	const rowCount = getResultRowCount(result);
	return rowCount === 0 ? null : rowCount;
};
