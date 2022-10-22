import { Result, VariableType } from "../types";

export type SQLInput = string | Buffer;

export interface Variable {
	key: string;
	value: VariableType;
	parameterized?: boolean;
}

export type VariableInput = Variable[] | Record<string, VariableType>;

export type Parse<T> = (result: Result) => T;

export interface QueryLog {
	sql?: boolean;
	result?: boolean;
	variables?: boolean;
	parsedResult?: boolean;
}

export interface QueryOptionsLog {
	log?: QueryLog;
}

export interface QueryOptionsParse<T> {
	parse: Parse<T>;
}

export interface QueryOptionsVariables<V> {
	variables?: V;
}

export interface QueryOptions<T>
	extends QueryOptionsLog,
		Partial<QueryOptionsParse<T>>,
		QueryOptionsVariables<VariableInput> {}
