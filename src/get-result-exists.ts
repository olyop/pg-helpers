import { isEmpty } from "lodash"

import { ResultFunction, RowExists } from "./types"
import { getResultRows } from "./get-result-rows"

export const getResultExists: ResultFunction<boolean> =
	result => {
		const rows = getResultRows(result)
		if (isEmpty(rows)) {
			return false
		} else {
			const row = rows[0] as unknown as RowExists
			return row.exists
		}
	}