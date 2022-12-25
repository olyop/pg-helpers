import { convertRowToCamelCase } from "./convert-row-to-camel-case.js";
import { getResultRows } from "./get-result-rows.js";
import { Result } from "./types.js";

export const convertTableToCamelCase =
	<T>() =>
	(result: Result) =>
		getResultRows(result).map(convertRowToCamelCase<T>());
