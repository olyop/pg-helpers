import { isArray, isBoolean, isNull, isString, isUndefined } from "lodash-es";

import { VariableType } from "../types.js";
import { Variable } from "./types.js";

const determineSQLAndParams = (sql: string, variables?: Variable[]) => {
	const paramaters: VariableType[] = [];

	const sqlWithValues =
		variables?.reduce((query, { key, value, parameterized }) => {
			let computedValue: VariableType;

			if (parameterized) {
				paramaters.push(value);
				computedValue = `$${paramaters.length}`;
			} else {
				if (isUndefined(value) || isNull(value)) {
					computedValue = "NULL";
				} else if (isArray(value)) {
					computedValue = value.join(", ");
				} else if (isString(value)) {
					computedValue = `'${value}'`;
				} else if (isBoolean(value)) {
					computedValue = value ? "TRUE" : "FALSE";
				} else {
					computedValue = value.toString();
				}
			}

			return query.replace(new RegExp(`{{ ${key} }}`, "gi"), computedValue);
		}, sql) || sql;

	return {
		paramaters,
		sqlWithValues,
	};
};

export default determineSQLAndParams;
