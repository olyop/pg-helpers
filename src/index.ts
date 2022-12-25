import pg from "pg";

pg.types.setTypeParser(pg.types.builtins.INT2, Number.parseInt);
pg.types.setTypeParser(pg.types.builtins.INT4, Number.parseInt);
pg.types.setTypeParser(pg.types.builtins.INT8, Number.parseInt);

export * from "./add-prefix.js";
export * from "./bulk-insert.js";
export * from "./convert-first-row-to-camel-case-or-null.js";
export * from "./convert-first-row-to-camel-case.js";
export * from "./convert-table-to-camel-case-or-null.js";
export * from "./convert-table-to-camel-case.js";
export * from "./exists/index.js";
export * from "./get-result-count-or-null.js";
export * from "./get-result-count.js";
export * from "./get-result-exists.js";
export * from "./get-result-row-count-or-null.js";
export * from "./get-result-row-count.js";
export * from "./get-result-rows.js";
export * from "./get-result-sum-or-null.js";
export * from "./get-result-sum.js";
export * from "./import-sql.js";
export * from "./is-result-empty.js";
export * from "./query/index.js";
export * from "./snake-case-columns.js";
export * from "./types.js";
export * from "./unique.js";
