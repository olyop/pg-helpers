import { getResultCount } from "./get-result-count.js";
import { Result, Row } from "./types.js";

export const getResultCountOrNull = (result: Result<Row>) => {
	const count = getResultCount(result);
	if (count === 0) {
		return null;
	} else {
		return count;
	}
};
