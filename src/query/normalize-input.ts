import identity from "lodash-es/identity";
import isArray from "lodash-es/isArray";
import isUndefined from "lodash-es/isUndefined";

import {
	Parse,
	QueryOptions,
	QueryOptionsLog,
	QueryOptionsParse,
	QueryOptionsVariables,
	SQLInput,
	Variable,
} from "./types";

const normalizeInput = <T>(
	sqlInput: SQLInput,
	input?: QueryOptions<T>,
): QueryOptionsNormalized<T> => {
	const sql = sqlInput.toString();
	const parseDefault = identity as Parse<T>;

	if (isUndefined(input)) {
		return {
			sql,
			parse: parseDefault,
		};
	} else {
		return {
			sql,
			log: input.log,
			parse: input.parse || parseDefault,
			variables:
				input.variables &&
				(isArray(input.variables)
					? input.variables
					: Object.entries(input.variables).map(([key, value]) => ({
							key,
							value: isArray(value) ? value[0] : value,
							...(isArray(value) ? value[1] : {}),
					  }))),
		};
	}
};

export interface QueryOptionsNormalized<T>
	extends QueryOptionsLog,
		QueryOptionsParse<T>,
		QueryOptionsVariables<Variable[]> {
	sql: string;
}

export default normalizeInput;
