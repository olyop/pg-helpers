export const join = (names, prefix, filter) => (prefix === undefined ? "" : `${prefix}.`) +
    names.filter(column => (filter === undefined ? true : column !== filter))
        .join(prefix === undefined ? ", " : `, ${prefix}.`);
