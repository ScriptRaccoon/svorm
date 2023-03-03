import { ERROR } from "@/config";
import { get_results } from "@/db/results";
import { error, json } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id);
	const results = await get_results(id);
	if (!results) {
		throw error(500, ERROR.NO_RESULTS);
	}
	return { results };
};
