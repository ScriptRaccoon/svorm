import { json } from "@sveltejs/kit";
import { save_element } from "../../db/element";
import { save_svorm_title } from "../../db/svorm";

import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
	const svorm_data = (await request.json()) as svorm_create;

	const { data, error } = await save_svorm_title(svorm_data.title);

	if (!data || data.length == 0 || error) {
		console.log(error);
		return json({ error: "svorm could not be created" });
	}

	const svorm_id = data[0].id as string;

	for (let i = 0; i < svorm_data.elements.length; i++) {
		const element = svorm_data.elements[i];
		const { data, error } = await save_element(element, svorm_id);

		if (!data || data.length == 0 || error) {
			console.log(error);
			return json({ error: "svorm could not be created" });
		}
	}

	return json({ id: svorm_id });
}) satisfies RequestHandler;
