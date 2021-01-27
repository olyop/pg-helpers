import { mapKeys, camelCase } from "lodash"

export const convertToCamelCase =
	<T>() => (obj: Record<string, unknown>) =>
		(mapKeys(obj, (_, key) => camelCase(key)) as unknown) as T