import isUndefined from "lodash-es/isUndefined";

import { Variable } from "./types";
import getVariableKeys from "./get-variable-keys";

const checkIfVariableIsProvided =
	(keys: string[]) =>
	({ key, value }: Variable) =>
		!isUndefined(value) && keys.includes(key);

const variablesAreProvided = (sql: string, variables?: Variable[]) => {
	if (isUndefined(variables)) {
		return true;
	} else {
		const keys = getVariableKeys(sql);
		const areVariablesProvided = variables.map(checkIfVariableIsProvided(keys)).every(Boolean);
		if (areVariablesProvided) {
			return true;
		} else {
			if (process.env.NODE_ENV === "development") {
				console.log(`Variables are not provided for the following keys: ${keys.toString()}`);
			}
			return false;
		}
	}
};

export default variablesAreProvided;
