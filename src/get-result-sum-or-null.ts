import { getResultSum } from "./get-result-sum.js";
import { Result, Row } from "./types.js";

export const getResultSumOrNull = (result: Result<Row>) => {
	const sum = getResultSum(result);
	if (sum === 0) {
		return null;
	} else {
		return sum;
	}
};
