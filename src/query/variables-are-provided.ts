import isUndefined from "lodash-es/isUndefined";

import getVariableKeys from "./get-variable-keys";
import { Variable } from "./types";

const IS_DEV = process.env.NODE_ENV === "development";

const checkIfVariableIsProvided =
	(keys: string[]) =>
	({ key, value }: Variable) =>
		!isUndefined(value) && keys.includes(key);

const variablesAreProvided = (sql: string, variables?: Variable[]) => {
	if (IS_DEV) {
		if (isUndefined(variables)) {
			return true;
		} else {
			const keys = getVariableKeys(sql);
			const areVariablesProvided = variables.map(checkIfVariableIsProvided(keys)).every(Boolean);
			if (areVariablesProvided) {
				return true;
			} else {
				console.error(`Variables are not provided for the following keys: ${keys.toString()}`);
				return false;
			}
		}
	} else {
		return true;
	}
};

export default variablesAreProvided;
