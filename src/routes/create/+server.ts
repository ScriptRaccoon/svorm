import { error, json } from "@sveltejs/kit";
import { addSvormToDatabase } from "../../db/svorms";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
	const svormData = await request.json();

	if (!svormData.title) {
		throw error(400, "No title");
	}

	if (!svormData.elements) {
		throw error(400, "No elements");
	}

	const { data, error: err } = await addSvormToDatabase(svormData);

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
