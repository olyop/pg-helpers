import isEmpty from "lodash-es/isEmpty";

import { getResultRows } from "./get-result-rows";
import { Result } from "./types";

export const isResultEmpty = (result: Result) => isEmpty(getResultRows(result));
