import mapKeys from "lodash-es/mapKeys";

import { convertStringToCamelCase } from "./convert-string-to-camel-case";
import { RowBase } from "./types";

export const convertRowToCamelCase =
	<T>() =>
	(object: RowBase) =>
		mapKeys(object, (_, key: string) => convertStringToCamelCase(key)) as unknown as T;
