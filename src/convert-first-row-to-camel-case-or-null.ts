import { Result } from "./types";
import { getResultRowCount } from "./get-result-row-count";
import { convertFirstRowToCamelCase } from "./convert-first-row-to-camel-case";

export const convertFirstRowToCamelCaseOrNull =
	<T>() =>
	(result: Result) => {
		if (getResultRowCount(result) === 0) {
			return null;
		} else {
			return convertFirstRowToCamelCase<T>()(result);
		}
	};
