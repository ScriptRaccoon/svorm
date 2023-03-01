import { get_elements } from "@/db/element";
import { get_svorm } from "@/db/svorm";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const svorm = await get_svorm(id);

	if (!svorm) {
		throw error(404, "No svorm was found with this ID");
	}

	const elements = await get_elements(id);

	if (!elements) {
		throw error(
			404,
			"The elements of this svorm could not be loaded"
		);
	}

	return { svorm, elements };
};
