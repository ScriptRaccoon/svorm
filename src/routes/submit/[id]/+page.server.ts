import { get_elements } from "@/db/element";
import { get_svorm } from "@/db/svorm";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
	const svorm_id = params.id;
	// TODO: error handling
	const svorm = ((await get_svorm(svorm_id)).data as svorm_db[])[0];
	const elements = await get_elements(svorm_id);
	return { svorm, elements };
}) satisfies PageServerLoad;
