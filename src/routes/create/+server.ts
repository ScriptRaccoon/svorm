import { error, json } from "@sveltejs/kit";

import { save_questions } from "@/db/question";
import { save_svorm } from "@/db/svorm";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const svorm = (await request.json()) as svorm;

	const svorm_id = await save_svorm(svorm);

	if (!svorm_id) {
		throw error(500, "Svorm could not be created");
	}

	const saved = await save_questions(svorm.questions, svorm_id);

	if (!saved) {
		throw error(500, "Questions could not be created");
	}

	return json({ id: svorm_id });
};
