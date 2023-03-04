import { ERROR } from "@/config";
import { get_results } from "@/db/results";
import { error, json } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id);
	const svorm_with_results = await get_results(id);
	if (!svorm_with_results) {
		throw error(500, ERROR.NO_RESULTS);
	}
	return { svorm_with_results };
};
