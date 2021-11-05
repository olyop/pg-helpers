import { mapKeys, camelCase } from "lodash";
export const convertRowToCamelCase = () => (object) => mapKeys(object, (_, key) => {
    const value = camelCase(key);
    if (value.includes("Id")) {
        return value.replace(/Id/gi, "ID");
    }
    else {
        return value;
    }
});
