import { convertRowToCamelCase } from "./convert-row-to-camel-case";
import { getResultRows } from "./get-result-rows";
import { Result } from "./types";

export const convertTableToCamelCase =
	<T>() =>
	(result: Result) =>
		getResultRows(result).map(convertRowToCamelCase<T>());
