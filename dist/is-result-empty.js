import pipe from "@oly_op/pipe";
import { isEmpty } from "lodash";
import { getResultRows } from "./get-result-rows";
export const isResultEmpty = pipe(getResultRows, isEmpty);
