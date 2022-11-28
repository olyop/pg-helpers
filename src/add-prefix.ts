export const addPrefix = (values: string[] | readonly string[], prefix?: string) =>
	prefix ? values.map(value => `${prefix}.${value}`) : [...values];
