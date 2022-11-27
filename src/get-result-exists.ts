import { getResultRows } from "./get-result-rows";
import { Result, Row } from "./types";

export const getResultExists = (result: Result<Row>) => getResultRows(result)[0]?.exists || false;
