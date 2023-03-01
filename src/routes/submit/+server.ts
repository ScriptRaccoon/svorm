import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
	const data = await request.json();
	return json({ message: "ok" });
}) satisfies RequestHandler;
