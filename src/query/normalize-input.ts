import { identity, isUndefined } from "lodash"

import { Parse, QueryOptions } from "./types"

const normalizeInput =
	<T>(input?: QueryOptions<T>) =>
		(isUndefined(input) ? {
			parse: identity as Parse<T>,
		} : input)

export default normalizeInput