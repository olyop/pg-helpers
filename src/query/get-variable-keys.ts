const getVariableKeys = (sql: string) => {
	const keys = new Set<string>();

	// scan flags
	let inCurly = false;
	let tempKey = "";
	let inVariable = false;

	// scan sql
	for (const character of sql) {
		if (inVariable) {
			if (character === " ") {
				keys.add(tempKey);
				inVariable = false;
				tempKey = "";
			} else {
				tempKey += character;
			}
		} else if (inCurly) {
			if (character === " ") {
				inVariable = true;
			} else if (character === "}") {
				inCurly = false;
			}
		} else if (character === "{") {
			inCurly = true;
		}
	}

	return keys;
};

export default getVariableKeys;
