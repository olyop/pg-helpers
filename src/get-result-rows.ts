import { Result, Row } from "./types";

export const getResultRows = <T extends Row = Row>({ rows }: Result<T>) => rows;
