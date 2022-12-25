import { Result, Row } from "./types.js";

export const getResultRows = <T extends Row = Row>({ rows }: Result<T>) => rows;
