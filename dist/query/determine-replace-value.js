import { isNull } from "lodash";
const determineReplaceValue = (params) => ({ value, parameterized = false }) => {
    const val = isNull(value) ?
        "NULL" : value.toString();
    if (parameterized) {
        params.push(val);
        return `$${params.length}`;
    }
    else {
        return val;
    }
};
export default determineReplaceValue;
