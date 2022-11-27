import { getResultRows } from "./get-result-rows";
import { Result, Row } from "./types";

export const getResultSum = (result: Result<Row>) => getResultRows(result)[0]?.sum || 0;
