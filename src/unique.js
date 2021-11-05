import { exists } from "./exists";
export const isUnique = (client) => async ({ value, table, column }) => {
    const res = await exists(client)({ table, value, column });
    return !res;
};
