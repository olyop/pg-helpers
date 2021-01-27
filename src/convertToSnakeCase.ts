import { mapKeys, snakeCase } from "lodash"

export const convertToSnakeCase =
	<T>(obj: Record<string, unknown>) =>
		(mapKeys(obj, (_, key) => snakeCase(key)) as unknown) as T