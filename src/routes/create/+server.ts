import { error, json } from "@sveltejs/kit";
import { save_svorm_to_database } from "../../db/svorms";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
	const svorm_data = await request.json();

	if (!svorm_data.title) {
		throw error(400, "No title");
	}

	if (!svorm_data.elements) {
		throw error(400, "No elements");
	}

	const { data, error: err } = await save_svorm_to_database(
		svorm_data
	);

	if (err) {
		console.log(err);
		throw error(500, "Svorm could not be created");
	}

	if (!data || data.length == 0) {
		throw error(500, "Svorm could not be created");
	}

	const svorm = data[0];

	const id = svorm.id as string;

	return json({ id });
}) satisfies RequestHandler;
