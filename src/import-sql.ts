import { readFile } from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const importSQL = (importMetaURL: string) => (filename: string) => {
	const folderPath = dirname(fileURLToPath(importMetaURL));
	const filePath = path.join(folderPath, `${filename}.sql`);
	return readFile(filePath, "utf8");
};
