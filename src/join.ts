export const join =
	(names: string[], prefix?: string) =>
		(prefix === undefined ? "" : `${prefix}.`) +
		names.join(prefix === undefined ? ", " : `, ${prefix}.`)