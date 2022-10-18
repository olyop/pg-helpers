import { Pool, PoolClient } from "pg";

import { query } from "./query";

export const transaction =
	(pg: Pool) =>
	async (
		mainHandler: (client: PoolClient) => Promise<void>,
		catchHandler: (client: PoolClient, error: unknown) => Promise<void>,
		finallyHandler: (client: PoolClient) => Promise<void>,
	) => {
		const client = await pg.connect();
		try {
			await query(client)("BEGIN")();
			await mainHandler(client);
			await query(client)("COMMIT")();
		} catch (error) {
			await query(client)("ROLLBACK")();
			await catchHandler(client, error);
		} finally {
			await finallyHandler(client);
			client.release();
		}
	};
