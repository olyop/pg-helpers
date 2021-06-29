import { isArray, isUndefined } from "lodash"

import { Variable, VariableInput } from "./types"

const normalizeVariables =
	(variables?: VariableInput) => (
		isUndefined(variables) ?
			[] : (
				isArray(variables) ?
					variables :
					Object
						.entries(variables)
						.map<Variable>(({ 0: key, 1: value }) => ({ key, value }))
			)
	)

export default normalizeVariables