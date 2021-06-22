import pipe from "@oly_op/pipe"
import { map } from "lodash/fp"

import { getResultRows } from "./get-result-rows"
import { convertRowToCamelCase } from "./convert-row-to-camel-case"

export const convertTableToCamelCase =
	<T>() =>
		pipe(
			getResultRows,
			map(convertRowToCamelCase<T>()),
		)