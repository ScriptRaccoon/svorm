import { get_questions } from "@/db/question";
import { get_svorm } from "@/db/svorm";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id as any as number;

	const svorm = await get_svorm(id);

	if (!svorm) {
		throw error(404, "No svorm was found with this ID");
	}

	const questions = await get_questions(id);

	if (!questions) {
		throw error(
			404,
			"The questions of this svorm could not be loaded"
		);
	}

	return { svorm, questions };
};
