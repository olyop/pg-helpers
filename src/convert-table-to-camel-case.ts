import { Result } from "./types";
import { getResultRows } from "./get-result-rows";
import { convertRowToCamelCase } from "./convert-row-to-camel-case";

export const convertTableToCamelCase =
	<T>() =>
	(result: Result) =>
		getResultRows(result).map(convertRowToCamelCase<T>());
