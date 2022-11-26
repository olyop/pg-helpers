import { convertTableToCamelCase } from "./convert-table-to-camel-case";
import { getResultRowCount } from "./get-result-row-count";
import { Result } from "./types";

export const convertTableToCamelCaseOrNull =
	<T>() =>
	(result: Result) => {
		if (getResultRowCount(result) === 0) {
			return null;
		} else {
			return convertTableToCamelCase<T>()(result);
		}
	};
