import pipe from "@oly_op/pipe";
import { getResultRows } from "./get-result-rows";
import { convertRowToCamelCase } from "./convert-row-to-camel-case";
const head = (result) => result[0];
export const convertFirstRowToCamelCase = () => pipe(getResultRows, head, convertRowToCamelCase());
