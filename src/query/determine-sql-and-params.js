import determineReplaceValue from "./determine-replace-value";
const determineSQLAndParams = (sql, variables) => {
    const params = [];
    const SQLWithValues = variables.reduce((query, variable) => query.replace(new RegExp(`{{ ${variable.key} }}`, "gi"), determineReplaceValue(params)(variable)), sql);
    return {
        params,
        SQLWithValues,
    };
};
export default determineSQLAndParams;
