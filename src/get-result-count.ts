import isUndefined from "lodash-es/isUndefined";

import { getResultRows } from "./get-result-rows";
import { Result, Row } from "./types";

export const getResultCount = (result: Result<Row>) => {
	const rows = getResultRows(result);
	const firstRow = rows[0];
	if (isUndefined(firstRow)) {
		return 0;
	} else {
		const count = Number.parseInt(firstRow.count, 10);
		if (Number.isNaN(count)) {
			return 0;
		} else {
			return count;
		}
	}
};
