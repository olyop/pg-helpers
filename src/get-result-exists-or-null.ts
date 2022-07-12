import { Result } from "./types"
import { getResultRows } from "./get-result-rows"

export const getResultExistsOrNull =
	(result: Result) =>
		getResultRows(result)[0]?.exists || null