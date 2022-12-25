import { isEmpty } from "lodash-es";

import { getResultRows } from "./get-result-rows.js";
import { Result } from "./types.js";

export const isResultEmpty = (result: Result) => isEmpty(getResultRows(result));
