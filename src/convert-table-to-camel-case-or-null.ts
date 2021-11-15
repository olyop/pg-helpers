import { Result } from "./types"
import { convertTableToCamelCase } from "./convert-table-to-camel-case"

export const convertTableToCamelCaseOrNull =
	<T>() =>
		(result: Result) => {
			if (result.rowCount === 0) {
				return null
			} else {
				return convertTableToCamelCase<T>()(result)
			}
		}