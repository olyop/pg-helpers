import isUndefined from "lodash-es/isUndefined";

import getVariableKeys from "./get-variable-keys";
import { Variable } from "./types";

const checkIfVariableIsProvided =
	(keys: Set<string>) =>
	({ key, value }: Variable) =>
		!isUndefined(value) && keys.has(key);

const variablesAreProvided = (sql: string, variables?: Variable[]) => {
	if (isUndefined(variables)) {
		return true;
	} else {
		const keys = getVariableKeys(sql);
		const areVariablesProvided = variables.map(checkIfVariableIsProvided(keys)).every(Boolean);
		if (areVariablesProvided) {
			return true;
		} else {
			return keys.toString();
		}
	}
};

export default variablesAreProvided;
