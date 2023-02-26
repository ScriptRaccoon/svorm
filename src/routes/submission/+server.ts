import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
	const data = await request.json();
	console.log(data);
	return json({ message: "ok" });
}) satisfies RequestHandler;
