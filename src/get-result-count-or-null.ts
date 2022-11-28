import { getResultCount } from "./get-result-count";
import { Result, Row } from "./types";

export const getResultCountOrNull = (result: Result<Row>) => {
	const resultCount = getResultCount(result);
	return resultCount === 0 ? null : resultCount;
};
