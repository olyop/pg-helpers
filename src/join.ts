export const join =
	(names: readonly string[], prefix?: string) =>
		(prefix === undefined ? "" : `${prefix}.`) +
		names.join(prefix === undefined ? ", " : `, ${prefix}.`)