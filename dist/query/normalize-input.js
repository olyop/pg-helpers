import { identity, isUndefined } from "lodash";
const normalizeInput = (input) => (isUndefined(input) ? {
    parse: identity,
} : input);
export default normalizeInput;
