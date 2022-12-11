import identity from "lodash-es/identity";
import isArray from "lodash-es/isArray";
import isBoolean from "lodash-es/isBoolean";
import isNull from "lodash-es/isNull";
import isUndefined from "lodash-es/isUndefined";

import { VariableType } from "../types";
import {
	Parse,
	QueryOptions,
	QueryOptionsLog,
	QueryOptionsNormalized,
	Variable,
	VariableInputRecordValue,
} from "./types";

const LOG_OPTIONS_DEFAULT: Required<QueryOptionsLog> = {
	logParsedResult: false,
	logParsedSql: false,
	logResult: false,
	logSql: false,
	logVariables: false,
};

const SURROUND_STRING_WITH_COMMAS_DEFAULT = true;
const PARAMATERIZED_DEFAULT = false;

const normalizeOptions = <T>(options?: QueryOptions<T>): QueryOptionsNormalized<T> => {
	const parseDefault = identity as Parse<T>;

	if (isUndefined(options)) {
		return {
			variables: [],
			parse: parseDefault,
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
				? []
				: isArray(options.variables)
				? options.variables.map<Variable>(
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
				  )
				: Object.entries<VariableInputRecordValue>(options.variables).map<Required<Variable>>(
						([key, inputValue]) => {
							let value: VariableType;

							let surroundStringWithCommas: boolean = SURROUND_STRING_WITH_COMMAS_DEFAULT;
							let parameterized: boolean = PARAMATERIZED_DEFAULT;

							if (isArray(inputValue)) {
								const inputValueArrayValue = inputValue[0];
								const inputValueArrayOptions = inputValue[1];

								if (
									inputValueArrayOptions &&
									isArray(inputValueArrayOptions) &&
									(isNull(inputValueArrayOptions[0]) || isBoolean(inputValueArrayOptions[0]))
								) {
									value = inputValueArrayValue;

									const inputValueArrayOptionsParamaterized = inputValueArrayOptions[0];
									const inputValueArrayOptionsSurroundString = inputValueArrayOptions[1];

									if (!isNull(inputValueArrayOptionsParamaterized)) {
										parameterized = inputValueArrayOptionsParamaterized;
									}

									if (isUndefined(inputValueArrayOptionsSurroundString)) {
										surroundStringWithCommas = false;
									} else {
										surroundStringWithCommas = inputValueArrayOptionsSurroundString;
									}
								} else {
									value = inputValueArrayValue;
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
				  ),
		};
	}
};

export default normalizeOptions;
