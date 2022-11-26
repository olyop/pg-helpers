import mapKeys from "lodash-es/mapKeys";

import { convertStringToCamelCase } from "./convert-string-to-camel-case";
import { Row } from "./types";

export const convertRowToCamelCase =
	<T>() =>
	(object: Row) =>
		mapKeys(object, (_, key: string) => convertStringToCamelCase(key)) as unknown as T;
