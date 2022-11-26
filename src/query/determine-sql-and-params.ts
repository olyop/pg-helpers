import "node:path";

import { isBoolean, isNull, isString, isUndefined } from "lodash-es";

import { VariableType } from "../types";
import { Variable } from "./types";

const determineSQLAndParams = (sql: string, variables?: Variable[]) => {
	const paramaters: VariableType[] = [];

	const sqlWithValues =
		variables?.reduce(
			(query, { key, value, parameterized = false, surroundStringWithCommas = true }) => {
				let computedValue: VariableType;

				if (parameterized) {
					paramaters.push(value);
					return `$${paramaters.length}`;
				} else {
					if (isUndefined(value) || isNull(value)) {
						computedValue = "NULL";
					} else if (isString(value)) {
						computedValue = surroundStringWithCommas ? `'${value}'` : value;
					} else if (isBoolean(value)) {
						computedValue = value ? "TRUE" : "FALSE";
					} else {
						computedValue = value.toString();
					}
				}

				return query.replace(new RegExp(`{{ ${key} }}`, "gi"), computedValue);
			},
			sql,
		) || sql;

	return {
		paramaters,
		sqlWithValues,
	};
};

export default determineSQLAndParams;
