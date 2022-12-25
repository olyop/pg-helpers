import { getResultRows } from "./get-result-rows.js";
import { Result, Row } from "./types.js";

export const getResultExists = (result: Result<Row>) => {
	const rows = getResultRows(result);
	const firstRow = rows[0];
	if (firstRow) {
		return firstRow.exists;
	} else {
		return false;
	}
};
