import { getResultRows } from "./get-result-rows";
import { Result, Row } from "./types";

export const getResultExists = (result: Result<Row>) => {
	const rows = getResultRows(result);
	const firstRow = rows[0];
	if (firstRow) {
		return firstRow.exists;
	} else {
		return false;
	}
};
