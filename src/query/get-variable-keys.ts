import uniq from "lodash-es/uniq";

const getVariableKeys = (sql: string) => {
	const keys: string[] = [];

	// scan flags
	let inCurly = false;
	let tempKey = "";
	let inVariable = false;

	// scan sql
	for (const character of sql) {
		if (inVariable) {
			if (character === " ") {
				keys.push(tempKey);
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

	return uniq(keys);
};

export default getVariableKeys;
