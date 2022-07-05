import { head } from "lodash-es"

import { Result } from "./types"
import { getResultRows } from "./get-result-rows"
import { convertRowToCamelCase } from "./convert-row-to-camel-case"

export const convertFirstRowToCamelCase =
	<T>() =>
		(result: Result) => {
			const rows = getResultRows(result)
			const firstRow = head(rows)
			if (firstRow) {
				return convertRowToCamelCase<T>()(firstRow)
			} else {
				throw new Error("Cannot convert first row table is empty")
			}
		}