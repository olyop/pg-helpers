import camelCase from "lodash-es/camelCase";

export const convertStringToCamelCase = (value: string) => {
	const valueCamelized = camelCase(value);
	if (valueCamelized.includes("Id")) {
		return valueCamelized.replace(/id/gi, "ID");
	} else {
		return valueCamelized;
	}
};
