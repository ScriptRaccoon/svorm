import { error, json } from "@sveltejs/kit";

import { save_questions } from "@/db/question";
import { save_svorm } from "@/db/svorm";

import type { RequestHandler } from "./$types";
import { ERROR } from "@/config";

export const POST: RequestHandler = async ({ request }) => {
	const svorm: svorm = await request.json();
	const svorm_id = await save_svorm(svorm);

	if (!svorm_id) {
		throw error(500, ERROR.NO_SVORM);
	}

	const saved = await save_questions(svorm.questions, svorm_id);

	if (!saved) {
		throw error(500, ERROR.NO_QUESTIONS);
	}

	return json({ id: svorm_id });
};
