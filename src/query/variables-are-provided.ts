import { isUndefined } from "lodash-es";

import { Variable } from "./types";
import getVariableKeys from "./get-variable-keys";

const variablesAreProvided = (sql: string, variables?: Variable[]) => {
	if (isUndefined(variables)) {
		return true;
	} else {
		const keys = getVariableKeys(sql);
		return variables
			.map(({ key, value }) => !isUndefined(value) && keys.includes(key))
			.every(Boolean);
	}
};

export default variablesAreProvided;
