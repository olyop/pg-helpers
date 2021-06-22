import { mapKeys, camelCase } from "lodash"

import { Row } from "./types"

export const convertRowToCamelCase =
	<T>() =>
		(object: Row) =>
			(mapKeys(object, (_, key: string) => {
				const value = camelCase(key)
				if (value.includes("Id")) {
					return value.replace(/Id/gi, "ID")
				} else {
					return value
				}
			}) as unknown) as T