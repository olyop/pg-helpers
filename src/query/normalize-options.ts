import { identity, isArray, isNull, isString, isUndefined } from "lodash-es";

import { VariableType } from "../types.js";
import {
	Parse,
	QueryOptions,
	QueryOptionsLog,
	QueryOptionsNormalized,
	Variable,
	VariableInputRecord,
	VariableInputRecordValue,
	VariableInputRecordValueArray,
	VariableOptional,
} from "./types.js";

const LOG_OPTIONS_DEFAULT: Required<QueryOptionsLog> = {
	logParsedResult: false,
	logParsedSql: false,
	logResult: false,
	logSql: false,
	logVariables: false,
};

const SURROUND_STRING_WITH_COMMAS_DEFAULT = true;
const PARAMATERIZED_DEFAULT = false;

const normalizeOptionsVariablesArray = (variables: VariableOptional[]): Variable[] =>
	variables.map<Variable>(
		({
			key,
			value,
			parameterized = PARAMATERIZED_DEFAULT,
			surroundStringWithCommas = SURROUND_STRING_WITH_COMMAS_DEFAULT,
		}) => ({
			key,
			value,
			parameterized,
			surroundStringWithCommas,
		}),
	);

const isVariableInputRecordValueArray = (
	input: string[] | VariableInputRecordValueArray,
): input is VariableInputRecordValueArray =>
	(input.length === 1 || input.length === 2) &&
	(isString(input[0] && isUndefined(input[1])) ||
		(isString(input[0]) && !isUndefined(input[1]) && isArray(input[1])));

const normalizeOptionsVariablesRecord = (variables: VariableInputRecord): Variable[] =>
	Object.entries<VariableInputRecordValue>(variables).map<Required<Variable>>(
		([key, inputValue]) => {
			let value: VariableType;

			let parameterized: boolean = PARAMATERIZED_DEFAULT;
			let surroundStringWithCommas: boolean = SURROUND_STRING_WITH_COMMAS_DEFAULT;

			if (isArray(inputValue)) {
				surroundStringWithCommas = false;

				if (isVariableInputRecordValueArray(inputValue)) {
					const inputValueValue = inputValue[0];
					const inputValueOptions = inputValue[1];

					if (inputValueOptions) {
						const inputValueArrayOptionsParameterized = inputValueOptions[0];
						const inputValueArrayOptionsSurroundString = inputValueOptions[1];

						if (!isNull(inputValueArrayOptionsParameterized)) {
							parameterized = inputValueArrayOptionsParameterized;
						}

						if (!isUndefined(inputValueArrayOptionsSurroundString)) {
							surroundStringWithCommas = inputValueArrayOptionsSurroundString;
						}
					}

					value = inputValueValue;
				} else {
					value = inputValue;
				}
			} else {
				value = inputValue;
			}

			return {
				key,
				value,
				surroundStringWithCommas,
				parameterized,
			};
		},
	);

const normalizeOptions = <T>(options?: QueryOptions<T>): QueryOptionsNormalized<T> => {
	const parseDefault = identity as Parse<T>;

	if (isUndefined(options)) {
		return {
			variables: [],
			parse: identity as Parse<T>,
			...LOG_OPTIONS_DEFAULT,
		};
	} else {
		return {
			parse: options.parse || parseDefault,
			logParsedResult: options.logParsedResult ?? LOG_OPTIONS_DEFAULT.logParsedResult,
			logParsedSql: options.logParsedSql ?? LOG_OPTIONS_DEFAULT.logParsedSql,
			logResult: options.logResult ?? LOG_OPTIONS_DEFAULT.logResult,
			logVariables: options.logVariables ?? LOG_OPTIONS_DEFAULT.logVariables,
			logSql: options.logSql ?? LOG_OPTIONS_DEFAULT.logSql,
			variables: isUndefined(options.variables)
				? ([] as Variable[])
				: isArray(options.variables)
				? normalizeOptionsVariablesArray(options.variables)
				: normalizeOptionsVariablesRecord(options.variables),
		};
	}
};

export default normalizeOptions;
