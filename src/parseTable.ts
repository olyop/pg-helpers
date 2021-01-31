import pipe from "@oly_op/pipe"
import { map } from "lodash/fp"

import { QueryRes } from "./types"
import { getResRows } from "./getResRows"
import { convertToCamelCase } from "./convertToCamelCase"

export const parseTable =
	<T>() => (res: QueryRes): T[] =>
		pipe(
			getResRows,
			map(convertToCamelCase<T>()),
		)(res)