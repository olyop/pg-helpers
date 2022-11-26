import head from "lodash-es/head";

import { convertRowToCamelCase } from "./convert-row-to-camel-case";
import { getResultRows } from "./get-result-rows";
import { Result } from "./types";

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
