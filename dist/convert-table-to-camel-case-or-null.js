import pipe from "@oly_op/pipe";
import { map } from "lodash/fp";
import { isEmpty } from "lodash";
import { getResultRows } from "./get-result-rows";
import { convertRowToCamelCase } from "./convert-row-to-camel-case";
export const convertTableToCamelCaseOrNull = () => pipe(getResultRows, map(convertRowToCamelCase()), result => (isEmpty(result) ?
    null :
    result));
