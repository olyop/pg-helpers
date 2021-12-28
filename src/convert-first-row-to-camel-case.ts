import { head } from "lodash"

import { Result } from "./types"
import { getResultRows } from "./get-result-rows"
import { convertRowToCamelCase } from "./convert-row-to-camel-case"

export const convertFirstRowToCamelCase =
	<T>() =>
		(result: Result) => {
			const rows = getResultRows(result)
			const firstRow = head(rows)!
			return convertRowToCamelCase<T>()(firstRow)
		}