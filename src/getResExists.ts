import { QueryRes } from "./types"
import { getResRows } from "./getResRows"

export const getResExists =
	(res: QueryRes) =>
		getResRows(res)[0].exists as boolean