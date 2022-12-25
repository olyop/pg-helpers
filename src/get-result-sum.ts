import { isUndefined } from "lodash-es";

import { getResultRows } from "./get-result-rows.js";
import { Result, Row } from "./types.js";

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
