import { identity, isArray, isUndefined } from "lodash-es"

import { Parse, QueryOptions, QueryOptionsNormalized } from "./types"

const normalizeInput =
	<T>(input?: QueryOptions<T>): QueryOptionsNormalized<T> => (
		isUndefined(input) ? {
			parse: identity as Parse<T>,
		} : {
			log: input.log,
			parse: (
				input.parse || identity as Parse<T>
			),
			variables: (
				input.variables && (
					isArray(input.variables) ?
						input.variables :
						Object
							.entries(input.variables)
							.map(([ key, value ]) => ({ key, value }))
				)
			),
		}
	)

export default normalizeInput