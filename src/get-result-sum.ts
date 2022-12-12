import isUndefined from "lodash-es/isUndefined";

import { getResultRows } from "./get-result-rows";
import { Result, Row } from "./types";

export const getResultSum = (result: Result<Row>) => {
	const rows = getResultRows(result);
	const firstRow = rows[0];
	if (isUndefined(firstRow)) {
		return 0;
	} else {
		const sum = Number.parseInt(firstRow.sum, 10);
		if (Number.isNaN(sum)) {
			return 0;
		} else {
			return sum;
		}
	}
};
