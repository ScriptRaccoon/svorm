import { save_submission } from "@/db/answer";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const submission = (await request.json()) as submission;
	const saved = await save_submission(submission);
	if (!saved) {
		throw error(500, "Submission was not successful");
	} else {
		return json("");
	}
};
