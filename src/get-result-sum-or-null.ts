import { getResultRows } from "./get-result-rows";
import { Result, Row } from "./types";

export const getResultSumOrNull = (result: Result<Row>) => getResultRows(result)[0]?.sum || null;
