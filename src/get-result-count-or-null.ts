import { getResultCount } from "./get-result-count";
import { Result, Row } from "./types";

export const getResultCountOrNull = (result: Result<Row>) => {
	const count = getResultCount(result);
	if (count === 0) {
		return null;
	} else {
		return count;
	}
};
