import { isNull } from "lodash"

import { Variable } from "./types"

const determineReplaceValue =
	(params: string[]) =>
		({ value, parameterized = false }: Variable) => {
			const val = isNull(value) ? "null" : value.toString()
			if (parameterized) {
				params.push(val)
				return `$${params.length}`
			} else {
				return val
			}
		}

export default determineReplaceValue