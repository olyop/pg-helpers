import pipe from "@oly_op/pipe"

import { Row } from "./types"
import { getResultRows } from "./get-result-rows"
import { convertRowToCamelCase } from "./convert-row-to-camel-case"

const head =
	(result: Row[]) =>
		result[0]

export const convertFirstRowToCamelCase =
	<T>() =>
		pipe(
			getResultRows,
			head,
			convertRowToCamelCase<T>(),
		)