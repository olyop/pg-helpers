import { Result, VariableType } from "../types.js";

export type SQLInput = string | Buffer;

export interface VariableRequired {
	key: string;
	value: VariableType;
}

export interface VariableOptions {
	parameterized: boolean;
	surroundStringWithCommas: boolean;
}

export interface Variable extends VariableRequired, VariableOptions {}

export interface VariableOptional extends VariableRequired, Partial<VariableOptions> {}

export type VariableInputRecordValueArrayOptions = [
	parameterized: boolean | null,
	surroundStringWithCommas?: boolean,
];

export type VariableInputRecordValueArray = [
	value: Exclude<VariableType, string[]>,
	options?: VariableInputRecordValueArrayOptions,
];

export type VariableInputRecordValue = VariableType | VariableInputRecordValueArray;

export type VariableInputRecord = Record<string, VariableInputRecordValue>;

export type VariablesInput = VariableOptional[] | VariableInputRecord;

export type Parse<T> = (result: Result) => T;

export interface QueryOptionsLog {
	logSql: boolean;
	logParsedSql: boolean;
	logResult: boolean;
	logVariables: boolean;
	logParsedResult: boolean;
}

export interface QueryOptionsParse<T> {
	parse: Parse<T>;
}

export interface QueryOptionsVariables<V> {
	variables: V;
}

export interface QueryOptionsNormalized<T>
	extends QueryOptionsLog,
		QueryOptionsParse<T>,
		QueryOptionsVariables<Variable[]> {}

export interface QueryOptions<T>
	extends Partial<QueryOptionsLog>,
		Partial<QueryOptionsParse<T>>,
		Partial<QueryOptionsVariables<VariablesInput>> {}
