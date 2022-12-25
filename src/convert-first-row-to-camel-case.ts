import { head } from "lodash-es";

import { convertRowToCamelCase } from "./convert-row-to-camel-case.js";
import { getResultRows } from "./get-result-rows.js";
import { Result } from "./types.js";

export const convertFirstRowToCamelCase =
	<T>() =>
	(result: Result) => {
		const rows = getResultRows(result);
		const firstRow = head(rows);
		if (firstRow) {
			return convertRowToCamelCase<T>()(firstRow);
		} else {
			throw new Error("Cannot convert first row table is empty");
		}
	};
