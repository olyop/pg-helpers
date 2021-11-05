export const join =
	<T>(names: T[], prefix?: string) =>
		(prefix === undefined ? "" : `${prefix}.`) +
		names.join(prefix === undefined ? ", " : `, ${prefix}.`)