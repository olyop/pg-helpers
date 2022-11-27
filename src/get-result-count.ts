import { getResultRows } from "./get-result-rows";
import { Result, Row } from "./types";

export const getResultCount = (result: Result<Row>) => getResultRows(result)[0]?.count || 0;
