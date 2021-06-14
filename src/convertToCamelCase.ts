import { mapKeys, camelCase } from "lodash"

export const convertToCamelCase =
	<T>() =>
		(obj: Record<string, unknown>) =>
			(mapKeys(obj, (_, key: string) => {
				const value = camelCase(key)
				if (value.includes("Id")) {
					return value.replace(/Id/gi, "ID")
				} else {
					return value
				}
			}) as unknown) as T