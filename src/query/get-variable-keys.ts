import { uniq } from "lodash"

const getVariableKeys =
	(sql: string) => {
		const keys: string[] = []

		// scan flags
		let inCurly = false
		let tempKey = ""
		let inVariable = false

		// scan sql
		for (const char of sql) {
			if (inVariable) {
				if (char === " ") {
					keys.push(tempKey)
					inVariable = false
					tempKey = ""
				} else {
					tempKey += char
				}
			} else if (inCurly) {
				if (char === " ") {
					inVariable = true
				} else if (char === "}") {
					inCurly = false
				}
			} else if (char === "{") {
				inCurly = true
			}
		}

		return uniq(keys)
	}

export default getVariableKeys