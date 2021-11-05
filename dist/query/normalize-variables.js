import { isArray, isUndefined } from "lodash";
const normalizeVariables = (variables) => (isUndefined(variables) ?
    [] : (isArray(variables) ?
    variables :
    Object
        .entries(variables)
        .map(({ 0: key, 1: value }) => ({ key, value }))));
export default normalizeVariables;
