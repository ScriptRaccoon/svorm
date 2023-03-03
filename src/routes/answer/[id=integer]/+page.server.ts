import { ERROR } from "@/config";
import { get_questions } from "@/db/question";
import { get_svorm } from "@/db/svorm";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id);

	const svorm = await get_svorm(id);

	if (!svorm) {
		throw error(404, ERROR.INVALID_ID);
	}

	const questions = await get_questions(id);

	if (!questions) {
		throw error(500, ERROR.NOT_LOADED);
	}

	return { svorm, questions };
};
