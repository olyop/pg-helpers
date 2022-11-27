import { getResultRows } from "./get-result-rows";
import { Result, Row } from "./types";

export const getResultCountOrNull = (result: Result<Row>) =>
	getResultRows(result)[0]?.count || null;
