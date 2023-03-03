import { save_answers } from "@/db/answer";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const answers = (await request.json()) as answers;
	const saved = await save_answers(answers);
	if (!saved) {
		throw error(500, "Submission was not successful");
	} else {
		return json("");
	}
};
