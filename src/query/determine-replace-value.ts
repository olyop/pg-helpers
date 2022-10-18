import isNull from "lodash-es/isNull";

import { Variable } from "./types";

const determineReplaceValue =
	(params: string[]) =>
	({ value, parameterized = false }: Omit<Variable, "key">) => {
		const valueOrSQLNull = isNull(value) ? "NULL" : value.toString();
		if (parameterized) {
			params.push(valueOrSQLNull);
			return `$${params.length}`;
		} else {
			return valueOrSQLNull;
		}
	};

export default determineReplaceValue;
