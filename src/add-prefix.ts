export const addPrefix = (values: readonly string[], prefix?: string) =>
	prefix ? values.map(value => `${prefix}.${value}`) : values;
