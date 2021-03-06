import { Variable } from "./types"
import getVariableKeys from "./get-variable-keys"

const variablesAreProvided =
	(sql: string, variables: Variable[]) => {
		const keys = getVariableKeys(sql)
		return variables
			.map(({ key, value }) => keys.includes(key) && value !== undefined)
			.every(Boolean)
	}

export default variablesAreProvided