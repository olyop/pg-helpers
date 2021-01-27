import pipe from "@oly_op/pipe"
import { isUndefined } from "lodash"

import { QueryRes } from "./types"
import { getResRows } from "./getResRows"
import { convertToCamelCase } from "./convertToCamelCase"

const checkForNullResult =
	(res: Record<string, unknown>[]) =>
		(isUndefined(res) ? [] : res)

export const parseRow =
	<T>() => (res: QueryRes) =>
		pipe(
			getResRows,
			checkForNullResult,
			obj => obj[0],
			convertToCamelCase<T>(),
		)(res)