import type { PageServerLoad } from "./$types";

const exampleSvorm: svorm = {
	id: "asdasjkhdjwe",
	title: "example svorm",
	elements: [
		{
			required: true,
			id: "35892eb5-74f4-4406-bdef-e27caebccfa3",
			question: "how did you find here?"
		},
		{
			required: false,
			id: "d767abac-496a-481e-964e-1d0fd5ad4d5e",
			question: "which is your favorite day?",
			choices: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
		}
	]
};

async function getSvorm(id: string): Promise<svorm | null> {
	// TODO: get this svorm from database
	return exampleSvorm;
}

export const load = (async ({ params }) => {
	const id = params.id;
	const svorm = await getSvorm(id);
	return { svorm };
}) satisfies PageServerLoad;
