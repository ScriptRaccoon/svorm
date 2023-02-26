import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
	const data = await request.json();
	console.log(data);
	// TODO: validate data and send it to database, and get id
	const id = "asdasjkhdjwe";
	return json({ id });
}) satisfies RequestHandler;
