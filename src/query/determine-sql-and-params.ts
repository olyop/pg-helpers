import { Variable } from "./types";
import determineReplaceValue from "./determine-replace-value";

const determineSQLAndParams = (sql: string, variables?: Variable[]) => {
	const paramaters: string[] = [];

	const sqlWithValues =
		variables?.reduce(
			(query, variable) =>
				query.replace(
					new RegExp(`{{ ${variable.key} }}`, "gi"),
					determineReplaceValue(paramaters)(variable),
				),
			sql,
		) || sql;

	return {
		paramaters,
		sqlWithValues,
	};
};

export default determineSQLAndParams;
