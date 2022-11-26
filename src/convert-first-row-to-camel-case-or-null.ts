import { convertFirstRowToCamelCase } from "./convert-first-row-to-camel-case";
import { getResultRowCount } from "./get-result-row-count";
import { Result } from "./types";

export const convertFirstRowToCamelCaseOrNull =
	<T>() =>
	(result: Result) => {
		if (getResultRowCount(result) === 0) {
			return null;
		} else {
			return convertFirstRowToCamelCase<T>()(result);
		}
	};
