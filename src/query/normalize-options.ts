import { isNull, isString } from "lodash-es";
import identity from "lodash-es/identity";
import isArray from "lodash-es/isArray";
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
						({ key, value, parameterized, surroundStringWithCommas }) => ({
							key,
							value,
							parameterized: parameterized || PARAMATERIZED_DEFAULT,
							surroundStringWithCommas:
								surroundStringWithCommas || SURROUND_STRING_WITH_COMMAS_DEFAULT,
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

								if (isString(inputValueArrayOptions)) {
									value = inputValueArrayValue;
								} else {
									value = inputValueArrayValue;

									if (!isUndefined(inputValueArrayOptions)) {
										const inputValueArrayOptionsSurroundString = inputValueArrayOptions[0];
										const inputValueArrayOptionsParamaterized = inputValueArrayOptions[1];

										if (!isNull(inputValueArrayOptionsSurroundString)) {
											surroundStringWithCommas = inputValueArrayOptionsSurroundString;
										}

										if (!isUndefined(inputValueArrayOptionsParamaterized)) {
											parameterized = inputValueArrayOptionsParamaterized;
										}
									}
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
