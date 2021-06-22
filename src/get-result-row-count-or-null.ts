import pipe from "@oly_op/pipe"

import { getResultRowCount } from "./get-result-row-count"

export const getResultRowCountOrNull =
	pipe(
		getResultRowCount,
		rowCount => (rowCount === 0 ? null : rowCount),
	)