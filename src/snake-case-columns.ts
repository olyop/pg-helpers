import snakeCase from "lodash-es/snakeCase";

export const snakeCaseColumns = (columns: string[]) => columns.map(column => snakeCase(column));
