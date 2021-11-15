import { Result } from "./types"
import { convertFirstRowToCamelCase } from "./convert-first-row-to-camel-case"

export const convertFirstRowToCamelCaseOrNull =
	<T>() =>
		(result: Result) => {
			if (result.rowCount === 0) {
				return null
			} else {
				return convertFirstRowToCamelCase<T>()(result)
			}
		}