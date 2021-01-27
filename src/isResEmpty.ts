import pipe from "@oly_op/pipe"
import { isEmpty } from "lodash"

import { QueryRes } from "./types"
import { getResRows } from "./getResRows"

export const isResEmpty =
	(res: QueryRes) =>
		pipe(getResRows, isEmpty)(res)