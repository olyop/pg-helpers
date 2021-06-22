import pipe from "@oly_op/pipe"

import { Result } from "./types"
import { getResultRowCount } from "./get-result-row-count"

export const getResultRowCountOrNull =
	(result: Result) =>
		pipe(
			getResultRowCount,
			rowCount => (rowCount === 0 ? null : rowCount),
		)