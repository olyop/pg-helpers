import { Result, VariableType } from "../types";

export type SQLInput = string | Buffer;

interface VariableRequired {
	key: string;
	value: VariableType;
}

interface VariableOptions {
	parameterized: boolean;
	surroundStringWithCommas: boolean;
}

export interface Variable extends VariableRequired, VariableOptions {}

interface VariableOptional extends VariableRequired, Partial<VariableOptions> {}

type VariableInputRecordValueArray = [
	value: VariableType,
	options?: [parameterized: boolean | null, surroundStringWithCommas?: boolean],
];

export type VariableInputRecordValue = VariableType | VariableInputRecordValueArray;

export type VariablesInput = VariableOptional[] | Record<string, VariableInputRecordValue>;

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
