import { QueryRes } from "./types"

export const getRowCountOrNull =
	({ rowCount }: QueryRes) =>
		(rowCount === 0 ? null : rowCount)