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

const normalizeSQL = (sql: SQLInput) => {
	if (Buffer.isBuffer(sql)) {
		return Buffer.toString();
	} else {
		return sql;
	}
};

const normalizeInput = <T>(sql: SQLInput, input?: QueryOptions<T>): QueryOptionsNormalized<T> =>
	isUndefined(input)
		? {
				sql: normalizeSQL(sql),
				parse: identity as Parse<T>,
		  }
		: {
				log: input.log,
				sql: normalizeSQL(sql),
				parse: input.parse || (identity as Parse<T>),
				variables:
					input.variables &&
					(isArray(input.variables)
						? input.variables
						: Object.entries(input.variables).map(([key, value]) => ({ key, value }))),
		  };

export interface QueryOptionsNormalized<T>
	extends QueryOptionsLog,
		QueryOptionsParse<T>,
		QueryOptionsVariables<Variable[]> {
	sql: string;
}

export default normalizeInput;
