import { convertTableToCamelCase } from "./convert-table-to-camel-case.js";
import { getResultRowCount } from "./get-result-row-count.js";
import { Result } from "./types.js";

export const convertTableToCamelCaseOrNull =
	<T>() =>
	(result: Result) => {
		if (getResultRowCount(result) === 0) {
			return null;
		} else {
			return convertTableToCamelCase<T>()(result);
		}
	};
