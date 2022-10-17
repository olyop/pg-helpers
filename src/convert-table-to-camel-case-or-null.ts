import { Result } from "./types";
import { getResultRowCount } from "./get-result-row-count";
import { convertTableToCamelCase } from "./convert-table-to-camel-case";

export const convertTableToCamelCaseOrNull =
	<T>() =>
	(result: Result) => {
		if (getResultRowCount(result) === 0) {
			return null;
		} else {
			return convertTableToCamelCase<T>()(result);
		}
	};
