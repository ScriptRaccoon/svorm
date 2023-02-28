import { json } from "@sveltejs/kit";
import { save_element } from "../../db/element";
import { save_svorm_title } from "../../db/svorm";

import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
	const svorm = (await request.json()) as svorm;

	const { data, error } = await save_svorm_title(svorm.title);

	if (!data || data.length == 0 || error) {
		console.log(error);
		return json({ error: "svorm could not be created" });
	}

	const svorm_id = data[0].id as string;

	for (let index = 0; index < svorm.elements.length; index++) {
		const element = svorm.elements[index];
		const { data, error } = await save_element(
			element,
			svorm_id,
			index
		);

		if (!data || data.length == 0 || error) {
			console.log(error);
			return json({ error: "svorm could not be created" });
		}
	}

	return json({ id: svorm_id });
}) satisfies RequestHandler;
