import { Row, Result } from "./types"

export const getResultRows =
	<T = Row>({ rows }: Result<T>) =>
		rows