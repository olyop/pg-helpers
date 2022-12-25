import { isUndefined } from "lodash-es";

import getVariableKeys from "./get-variable-keys.js";
import { Variable } from "./types.js";

const checkIfVariableIsProvided =
	(keys: Set<string>) =>
	({ key, value }: Variable) =>
		!isUndefined(value) && keys.has(key);

const variablesAreProvided = (sql: string, variables: Variable[]) => {
	const keys = getVariableKeys(sql);
	const areVariablesProvided = variables.map(checkIfVariableIsProvided(keys)).every(Boolean);
	if (areVariablesProvided) {
		return true;
	} else {
		return keys.toString();
	}
};

export default variablesAreProvided;
