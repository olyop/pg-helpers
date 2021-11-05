import { uniq } from "lodash";
const getVariableKeys = (sql) => {
    const keys = [];
    let inCurly = false;
    let tempKey = "";
    let inVariable = false;
    for (const char of sql) {
        if (inVariable) {
            if (char === " ") {
                keys.push(tempKey);
                inVariable = false;
                tempKey = "";
            }
            else {
                tempKey += char;
            }
        }
        else if (inCurly) {
            if (char === " ") {
                inVariable = true;
            }
            else if (char === "}") {
                inCurly = false;
            }
        }
        else if (char === "{") {
            inCurly = true;
        }
    }
    return uniq(keys);
};
export default getVariableKeys;
