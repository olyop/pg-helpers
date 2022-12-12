import { getResultSum } from "./get-result-sum";
import { Result, Row } from "./types";

export const getResultSumOrNull = (result: Result<Row>) => {
	const sum = getResultSum(result);
	if (sum === 0) {
		return null;
	} else {
		return sum;
	}
};
