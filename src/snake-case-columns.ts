import { snakeCase } from "lodash-es";

export const snakeCaseColumns = (columns: string[]) => columns.map(column => snakeCase(column));
