import { getResultRows } from "./get-result-rows";
export const getResultExists = (result) => getResultRows(result)[0].exists;
