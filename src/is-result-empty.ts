import { isEmpty } from "lodash-es";

import { Result } from "./types";
import { getResultRows } from "./get-result-rows";

export const isResultEmpty = (result: Result) => isEmpty(getResultRows(result));
