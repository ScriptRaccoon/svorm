import { ERROR } from "@/config";
import { get_result } from "@/db/results";

import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id);
	const svorm_result = await get_result(id);
	if (!svorm_result) {
		throw error(500, ERROR.NO_RESULTS);
	}
	return svorm_result;
};
