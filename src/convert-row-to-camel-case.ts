import mapKeys from "lodash-es/mapKeys";

import { Row } from "./types";
import { convertStringToCamelCase } from "./convert-string-to-camel-case";

export const convertRowToCamelCase =
	<T>() =>
	(object: Row) =>
		mapKeys(object, (_, key: string) => convertStringToCamelCase(key)) as unknown as T;
