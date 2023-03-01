import { json } from "@sveltejs/kit";
import { save_elements } from "@/db/element";
import { save_svorm_title } from "@/db/svorm";

import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
	const svorm = (await request.json()) as svorm;

	const { data, error } = await save_svorm_title(svorm.title);

	if (!data || data.length == 0 || error) {
		return json({ error: "svorm could not be created" });
	}

	const svorm_id = data[0].id as string;

	save_elements(svorm.elements, svorm_id); // TODO: error handling

	return json({ id: svorm_id });
}) satisfies RequestHandler;
