export const join =
	(names: string[], prefix?: string, filter?: string) =>
		(prefix === undefined ? "" : `${prefix}.`) +
		names.filter(column => (filter === undefined ? true : column !== filter))
				 .join(prefix === undefined ? ", " : `, ${prefix}.`)