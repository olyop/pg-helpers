import { Result } from "./types"
import { getResultRows } from "./get-result-rows"

export const getResultExists =
	(result: Result) =>
		getResultRows(result)[0].exists as boolean