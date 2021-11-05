import pipe from "@oly_op/pipe"
import { map } from "lodash/fp"
import { isEmpty } from "lodash"

import { getResultRows } from "./get-result-rows"
import { convertRowToCamelCase } from "./convert-row-to-camel-case"

export const convertTableToCamelCaseOrNull =
	<T>() =>
		pipe(
			getResultRows,
			map(convertRowToCamelCase<T>()),
			result => (
				isEmpty(result) ?
					null :
					result
			),
		)