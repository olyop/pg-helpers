import { mapKeys } from "lodash-es";

import { convertStringToCamelCase } from "./convert-string-to-camel-case.js";
import { RowBase } from "./types.js";

export const convertRowToCamelCase =
	<T>() =>
	(object: RowBase) =>
		mapKeys(object, (_, key: string) => convertStringToCamelCase(key)) as unknown as T;
