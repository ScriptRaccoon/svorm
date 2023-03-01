import { error, json } from "@sveltejs/kit";

import { save_elements } from "@/db/element";
import { save_svorm_title } from "@/db/svorm";

import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
	const svorm = (await request.json()) as svorm;

	const svorm_id = await save_svorm_title(svorm.title);

	if (!svorm_id) {
		throw error(500, "Svorm could not be created");
	}

	const saved = await save_elements(svorm.elements, svorm_id);

	if (!saved) {
		throw error(500, "Elements could not be created");
	}

	return json({ id: svorm_id });
}) satisfies RequestHandler;
