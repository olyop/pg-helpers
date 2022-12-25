import { convertFirstRowToCamelCase } from "./convert-first-row-to-camel-case.js";
import { getResultRowCount } from "./get-result-row-count.js";
import { Result } from "./types.js";

export const convertFirstRowToCamelCaseOrNull =
	<T>() =>
	(result: Result) => {
		if (getResultRowCount(result) === 0) {
			return null;
		} else {
			return convertFirstRowToCamelCase<T>()(result);
		}
	};
